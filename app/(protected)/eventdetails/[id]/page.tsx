'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { hackathons } from '@/app/(protected)/allevents/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon, Share2Icon, CheckIcon, MailIcon, UserPlusIcon, TrophyIcon, ClipboardListIcon, MessageCircleQuestionIcon, UsersRoundIcon, LandmarkIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function EventDetailsPage() {
    const params = useParams();
    const eventId = params.id;
    const event = hackathons.find((h) => h.id === Number(eventId));

    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        if (event?.registrationEndDate) {
            const endDate = new Date(event.registrationEndDate);
            const updateTimer = () => {
                const now = new Date();
                if (now > endDate) {
                    setTimeLeft('Регистрация завершена');
                } else {
                    setTimeLeft(formatDistanceToNow(endDate, { addSuffix: true, locale: ru }));
                }
            };

            updateTimer();
            const interval = setInterval(updateTimer, 60000); // Update every minute
            return () => clearInterval(interval);
        }
    }, [event?.registrationEndDate]);

    if (!event) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-2xl text-gray-500">Мероприятие не найдено</p>
            </div>
        );
    }

    const remainingSpots = event.totalSpots ? event.totalSpots - event.participants : null;

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active": return <Badge className="bg-green-600 hover:bg-green-700">Идет регистрация</Badge>;
            case "upcoming": return <Badge className="bg-blue-600 hover:bg-blue-700">Скоро</Badge>;
            case "completed": return <Badge className="bg-gray-600 hover:bg-gray-700">Завершено</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="overflow-hidden mb-8">
                <CardHeader className="p-0 relative h-64 md:h-80">
                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6 md:p-8">
                        <div className="flex items-center gap-4">
                            {getStatusBadge(event.status)}
                            <Badge variant="outline" className="backdrop-blur-sm bg-white/10 border-white/20 text-white">{event.format}</Badge>
                        </div>
                        <CardTitle className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg mt-4">{event.title}</CardTitle>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* About Section */}
                    <Card>
                        <CardHeader><CardTitle className="flex items-center gap-2"><LandmarkIcon className="w-6 h-6" /> О мероприятии</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground whitespace-pre-line">{event.detailedDescription || event.description}</p></CardContent>
                    </Card>

                    {/* Theses Section */}
                    {event.theses && (
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><TrophyIcon className="w-6 h-6" /> Основные цели</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <ul className="list-none space-y-3">
                                    {event.theses.map((thesis, index) => (
                                        <li key={index} className="flex items-start gap-3"><CheckIcon className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" /><span className="text-muted-foreground">{thesis}</span></li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}

                    {/* Stages Section */}
                    {event.stages && (
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><ClipboardListIcon className="w-6 h-6" /> Этапы мероприятия</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {event.stages.map((stage, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">{index + 1}</div>
                                            {index < event.stages.length - 1 && <div className="w-0.5 h-16 bg-border"></div>}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{stage.title} - <span className="text-muted-foreground font-normal">{stage.dateRange}</span></p>
                                            <p className="text-sm text-muted-foreground">{stage.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Teams Section */}
                    {event.teams && (
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><UsersRoundIcon className="w-6 h-6" /> Зарегистрированные команды</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {event.teams.map((team) => (
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
                    )}

                    {/* Contacts Section */}
                    {event.contacts && (
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><MessageCircleQuestionIcon className="w-6 h-6" /> Остались вопросы?</CardTitle></CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {event.contacts.map((contact) => (
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
                    )}
                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader><CardTitle className="text-primary">Регистрация</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {timeLeft && (
                                    <div className="text-center p-3 rounded-lg bg-primary/10">
                                        <p className="text-sm text-primary/80">Регистрация закроется</p>
                                        <p className="text-lg font-bold text-primary">{timeLeft}</p>
                                    </div>
                                )}
                                <Button size="lg" className="w-full text-lg"><UserPlusIcon className="w-5 h-5 mr-2" /> Подать заявку</Button>
                                <Button size="lg" variant="outline" className="w-full"><Share2Icon className="w-5 h-5 mr-2" /> Поделиться</Button>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <ul className="space-y-4 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-3"><CalendarIcon className="w-5 h-5" /><span>{event.date}</span></li>
                                    <li className="flex items-center gap-3"><MapPinIcon className="w-5 h-5" /><span>{event.location}</span></li>
                                    {remainingSpots !== null && (
                                        <li className="flex items-center gap-3"><UsersIcon className="w-5 h-5" /><span>Осталось {remainingSpots} мест из {event.totalSpots}</span></li>
                                    )}
                                </ul>
                                {event.organizer && (
                                    <><Separator className="my-4" /><div className="space-y-2"><h4 className="font-semibold text-primary">Организатор</h4><p className="text-sm text-muted-foreground">{event.organizer}</p></div></>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}