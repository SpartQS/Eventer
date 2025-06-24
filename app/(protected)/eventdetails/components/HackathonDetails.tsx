import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { CalendarIcon } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import { useState } from "react";

interface TeamMember {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface ScheduleDay {
  date: string;
  year: string;
  items: Array<{
    time: string;
    endTime?: string;
    event: string;
  }>;
}

interface HackathonDetailsProps {
  title: string;
  startDate: string;
  endDate: string;
  prizePool: {
    first: number;
    second: number;
    third: number;
  };
  schedule: ScheduleDay[];
  team: TeamMember[];
}

export function HackathonDetails({
  title,
  startDate,
  endDate,
  prizePool,
  schedule,
  team,
}: HackathonDetailsProps) {
  const [selectedTab, setSelectedTab] = useState<'team' | 'schedule' | 'criteria' | 'regulations' | 'task'>('team');

  const tabs: { value: 'team' | 'schedule' | 'criteria' | 'regulations' | 'task'; label: string }[] = [
    { value: 'team', label: 'Команда' },
    { value: 'schedule', label: 'Расписание' },
    { value: 'criteria', label: 'Критерии оценивания' },
    { value: 'regulations', label: 'Регламент' },
    { value: 'task', label: 'Задание' },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-20 lg:px-60 pb-8">
      <div className="flex flex-col gap-4 sm:gap-8">
        {/* Заголовок и дата */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-base">
              <CalendarIcon className="h-4 w-4" />
              <span>{startDate} - {endDate}</span>
            </div>
          </div>
        </div>

        {/* Вкладки */}
        <Tabs defaultValue="team" className="w-full">
          <div className="w-full">
            <ul className="flex flex-nowrap gap-3 px-2 w-full h-12 sm:h-14 overflow-x-auto whitespace-nowrap bg-muted rounded-xl mb-6 items-center shadow-sm">
              {tabs.map(tab => (
                <li
                  key={tab.value}
                  className={`shrink-0 px-5 py-2 text-sm whitespace-nowrap border border-border rounded-lg cursor-pointer transition-colors duration-150 flex items-center h-9 sm:h-11 ${selectedTab === tab.value ? 'bg-background text-primary border-primary shadow font-semibold' : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground font-normal'}`}
                  onClick={() => setSelectedTab(tab.value)}
                >
                  {tab.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full mt-2 sm:mt-4">
            {selectedTab === 'team' && (
              <div className="!mt-0">
                <Card>
                  <CardHeader className="pb-2 sm:pb-4">
                    <CardTitle className="text-base font-semibold">Моя команда</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 sm:pt-0 pb-2 sm:pb-4">
                    <div className="text-sm text-muted-foreground mb-2 sm:mb-4">Участников - {team.length}</div>
                    <div className="space-y-3 sm:space-y-4">
                      {team.map((member, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-4">
                          <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{member.name}</div>
                            <div className="text-sm text-muted-foreground truncate">{member.email}</div>
                          </div>
                          <div className="text-sm text-muted-foreground text-right min-w-[70px] ml-auto">{member.role}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {selectedTab === 'schedule' && (
              <div className="!mt-0">
                <div className="space-y-3 sm:space-y-4">
                  {schedule.map((day, dayIndex) => (
                    <Card key={dayIndex}>
                      <CardHeader className="pb-2 sm:pb-3">
                        <CardTitle className="text-base font-semibold">Расписание - День #{dayIndex + 1}
                          <div className="text-sm text-muted-foreground font-normal mt-1">{day.date} {day.year}</div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {day.items.map((item, index) => (
                          <div key={index}>
                            <div className="px-3 sm:px-6 py-2 sm:py-4 flex flex-col sm:flex-row sm:items-center">
                              <div className="text-sm text-muted-foreground w-24 sm:w-36">{item.time}{item.endTime && ` - ${item.endTime}`}</div>
                              <div className="text-sm">{item.event}</div>
                            </div>
                            {index < day.items.length - 1 && <Separator />}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'criteria' && (
              <div className="!mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,400px] gap-3 sm:gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">Критерии оценки проектов</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <div className="px-6 py-4 flex items-center justify-between text-sm">
                          <div>Работоспособность</div>
                          <div className="text-muted-foreground">до 20 баллов</div>
                        </div>
                        <div className="px-6 py-4 flex items-center justify-between text-sm">
                          <div>Функциональность</div>
                          <div className="text-muted-foreground">до 20 баллов</div>
                        </div>
                        <div className="px-6 py-4 flex items-center justify-between text-sm">
                          <div>Дополнительные функции</div>
                          <div className="text-muted-foreground">до 10 баллов</div>
                        </div>
                        <div className="px-6 py-4 flex items-center justify-between text-sm">
                          <div>Технологичность</div>
                          <div className="text-muted-foreground">до 20 баллов</div>
                        </div>
                        <div className="px-6 py-4 flex items-center justify-between text-sm">
                          <div>Потенциал</div>
                          <div className="text-muted-foreground">до 10 баллов</div>
                        </div>
                        <div className="px-6 py-4 flex items-center justify-between text-sm">
                          <div>Презентация</div>
                          <div className="text-muted-foreground">до 20 баллов</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">Система оценки</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <p>Максимальное количество баллов - 100</p>
                        <p>Оценка проводится экспертным жюри по каждому критерию</p>
                        <p>Итоговый балл формируется как сумма оценок по всем критериям</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedTab === 'regulations' && (
              <div className="!mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,400px] gap-3 sm:gap-4">
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-base font-semibold">Правила для Хакатона 2025</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                        <div className="text-sm text-muted-foreground">Правила проведения и участия</div>
                        <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                          Скачать
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M7.5 1.5L7.5 10.5M7.5 10.5L10.5 7.5M7.5 10.5L4.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 13.5H12" stroke="currentColor" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold">Дополнительная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6">
                      <div className="text-sm text-muted-foreground">
                        <ul className="space-y-2">
                          <li>• Команда до 5 человек</li>
                          <li>• Проекты оцениваются жюри</li>
                          <li>• Все участники получают сертификаты</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {selectedTab === 'task' && (
              <div className="!mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr,400px] gap-3 sm:gap-4">
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-base font-semibold">Задание хакатона</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                        <div className="text-sm text-muted-foreground">Техническое задание и материалы</div>
                        <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                          Скачать
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                            <path d="M7.5 1.5L7.5 10.5M7.5 10.5L10.5 7.5M7.5 10.5L4.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 13.5H12" stroke="currentColor" strokeLinecap="round" />
                          </svg>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-0">
                      <CardTitle className="text-base font-semibold">Дополнительные материалы</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-6">
                      <div className="text-sm text-muted-foreground">
                        <ul className="space-y-2">
                          <li>• Шаблон презентации</li>
                          <li>• Примеры работ</li>
                          <li>• Полезные ресурсы</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
} 