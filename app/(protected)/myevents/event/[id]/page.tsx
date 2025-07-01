'use client';

import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const team = [
    { name: 'Сергей Орлов', email: 'olivia.martin@email.com', role: 'Тимлид', avatar: '/avatars/01.png' },
    { name: 'Андрей Петров', email: 'jackson.lee@email.com', role: 'Участник', avatar: '/avatars/02.png' },
    { name: 'Анастасия Петрова', email: 'isabella.nguyen@email.com', role: 'Участник', avatar: '/avatars/03.png' },
    { name: 'Анна Ковалева', email: 'will@email.com', role: 'Участник', avatar: '/avatars/04.png' },
    { name: 'Ирина Колесова', email: 'sofia.davis@email.com', role: 'Участник', avatar: '/avatars/05.png' },
];

const schedule = [
    { date: '3 декабря 2025', time: '10:00', activity: 'Открытие' },
    { date: '3 декабря 2025', time: '11:00', activity: 'Начало работы над проектом' },
    { date: '4 декабря 2025', time: '18:00', activity: 'Промежуточная презентация' },
    { date: '5 декабря 2025', time: '12:00', activity: 'Финальная защита проектов' },
    { date: '5 декабря 2025', time: '15:00', activity: 'Награждение и закрытие' },
];

const criteria = [
    'Оригинальность идеи',
    'Техническая реализация',
    'Полнота решения',
    'Презентация проекта',
    'Работа в команде',
];

const rules = `
1. К участию допускаются команды от 3 до 5 человек.
2. Все участники должны быть зарегистрированы на платформе.
3. Запрещено использование чужого кода без указания авторства.
4. Решения должны быть представлены в виде работающего прототипа.
5. Решения, нарушающие законодательство РФ, не принимаются.
`;

const task = `
Разработать сервис для автоматизации учета задач в команде. Сервис должен позволять создавать задачи, назначать ответственных, отслеживать статус выполнения и вести историю изменений. Особое внимание уделить удобству интерфейса и мобильной адаптивности.
`;

export default function MyEventDetailsPage() {
    const params = useParams();
    const eventId = params.id;

    return (
        <div className="w-full flex flex-col items-center px-2 sm:px-4 py-4 sm:py-8">
            <div className="w-full max-w-xl">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Хакатон</h1>
                <div className="flex items-center text-muted-foreground text-sm mb-6 gap-2">
                    <span>3 декабря 2025 - 5 декабря 2025</span>
                </div>
                <Tabs defaultValue="team" className="w-full">
                    <TabsList className="flex w-full min-w-0 max-w-full overflow-x-auto whitespace-nowrap gap-2 py-1 scrollbar-none snap-x snap-mandatory">
                        <TabsTrigger value="team" className="pl-4 snap-start">Команда</TabsTrigger>
                        <TabsTrigger value="schedule" className="snap-start">Расписание</TabsTrigger>
                        <TabsTrigger value="criteria" className="snap-start">Критерии оценивания</TabsTrigger>
                        <TabsTrigger value="rules" className="snap-start">Регламент</TabsTrigger>
                        <TabsTrigger value="task" className="pr-4 snap-end">Задание</TabsTrigger>
                    </TabsList>
                    <TabsContent value="team">
                        <Card className="bg-muted/40">
                            <CardHeader><CardTitle>Моя команда</CardTitle></CardHeader>
                            <CardContent>
                                <div className="text-muted-foreground mb-2 text-sm">Участников - {team.length}</div>
                                <div className="flex flex-col gap-3">
                                    {team.map((member) => (
                                        <div key={member.email} className="flex items-center justify-between gap-2 flex-wrap">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={member.avatar} alt={member.name} />
                                                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-medium truncate">{member.name}</span>
                                                    <span className="text-xs text-muted-foreground truncate">{member.email}</span>
                                                </div>
                                            </div>
                                            <span className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">{member.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="schedule">
                        <Card className="bg-muted/40">
                            <CardHeader><CardTitle>Расписание</CardTitle></CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-3">
                                    {schedule.map((item, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm">
                                            <span className="font-medium w-32 min-w-[100px] text-muted-foreground">{item.date}</span>
                                            <span className="w-16 min-w-[60px] text-muted-foreground">{item.time}</span>
                                            <span className="flex-1">{item.activity}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="criteria">
                        <Card className="bg-muted/40">
                            <CardHeader><CardTitle>Критерии оценивания</CardTitle></CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-sm">
                                    {criteria.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="rules">
                        <Card className="bg-muted/40">
                            <CardHeader><CardTitle>Регламент</CardTitle></CardHeader>
                            <CardContent>
                                <pre className="whitespace-pre-wrap text-sm font-sans">{rules}</pre>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="task">
                        <Card className="bg-muted/40">
                            <CardHeader><CardTitle>Задание</CardTitle></CardHeader>
                            <CardContent>
                                <pre className="whitespace-pre-wrap text-sm font-sans">{task}</pre>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 