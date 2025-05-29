import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CalendarIcon, RussianRuble, Heart } from "lucide-react";
import { Separator } from "./ui/separator";

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
  return (
    <div className="max-w-[1440px] mx-auto px-60">
      <div className="flex flex-col gap-8">
        {/* Заголовок и дата */}
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{startDate} - {endDate}</span>
            </div>
          </div>
        </div>

        {/* Вкладки */}
        <Tabs defaultValue="general" className="w-full">
          <div className="w-full">
            <TabsList className="w-full justify-start h-12 p-1">
              <TabsTrigger value="general" className="flex-1">
                Общее
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1">
                Расписание
              </TabsTrigger>
              <TabsTrigger value="criteria" className="flex-1">
                Критерии оценивания
              </TabsTrigger>
              <TabsTrigger value="regulations" className="flex-1">
                Регламент
              </TabsTrigger>
              <TabsTrigger value="task" className="flex-1">
                Задание
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="w-full mt-6">
            <TabsContent value="general" className="!mt-0 space-y-6">
              {/* Призовые места */}
              <div className="grid grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-2">
                    <div className="flex flex-col items-center">
                      <RussianRuble className="h-6 w-6 text-muted-foreground mb-2" />
                      <div className="text-sm mb-1">1 место</div>
                      <div className="text-2xl font-bold mb-1">+{prizePool.first.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">7,000 на участника</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-2">
                    <div className="flex flex-col items-center">
                      <RussianRuble className="h-6 w-6 text-muted-foreground mb-2" />
                      <div className="text-sm mb-1">2 место</div>
                      <div className="text-2xl font-bold mb-1">+{prizePool.second.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">5,000 на участника</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-2">
                    <div className="flex flex-col items-center">
                      <RussianRuble className="h-6 w-6 text-muted-foreground mb-2" />
                      <div className="text-sm mb-1">3 место</div>
                      <div className="text-2xl font-bold mb-1">+{prizePool.third.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">3,000 на участника</div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-2">
                    <div className="flex flex-col items-center">
                      <Heart className="h-6 w-6 text-muted-foreground mb-2" />
                      <div className="text-sm mb-1">За участие</div>
                      <div className="text-2xl font-bold mb-1">Сертификат</div>
                      <div className="text-xs text-muted-foreground">что выдают за участие</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-[1fr,400px] gap-6">
                {/* Расписание первого дня */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-large">
                      Расписание - День #1
                      <div className="text-sm text-muted-foreground font-normal mt-1">
                        {schedule[0].date} {schedule[0].year}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    {schedule[0].items.map((item, index) => (
                      <div key={index}>
                        <div className="px-6 py-4 flex items-center">
                          <div className="text-muted-foreground w-36">
                            {item.time}
                            {item.endTime && ` - ${item.endTime}`}
                          </div>
                          <div>{item.event}</div>
                        </div>
                        {index < schedule[0].items.length - 1 && <Separator />}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Команда */}
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base font-large">
                      Моя команда
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-muted-foreground">
                      Участников - {team.length}
                    </div>
                    <div className="space-y-4 mt-4">
                      {team.map((member, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                          <div className="ml-auto text-muted-foreground">{member.role}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="!mt-0">
              <div className="space-y-4">
                {schedule.map((day, dayIndex) => (
                  <Card key={dayIndex}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-normal">
                        Расписание - День #{dayIndex + 1}
                        <div className="text-sm text-muted-foreground font-normal mt-1">
                          {day.date} {day.year}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {day.items.map((item, index) => (
                        <div key={index}>
                          <div className="px-6 py-4 flex items-center">
                            <div className="text-muted-foreground w-36">
                              {item.time}
                              {item.endTime && ` - ${item.endTime}`}
                            </div>
                            <div>{item.event}</div>
                          </div>
                          {index < day.items.length - 1 && <Separator />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regulations" className="!mt-0">
              <div className="grid grid-cols-[1fr,400px] gap-6">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base font-large">
                      Правила для Хакатона 2025
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Правила проведения и участия</div>
                      <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        Скачать
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M7.5 1.5L7.5 10.5M7.5 10.5L10.5 7.5M7.5 10.5L4.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 13.5H12" stroke="currentColor" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-large">
                      Дополнительная информация
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
            </TabsContent>

            <TabsContent value="criteria" className="!mt-0">
              <div className="grid grid-cols-[1fr,400px] gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-large">
                      Критерии оценки проектов
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>Работоспособность</div>
                        <div className="text-muted-foreground">до 20 баллов</div>
                      </div>
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>Функциональность</div>
                        <div className="text-muted-foreground">до 20 баллов</div>
                      </div>
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>Дополнительные функции</div>
                        <div className="text-muted-foreground">до 10 баллов</div>
                      </div>
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>Технологичность</div>
                        <div className="text-muted-foreground">до 20 баллов</div>
                      </div>
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>Потенциал</div>
                        <div className="text-muted-foreground">до 10 баллов</div>
                      </div>
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>Презентация</div>
                        <div className="text-muted-foreground">до 20 баллов</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-large">
                      Система оценки
                    </CardTitle>
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
            </TabsContent>

            <TabsContent value="task" className="!mt-0">
              <div className="grid grid-cols-[1fr,400px] gap-6">
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base font-large">
                      Задание хакатона
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">Техническое задание и материалы</div>
                      <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                        Скачать
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                          <path d="M7.5 1.5L7.5 10.5M7.5 10.5L10.5 7.5M7.5 10.5L4.5 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3 13.5H12" stroke="currentColor" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-0">
                    <CardTitle className="text-base font-large">
                      Дополнительные материалы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
} 