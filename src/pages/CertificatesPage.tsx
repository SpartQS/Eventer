import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Certificates from '@/components/Certificates'

interface Certificate {
  id: number
  title: string
  description: string
  date: string
  type: string
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Сертификат участника хакатона",
    description: "Выдан за успешное участие в хакатоне по разработке инновационных IT-решений. Продемонстрированы навыки командной работы, программирования и решения сложных технических задач.",
    date: "December 05, 2023",
    type: "participation"
  },
  // Добавьте больше сертификатов по необходимости
]

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Сертификаты</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] bg-background">
                <SelectValue placeholder="Все сертификаты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все сертификаты</SelectItem>
                <SelectItem value="participation">Сертификаты участника</SelectItem>
                <SelectItem value="completion">Сертификаты о прохождении</SelectItem>
                <SelectItem value="achievement">Сертификаты достижений</SelectItem>
              </SelectContent>
            </Select>
            <Input 
              className="w-full sm:w-[300px] bg-background" 
              placeholder="Поиск..."
            />
          </div>
        </div>

        <Certificates />
      </div>
    </div>
  )
} 