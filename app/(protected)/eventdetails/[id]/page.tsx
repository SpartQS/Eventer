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
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, Share2Icon, CheckIcon, MailIcon, UserPlusIcon, TrophyIcon, ClipboardListIcon, MessageCircleQuestionIcon, UsersRoundIcon, LandmarkIcon, Contact, Bold } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { bg, ru } from 'date-fns/locale';
import { apiEventTeams, JoinTeamResponse } from '@/app/api/http/EventTeams/event_teams';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { BackButton } from '../components/BackButton';
import { Textarea } from '@/components/ui/textarea';
import { useSession } from 'next-auth/react';
import { Router } from 'next/router';

export default function EventDetailsPage() {
    const params = useParams();
    const eventId = params.id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [team_name, setTeam_name] = useState<string | null>(null);
    const [createTeamName, setCreateTeamName] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
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

    const CreateTeamMutation = useMutation<JoinTeamResponse, Error, {event_id: number; name: string}>({
        mutationFn: ({ event_id, name }) => apiEventTeams.createTeam(event_id, name),
        onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        },
        onError: (error) => {
            console.log(error)
          }
    })

    const JoinTeamMutation = useMutation<JoinTeamResponse, Error, {event_id: number; invite_token: string}>({
        mutationFn: ({ event_id, invite_token }) => apiEventTeams.joinTeam(event_id, invite_token),
        onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
        },
        onError: (error) => {
            console.log(error)
          }
    })

    const handleClick = () => {
        if (token != null) {
            JoinTeamMutation.mutate({event_id: Number(eventId), invite_token: token});
        } else {
            if (createTeamName != '') {
                CreateTeamMutation.mutate({event_id: Number(eventId), name: createTeamName})
            }
        }
      };

    function Modal({ 
        isOpen, 
        onClose, 
        children 
    }: { 
        isOpen: boolean; 
        onClose: () => void; 
        children: React.ReactNode }) {
        const router = useRouter();
        const { status } = useSession(); 

        useEffect(() => {
            if (isOpen && status === 'unauthenticated') {
            router.push('/');
            }
        }, [isOpen, status, router]);
        if (!isOpen) return null;

      
        return (
          <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 flex items-center justify-center">
            <div className="bg-black rounded-xl p-6 w-full max-w-md relative shadow-xl">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
              >
                &times;
              </button>
              {children}
            </div>
          </div>
        );
      }

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState('');

    const {data: team, isPending } = useQuery({
        queryKey: ['events'],
        queryFn: () => apiEventTeams.getEventTeam(Number(eventId))
    })

    if (team) {
        console.log(team)
        console.log(team['team'])
    }

    useEffect(() => {
        setLoading(true);
        setError(null);
        apiEvents.getEventDetail(Number(eventId))
            .then((data) => {
                setEvent(data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Ошибка загрузки данных мероприятия');
                setLoading(false);
            });
    }, [eventId]);

    useEffect(() => {
        if (event?.end_date) {
            const endDate = new Date(event.end_date);
            const updateTimer = () => {
                const now = new Date();
                if (now > endDate) {
                    setTimeLeft('Регистрация завершена');
                } else {
                    setTimeLeft('Осталось ' + Math.round((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) + ' дней');
                }
            };
            updateTimer();
            const interval = setInterval(updateTimer, 60000);
            return () => clearInterval(interval);
        }
    }, [event?.end_date]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-2xl text-gray-500">Загрузка...</p>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-2xl text-gray-500">{error || 'Мероприятие не найдено'}</p>
            </div>
        );
    }

    // Картинка
    const imageUrl = event.image_url;
    // Название
    const eventName = event.event_name;
    // Статус
    const eventStatus = event.event_status;
    // Формат
    const eventFormat = event.format;
    // Описание
    const description = event.description;
    // Этапы
    const stages = event.stages;
    // Место проведения
    const venue = event.venue;
    // Количество участников
    const usersCount = event.users_count;
    // Даты
    const startDate = event.start_date;
    const endDate = event.end_date;
    // Организатор (id)
    const organizerId = event.organizer_id;

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

    // Хардкод для секций, если нет данных с бэка
    const hardcodedTheses = [
        "Создание инновационных IT-решений для реального сектора экономики.",
        "Развитие профессиональных навыков и компетенций участников.",
        "Формирование новых команд и поддержка стартап-инициатив.",
        "Поиск и привлечение талантливых специалистов в компании-партнеры.",
        "Обмен опытом и знаниями внутри IT-сообщества."
    ];
    const hardcodedTeams = [
        { id: 1, name: "Космические инженеры", avatarUrl: "/teams/team-1.png", membersCount: 4 },
        { id: 2, name: "Нейро-штурм", avatarUrl: "/teams/team-2.png", membersCount: 5 },
        { id: 3, name: "Data Dreamers", avatarUrl: "/teams/team-3.png", membersCount: 3 },
        { id: 4, name: "Код-брейкеры", avatarUrl: "/teams/team-4.png", membersCount: 4 }
    ];
    const hardcodedContacts = [
        { name: "Анна Смирнова", role: "Координатор мероприятия", email: "a.smirnova@urfu-bs.ru" },
        { name: "Техническая поддержка", role: "Помощь с платформой", email: "support@urfu-hack.ru" }
    ];
    const hardcodedDetailedDescription =
        description;

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
            <div className="space-y-4 md:space-y-8">
                <Card className="overflow-hidden">
                    <CardHeader className="p-0 relative h-64 md:h-80">
                        <Image src={imageUrl} alt={eventName} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 md:p-8">
                            <CardTitle className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-2">{eventName}</CardTitle>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                {getStatusBadge(eventStatus)}
                                {getFormatBadge(eventFormat)}
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
                                    {(event as any).detailedDescription || hardcodedDetailedDescription}
                                </p>
                            </CardContent>
                        </Card>
                        {/* Theses Section */}
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><TrophyIcon className="w-6 h-6" /> Основные цели</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="list-none space-y-3">
                                    {((event as any).theses || hardcodedTheses).map((thesis: any, index: any) => (
                                        <li key={index} className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /><span className="text-muted-foreground">{thesis}</span></li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        {/* Teams Section */}
                        {/* Stages Section */}
                        {stages && stages.length > 0 && (
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardListIcon className="w-6 h-6" /> Этапы мероприятия</CardTitle></CardHeader>
                                <CardContent className="space-y-6">
                                    {stages.map((stage, index) => (
                                        <div key={stage.id} className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div>
                                                {index < stages.length - 1 && <div className="w-0.5 h-16 bg-border"></div>}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{stage.stage_name} - <span className="text-muted-foreground font-normal">{formatEventDate(stage.start_date)} — {formatEventDate(stage.end_date)}</span></p>
                                                <p className="text-sm text-muted-foreground">{stage.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )}

                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><UsersRoundIcon className="w-6 h-6" /> Зарегистрированные команды</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {((event as any).teams || hardcodedTeams).map((team: any) => (
                                    <div key={team.id} className="flex flex-col items-center text-center gap-2">
                                        <Avatar className="h-20 w-20 border-2 border-transparent hover:border-primary transition-colors">
                                            <AvatarImage src={team.avatarUrl} alt={team.name} />
                                            <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{team.name}</p>
                                            <p className="text-xs text-muted-foreground">{team.membersCount} участников</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        {/* Contacts Section */}
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircleQuestionIcon className="w-6 h-6" /> Остались вопросы?</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {((event as any).contacts || hardcodedContacts).map((contact: any) => (
                                    <div key={contact.name} className="flex items-center gap-4 p-4 rounded-lg bg-background">
                                        <Avatar className="h-12 w-12"><AvatarFallback><MailIcon /></AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-semibold">{contact.name}</p>
                                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                                            <a href={`mailto:${contact.email}`} className="text-sm text-primary hover:underline">{contact.email}</a>
                                        </div>
                                    </div>
                                ))}
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

                                <div className="bg-muted rounded-lg text-center p-3">
                                    <p className="text-xs text-white">Регистрация закроется</p>
                                    <p className="text-lg font-bold text-white">{timeLeft}</p>
                                </div>
                                <Button size="lg" variant="ghost" className="w-full bg-muted text-white hover:bg-muted/80 rounded-lg"><Share2Icon className="w-5 h-5 mr-2" /> Поделиться</Button>
                                {/* Модалка */}
                                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                    {/* {status === 'authenticated' ? (<>hello</>) : (router.push('/p'))} */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <UsersIcon className="w-6 h-6" />
                                                <h2 className="text-xl font-bold mb-4">Форма регистрации</h2>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                        {/* Create team */}
                                        {showSuccess && (
                                            <div style={{
                                                position: 'fixed',
                                                top: 20,
                                                right: 20,
                                                background: '#4BB543',
                                                color: 'white',
                                                padding: '12px 20px',
                                                borderRadius: '8px',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                                                zIndex: 9999
                                            }}>
                                                ✅ Вы подали заявку на ивент!
                                            </div>
                                            )}
                                        
                                        {token == null ? 
                                        ( <>
                                        {/* Название команды */}
                                        <div className="space-y-2">
                                            <Label >Название команды *</Label>
                                            <Input
                                                // name="CreateTeamName"
                                                // type="text"
                                                value={createTeamName}
                                                onChange={(e) => setCreateTeamName(e.target.value)}
                                                placeholder="Введите название команды"
                                                // required
                                            />
                                        </div>
                                        </>) : (
                                            <div className="text-xl font-bold mb-4">Вас пригласили участвовать в ивенте в составе команды {team?.team?.name}</div>
                                        )}
                                        {/* Согласие */}
                                        {/* <div className="space-y-2 flex justify-end">
                                            <label>Согласие</label>
                                            <input className='bg-black' type='file'></input> */}
                                            {/* <Label >Согласие</Label>
                                            <Input
                                                name="team_name"
                                                type="file"
                                                // value={teamData.team_name}
                                                // onChange={handleChange}
                                                placeholder="Загрузите согласие"
                                                required
                                            /> */}
                                        {/* </div> */}
                                        <Button onClick={handleClick}>
                                            подать заявку
                                        </Button>
                                    {/* <Button onClick={() => setIsModalOpen(false)}>Закрыть</Button> */}
                                        </CardContent>
                                    </Card>
                                </Modal>
                            </CardContent>
                        </Card>
                        
                        {/* 2-ой блок с информацией */}
                        <Card className="bg-card border border-border rounded-xl overflow-hidden">
                            <CardContent className="p-6">
                                <ul className="space-y-5 text-white text-lg">
                                    <li className="flex items-center gap-4"><CalendarIcon className="w-7 h-7 text-white" /><span className="text-lg md:text-xl font-semibold">{formatEventDate(startDate)}{endDate ? ` — ${formatEventDate(endDate)}` : ''}</span></li>
                                    <li className="flex items-center gap-4"><MapPinIcon className="w-7 h-7 text-white" /><span className="text-lg md:text-xl font-semibold">{venue}</span></li>
                                    <li className="flex items-center gap-4"><UsersIcon className="w-7 h-7 text-white" /><span className="text-lg md:text-xl font-semibold">Участников: {usersCount}</span></li>
                                </ul>
                                <Separator className="my-4 bg-muted" />
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-white/70">ID организатора</h4>
                                    <p className="text-sm text-white/70">{organizerId}</p>
                                </div>
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
            {/* Мобильный фиксированный блок регистрации */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-card border-t border-border px-5 py-3 flex flex-col items-center gap-3 md:hidden">
                {timeLeft !== 'Регистрация завершена' ? (
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
                )}
            </div>
        </div>
    );
}