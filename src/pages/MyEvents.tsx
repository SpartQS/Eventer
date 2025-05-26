import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Event {
  id: number
  title: string
  description: string
  date: string
}

const events: Event[] = [
  {
    id: 1,
    title: "Хакатон",
    description: "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за определенный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов.",
    date: "December 03, 2023 at 9:00 AM"
  },
  // Добавьте больше мероприятий по необходимости
]

export default function MyEvents() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Мои мероприятия</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] bg-background">
                <SelectValue placeholder="Все мероприятия" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все мероприятия</SelectItem>
                <SelectItem value="hackathon">Хакатоны</SelectItem>
                <SelectItem value="conference">Конференции</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              className="flex-1 max-w-[300px] bg-background" 
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="bg-background border border-border">
              <CardHeader>
                <CardTitle className="text-xl">{event.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {event.date}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {event.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-accent hover:text-accent-foreground"
                >
                  Подробнее
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 