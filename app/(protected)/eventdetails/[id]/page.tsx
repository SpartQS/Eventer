'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { apiEvents, Event } from '../../../api/http/event/events';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, Share2Icon, CheckIcon, MailIcon, UserPlusIcon, TrophyIcon, ClipboardListIcon, MessageCircleQuestionIcon, UsersRoundIcon, LandmarkIcon, Contact, Bold, Upload, FileText, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { bg, ru } from 'date-fns/locale';
import { apiEventTeams, JoinTeamResponse } from '@/app/api/http/EventTeams/event_teams';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { BackButton } from '../components/BackButton';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { Router } from 'next/router';
import { toast } from 'sonner';

export default function EventDetailsPage() {
    const params = useParams();
    const eventId = params.id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team_name, setTeam_name] = useState<string | null>(null);
    const [createTeamName, setCreateTeamName] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Новые состояния для улучшенного модального окна
    const [isAdult, setIsAdult] = useState<boolean | null>(null);
    const [gdprConsent, setGdprConsent] = useState(false);
    const [rulesConsent, setRulesConsent] = useState(false);
    const [documents, setDocuments] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Для тестирования - можно переключать возраст
    const [testMode, setTestMode] = useState(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const open = searchParams.get("openModal");
        const team_name = searchParams.get("team_name");
        const token = searchParams.get("token");

        if (open === "true") {
            setIsModalOpen(true);
        }
        if (team_name) {
            setTeam_name(decodeURIComponent(team_name));
        }
        if (token) {
            setToken(decodeURIComponent(token));
        }
    }, []);

    // Функция для проверки возраста пользователя
    const checkUserAge = () => {
        // Для тестирования - можно переключать возраст
        if (testMode) {
            return false; // Несовершеннолетний для тестирования
        }

        // Здесь должна быть логика получения даты рождения пользователя из профиля
        // Пока используем заглушку - предполагаем что пользователь совершеннолетний
        // В реальном приложении здесь должна быть проверка даты рождения из session или API
        return true;
    };

    // Функция для обработки загрузки документов
    const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setDocuments(prev => [...prev, ...files]);
    };

    // Функция для удаления документа
    const removeDocument = (index: number) => {
        setDocuments(prev => prev.filter((_, i) => i !== index));
    };

    const CreateTeamMutation = useMutation<JoinTeamResponse, Error, { event_id: number; name: string }>({
        mutationFn: ({ event_id, name }) => apiEventTeams.createTeam(event_id, name),
        onSuccess: () => {
            setShowSuccess(true);
            toast.success("Заявка успешно подана!");
            handleCloseModal();
            setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Ошибка при подаче заявки. Попробуйте еще раз.");
        }
    })

    const JoinTeamMutation = useMutation<JoinTeamResponse, Error, { event_id: number; invite_token: string }>({
        mutationFn: ({ event_id, invite_token }) => apiEventTeams.joinTeam(event_id, invite_token),
        onSuccess: () => {
            setShowSuccess(true);
            toast.success("Заявка успешно подана!");
            handleCloseModal();
            setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (error) => {
            console.log(error);
            toast.error("Ошибка при подаче заявки. Попробуйте еще раз.");
        }
    })

    const handleClick = () => {
        // Проверяем согласия
        if (!gdprConsent || !rulesConsent) {
            toast.error("Необходимо дать согласие на обработку персональных данных и ознакомиться с правилами участия");
            return;
        }

        // Если пользователь несовершеннолетний, проверяем загрузку документов
        if (isAdult === false && documents.length === 0) {
            toast.error("Для несовершеннолетних участников необходимо загрузить согласие родителей");
            return;
        }

        setIsSubmitting(true);

        if (token != null) {
            JoinTeamMutation.mutate({ event_id: Number(eventId), invite_token: token });
        } else {
            if (createTeamName != '') {
                CreateTeamMutation.mutate({ event_id: Number(eventId), name: createTeamName })
            }
        }

        setIsSubmitting(false);
    };

    // Функция для сброса формы
    const resetForm = () => {
        setCreateTeamName('');
        setGdprConsent(false);
        setRulesConsent(false);
        setDocuments([]);
        setIsAdult(null);
        setIsSubmitting(false);
    };

    // Функция для закрытия модального окна
    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    function Modal({
        isOpen,
        onClose,
        children
    }: {
        isOpen: boolean;
        onClose: () => void;
        children: React.ReactNode
    }) {
        const router = useRouter();
        const { status } = useSession();

        useEffect(() => {
            if (isOpen && status === 'unauthenticated') {
                router.push('/');
            }
        }, [isOpen, status, router]);
        if (!isOpen) return null;

        // Проверяем возраст при открытии модального окна
        useEffect(() => {
            if (isOpen && isAdult === null) {
                // Здесь должна быть реальная проверка возраста из профиля пользователя
                // Пока используем заглушку
                setIsAdult(checkUserAge());
            }
        }, [isOpen]);

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                    className="absolute inset-0 backdrop-blur-sm"
                    onClick={onClose}
                ></div>
                <Card className="relative z-10 w-full max-w-lg text-white rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-6 h-6 text-white" />
                            <h2 className="text-2xl font-semibold">Форма регистрации</h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white text-3xl leading-none"
                            aria-label="Закрыть"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Показываем разные модальные окна в зависимости от возраста */}
                    {isAdult === null ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                        </div>
                    ) : isAdult ? (
                        // Модальное окно для совершеннолетних
                        <div className="space-y-4">
                            {team_name ? (
                                <>
                                    <div className="text-xl font-bold mb-4">Создать команду</div>
                                    <div className="space-y-2">
                                        <Label htmlFor="team_name">Название команды</Label>
                                        <Input
                                            id="team_name"
                                            value={createTeamName}
                                            onChange={(e) => setCreateTeamName(e.target.value)}
                                            placeholder="Введите название команды"
                                            className="bg-gray-800 border-gray-600 text-white"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="text-xl font-bold mb-4">Вас пригласили участвовать в ивенте в составе команды {team?.team?.name}</div>
                            )}

                            {/* Согласия */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="gdpr"
                                        checked={gdprConsent}
                                        onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                                        className="border-gray-600"
                                    />
                                    <Label htmlFor="gdpr" className="text-sm">
                                        Я даю согласие на обработку персональных данных в соответствии с GDPR и 152-ФЗ
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="rules"
                                        checked={rulesConsent}
                                        onCheckedChange={(checked) => setRulesConsent(checked as boolean)}
                                        className="border-gray-600"
                                    />
                                    <Label htmlFor="rules" className="text-sm">
                                        Я ознакомлен с правилами участия в мероприятии
                                    </Label>
                                </div>
                            </div>

                            <Button
                                onClick={handleClick}
                                disabled={isSubmitting || !gdprConsent || !rulesConsent}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Отправка...
                                    </div>
                                ) : (
                                    "Подать заявку"
                                )}
                            </Button>
                        </div>
                    ) : (
                        // Модальное окно для несовершеннолетних
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 p-3 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                                <span className="text-yellow-400 font-medium">Для несовершеннолетних участников</span>
                            </div>

                            {team_name ? (
                                <>
                                    <div className="text-xl font-bold mb-4">Создать команду</div>
                                    <div className="space-y-2">
                                        <Label htmlFor="team_name">Название команды</Label>
                                        <Input
                                            id="team_name"
                                            value={createTeamName}
                                            onChange={(e) => setCreateTeamName(e.target.value)}
                                            placeholder="Введите название команды"
                                            className="bg-gray-800 border-gray-600 text-white"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="text-xl font-bold mb-4">Вас пригласили участвовать в ивенте в составе команды {team?.team?.name}</div>
                            )}

                            {/* Загрузка документов */}
                            <div className="space-y-2">
                                <Label htmlFor="documents" className="flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Загрузить документы (сертификаты, согласие родителей)
                                </Label>
                                <Input
                                    id="documents"
                                    type="file"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={handleDocumentUpload}
                                    className="bg-gray-800 border-gray-600 text-white file:bg-green-600 file:border-0 file:text-white file:px-4 file:py-2 file:rounded file:cursor-pointer"
                                />

                                {/* Список загруженных документов */}
                                {documents.length > 0 && (
                                    <div className="space-y-2">
                                        <Label className="text-sm text-gray-300">Загруженные документы:</Label>
                                        {documents.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded border border-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="w-4 h-4 text-green-400" />
                                                    <span className="text-sm">{file.name}</span>
                                                </div>
                                                <button
                                                    onClick={() => removeDocument(index)}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    Удалить
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Согласия */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="gdpr"
                                        checked={gdprConsent}
                                        onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
                                        className="border-gray-600"
                                    />
                                    <Label htmlFor="gdpr" className="text-sm">
                                        Я даю согласие на обработку персональных данных в соответствии с GDPR и 152-ФЗ
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="rules"
                                        checked={rulesConsent}
                                        onCheckedChange={(checked) => setRulesConsent(checked as boolean)}
                                        className="border-gray-600"
                                    />
                                    <Label htmlFor="rules" className="text-sm">
                                        Я ознакомлен с правилами участия в мероприятии
                                    </Label>
                                </div>
                            </div>

                            <Button
                                onClick={handleClick}
                                disabled={isSubmitting || !gdprConsent || !rulesConsent || documents.length === 0}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Отправка...
                                    </div>
                                ) : (
                                    "Подать заявку"
                                )}
                            </Button>
                        </div>
                    )}
                </Card>
            </div>
        );
    }

    const { data: team, isPending: isTeamPending } = useQuery({
        queryKey: ['team'],
        queryFn: () => apiEventTeams.getEventTeam(Number(eventId))
    })

    const { data: event, isPending: isEventPending } = useQuery({
        queryKey: ['events', eventId],
        queryFn: () => apiEvents.getEventDetail(Number(eventId))
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active": return <Badge className="bg-green-500 text-black rounded-full px-4 py-1 text-base font-medium shadow-none border-none">Активный</Badge>;
            case "upcoming": return <Badge className="bg-blue-500 text-white rounded-full px-4 py-1 text-base font-medium shadow-none border-none">Скоро</Badge>;
            case "completed": return <Badge className="bg-gray-500 text-white rounded-full px-4 py-1 text-base font-medium shadow-none border-none">Завершено</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getFormatBadge = (format: string) => {
        switch (format) {
            case "online":
                return <Badge className="border border-blue-500 text-blue-500 bg-transparent rounded-full px-4 py-1 text-base font-medium shadow-none">Онлайн</Badge>;
            case "offline":
                return <Badge className="border border-purple-500 text-purple-500 bg-transparent rounded-full px-4 py-1 text-base font-medium shadow-none">Офлайн</Badge>;
            case "hybrid":
                return <Badge className="border border-orange-500 text-orange-500 bg-transparent rounded-full px-4 py-1 text-base font-medium shadow-none">Гибрид</Badge>;
            default:
                return <Badge className="bg-muted text-white rounded-full px-4 py-1 text-base font-medium shadow-none">{format}</Badge>;
        }
    };

    // Универсальный парсер даты (ISO и дд.мм.гггг чч:мм:cc)
    function parseEventDate(dateStr: string): Date | null {
        if (!dateStr) return null;
        // ISO формат
        const isoDate = new Date(dateStr);
        if (!isNaN(isoDate.getTime())) return isoDate;
        // Формат дд.мм.гггг чч:мм:cc
        const [datePart, timePart] = dateStr.split(' ');
        if (!datePart || !timePart) return null;
        const [day, month, year] = datePart.split('.').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        const customDate = new Date(year, month - 1, day, hours, minutes, seconds);
        if (!isNaN(customDate.getTime())) return customDate;
        return null;
    }
    // Функция для красивого форматирования дат
    function formatEventDate(dateStr: string) {
        const date = parseEventDate(dateStr);
        if (!date) return '';
        return format(date, 'd MMMM yyyy, HH:mm', { locale: ru });
    }

    return (
        <div className="container mx-auto px-4 py-4 md:py-8 pb-[160px]">
            {/* {events?.map((event, idx) => ( */}
            {event && (

                <div className="space-y-4 md:space-y-8">
                    <Card className="overflow-hidden">
                        <CardHeader className="p-0 relative h-64 md:h-80">
                            <Image src={event.image_url} alt={event.event_name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 md:p-8">
                                <CardTitle className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-2">{event.event_name}</CardTitle>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                    {getStatusBadge(event.event_status)}
                                    {getFormatBadge(event.format)}
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                        <div className="lg:col-span-2 space-y-4 md:space-y-8">
                            {/* About Section */}
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><LandmarkIcon className="w-6 h-6" /> О мероприятии</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground whitespace-pre-line">
                                        {/* {(event as any).detailedDescription || hardcodedDetailedDescription} */}
                                        {event.description}
                                    </p>
                                </CardContent>
                            </Card>
                            {/* Theses Section */}
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><TrophyIcon className="w-6 h-6" /> Основные цели</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                    <ul className="list-none space-y-3">
                                        <li className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /><span className="text-muted-foreground">Дополнительная информация</span></li>
                                    </ul>
                                </CardContent>
                            </Card>
                            {/* Stages Section */}
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardListIcon className="w-6 h-6" /> Этапы мероприятия</CardTitle></CardHeader>
                                <CardContent className="space-y-6">
                                    {event.stages.map((stage, index) => (
                                        <div key={stage.id} className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div>
                                                {index < event.stages.length - 1 && <div className="w-0.5 h-16 bg-border"></div>}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{stage.stage_name} - <span className="text-muted-foreground font-normal">{formatEventDate(stage.start_date)} — {formatEventDate(stage.end_date)}</span></p>
                                                <p className="text-sm text-muted-foreground">{stage.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Contacts Section */}
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircleQuestionIcon className="w-6 h-6" /> Остались вопросы?</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-4 p-4 rounded-lg bg-background">
                                        <Avatar className="h-12 w-12"><AvatarFallback><MailIcon /></AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-semibold">Контакты</p>
                                            <p className="text-sm text-muted-foreground">Роль</p>
                                            <a className="text-sm text-primary hover:underline">email</a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        {/* Right Sidebar */}
                        <div className="lg:col-span-1 space-y-4 md:space-y-6">
                            <Card className="bg-card border border-border hidden md:block">
                                <CardHeader><CardTitle className="text-white">Регистрация</CardTitle></CardHeader>
                                <CardContent className="space-y-3">
                                    {team ? (<Button size="lg" className="w-full text-lg font-bold bg-green-600 hover:bg-green-700 text-white h-[64px] min-h-[56px] py-0 rounded-lg flex items-center justify-center">
                                        <UserPlusIcon className="w-6 h-6 mr-2" />Вы уже участник</Button>)
                                        : (<Button onClick={() => setIsModalOpen(true)} size="lg" className="w-full text-lg font-bold bg-green-600 hover:bg-green-700 text-white h-[64px] min-h-[56px] py-0 rounded-lg flex items-center justify-center">
                                            <UserPlusIcon className="w-6 h-6 mr-2" />Подать заявку</Button>)}

                                    {/* Кнопка для тестирования (только для разработки) */}
                                    {process.env.NODE_ENV === 'development' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setTestMode(!testMode);
                                                setIsAdult(null); // Сброс для перезагрузки проверки
                                            }}
                                            className="w-full text-xs"
                                        >
                                            Тест: {testMode ? 'Несовершеннолетний' : 'Совершеннолетний'}
                                        </Button>
                                    )}

                                    <div className="bg-muted rounded-lg text-center p-3">
                                        <p className="text-xs text-white">Регистрация закроется</p>
                                        {/* <p className="text-lg font-bold text-white">{timeLeft}</p> */}
                                    </div>
                                    <Button size="lg" variant="ghost" className="w-full bg-muted text-white hover:bg-muted/80 rounded-lg"><Share2Icon className="w-5 h-5 mr-2" /> Поделиться</Button>
                                    {/* Модалка */}
                                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                                        {/* Контент теперь обрабатывается внутри Modal */}
                                    </Modal>
                                </CardContent>
                            </Card>

                            {/* 2-ой блок с информацией */}
                            <Card className="bg-card border border-border rounded-xl overflow-hidden">
                                <CardContent className="p-6">
                                    <ul className="space-y-5 text-white text-lg">
                                        <li className="flex items-center gap-4"><CalendarIcon className="w-7 h-7 text-white" /><span className="text-lg md:text-xl font-semibold">{formatEventDate(event.start_date)}{event.end_date ? ` — ${formatEventDate(event.end_date)}` : ''}</span></li>
                                        <li className="flex items-center gap-4"><MapPinIcon className="w-7 h-7 text-white" /><span className="text-lg md:text-xl font-semibold">{event.venue}</span></li>
                                        <li className="flex items-center gap-4"><UsersIcon className="w-7 h-7 text-white" /><span className="text-lg md:text-xl font-semibold">Участников: {event.users_count}</span></li>
                                    </ul>
                                </CardContent>
                            </Card>


                            {/* Test team block */}
                            {team ? (
                                <>
                                    {team && (
                                        <Card className="bg-card border border-border rounded-xl overflow-hidden">
                                            <CardHeader className="flex flex-row items-center space-x-3">
                                                <CardTitle className="text-xl">Команда {team?.team?.name}</CardTitle>
                                            </CardHeader>

                                            <CardContent className="space-y-6">
                                                <span className="truncate">Ссылка для приглашения</span>
                                                <div className=" bg-[#2a2a2a] rounded-lg px-4 py-2 text-sm text-gray-300 flex justify-between items-center">
                                                    <span className='truncate overflow-hidden whitespace-nowrap text-ellipsis'>http://localhost:3000/eventdetails/{eventId}?openModal=true&team_name={team?.team?.name}&token={team?.team?.invite_token}</span>

                                                    {/* ПЕРЕДЕЛАТЬ */}
                                                    <button
                                                        onClick={() => {
                                                            const link = `http://localhost:3000/eventdetails/${eventId}?openModal=true&team_name=${encodeURIComponent(team.team.name)}&token=${team.team.invite_token}`;
                                                            navigator.clipboard.writeText(link)
                                                                .then(() => {
                                                                    // Optional: show success message or toast
                                                                    console.log("Ссылка скопирована!");
                                                                })
                                                                .catch((err) => {
                                                                    console.error("Ошибка при копировании:", err);
                                                                });
                                                        }}
                                                        className="ml-2 text-gray-400 hover:text-white active:scale-90 transition-transform duration-100 rounded p-1"
                                                        title="Скопировать ссылку"
                                                    >
                                                        📋
                                                    </button>
                                                </div>

                                                {team?.members.map((name, idx) => (
                                                    <div key={idx}>
                                                        {name.is_event_leader ?
                                                            (<div className="flex items-center bg-[#2a2a2a] px-4 py-2 rounded-lg">
                                                                <span className="text-yellow-400 text-xl">👑</span>
                                                                <div>
                                                                    <div className="font-medium">{name.firstname} {name.lastname}</div>
                                                                    <div className="text-sm text-gray-400">Лидер</div>
                                                                </div>
                                                            </div>)
                                                            : (<div className="flex items-center bg-[#2a2a2a] px-4 py-2 rounded-lg">
                                                                <span className="text-yellow-400 text-xl">👤</span>
                                                                <div>
                                                                    <div className="font-medium">{name.firstname} {name.lastname}</div>
                                                                    <div className="text-sm text-gray-400">Участник</div>
                                                                </div>
                                                            </div>)}
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>)}
                                </>
                            ) : (
                                <Card className="bg-card border border-border rounded-xl overflow-hidden">
                                    <CardHeader className="flex flex-row items-center space-x-3">
                                        <CardTitle className="text-xl">Вы не состоите в команде для этого ивента</CardTitle>
                                    </CardHeader>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Мобильный фиксированный блок регистрации */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-card border-t border-border px-5 py-3 flex flex-col items-center gap-3 md:hidden">
                {/* {timeLeft !== 'Регистрация завершена' ? (
                    <>
                        <Button size="lg" className="w-full text-lg font-bold bg-green-600 hover:bg-green-700 text-white h-[56px] rounded-lg flex items-center justify-center"><UserPlusIcon className="w-6 h-6 mr-2" /> Подать заявку</Button>
                        <div className="text-center w-full">
                            <p className="text-xs text-muted-foreground leading-tight">Регистрация закроется<br /><span className='font-bold'>{timeLeft}</span></p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full bg-muted rounded-lg py-3 text-center text-lg font-bold text-white">Регистрация закрыта</div>
                        <div className="text-center w-full">
                            <p className="text-xs text-muted-foreground">Регистрация на мероприятие</p>
                            <p className="text-xs text-muted-foreground">больше не доступна</p>
                        </div>
                    </>
                )} */}
            </div>
        </div>
    );
}