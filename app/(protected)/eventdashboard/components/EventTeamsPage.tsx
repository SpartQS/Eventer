"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { EventHeader } from "@/components/event-header"
import { EventNavigation } from "./EventNavigation"
import { RoleGuard } from "@/components/role-guard"
import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Search,
  Users,
  XCircle,
  AlertTriangle,
  UserCheck,
  UserX,
  Icon,
  User,
  Circle,
  CircleEqual,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react"
import EventTeamStatsCard from "./EventTeamStatsCards"
// import { EventTeamStatsCard } from "./EventTeamStatsCards"
import { EventTeamFilters } from "./EventTeamFilters"
import { EventTeamsTable } from "./EventTeamsTable"
import { useQuery } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"
import { useParams } from "next/navigation"

// Mock data - команды для текущего ивента
const mockTeams = [
  {
    id: 1,
    name: "Команда Альфа",
    memberCount: 5,
    captain: "Иванов Алексей",
    status: "pending",
    submissionDate: "2024-01-15",
    members: [
      {
        id: 1,
        name: "Иванов Алексей",
        age: 25,
        email: "alex@example.com",
        phone: "+7 999 123-45-67",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 2,
        name: "Петрова Мария",
        age: 17,
        email: "maria@example.com",
        phone: "+7 999 234-56-78",
        status: "confirmed",
        isMinor: true,
        parentalConsent: "approved",
      },
      {
        id: 3,
        name: "Сидоров Дмитрий",
        age: 22,
        email: "dmitry@example.com",
        phone: "+7 999 345-67-89",
        status: "pending",
        isMinor: false,
      },
      {
        id: 4,
        name: "Козлова Анна",
        age: 16,
        email: "anna@example.com",
        phone: "+7 999 456-78-90",
        status: "confirmed",
        isMinor: true,
        parentalConsent: "pending",
      },
      {
        id: 5,
        name: "Морозов Игорь",
        age: 15,
        email: "igor@example.com",
        phone: "+7 999 567-89-01",
        status: "confirmed",
        isMinor: true,
        parentalConsent: "rejected",
      },
    ],
  },
  {
    id: 2,
    name: "Бета Разработчики",
    memberCount: 4,
    captain: "Смирнова Елена",
    status: "approved",
    submissionDate: "2024-01-12",
    members: [
      {
        id: 6,
        name: "Смирнова Елена",
        age: 28,
        email: "elena@example.com",
        phone: "+7 999 678-90-12",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 7,
        name: "Волков Андрей",
        age: 24,
        email: "andrey@example.com",
        phone: "+7 999 789-01-23",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 8,
        name: "Лебедева Ольга",
        age: 26,
        email: "olga@example.com",
        phone: "+7 999 890-12-34",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 9,
        name: "Новиков Павел",
        age: 23,
        email: "pavel@example.com",
        phone: "+7 999 901-23-45",
        status: "confirmed",
        isMinor: false,
      },
    ],
  },
  {
    id: 3,
    name: "Гамма Инноваторы",
    memberCount: 6,
    captain: "Федоров Сергей",
    status: "rejected",
    submissionDate: "2024-01-10",
    members: [
      {
        id: 10,
        name: "Федоров Сергей",
        age: 30,
        email: "sergey@example.com",
        phone: "+7 999 012-34-56",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 11,
        name: "Орлова Татьяна",
        age: 27,
        email: "tatyana@example.com",
        phone: "+7 999 123-45-67",
        status: "confirmed",
        isMinor: false,
      },
    ],
  },
  {
    id: 4,
    name: "Дельта Стартап",
    memberCount: 3,
    captain: "Кузнецов Михаил",
    status: "pending",
    submissionDate: "2024-01-18",
    members: [
      {
        id: 12,
        name: "Кузнецов Михаил",
        age: 29,
        email: "mikhail@example.com",
        phone: "+7 999 234-56-78",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 13,
        name: "Васильева Екатерина",
        age: 16,
        email: "kate@example.com",
        phone: "+7 999 345-67-89",
        status: "confirmed",
        isMinor: true,
        parentalConsent: "pending",
      },
      {
        id: 14,
        name: "Попов Артем",
        age: 24,
        email: "artem@example.com",
        phone: "+7 999 456-78-90",
        status: "pending",
        isMinor: false,
      },
    ],
  },
  {
    id: 5,
    name: "Эпсилон Код",
    memberCount: 4,
    captain: "Николаева Анастасия",
    status: "approved",
    submissionDate: "2024-01-20",
    members: [
      {
        id: 15,
        name: "Николаева Анастасия",
        age: 26,
        email: "anastasia@example.com",
        phone: "+7 999 567-89-01",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 16,
        name: "Романов Владимир",
        age: 28,
        email: "vladimir@example.com",
        phone: "+7 999 678-90-12",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 17,
        name: "Соколова Дарья",
        age: 17,
        email: "darya@example.com",
        phone: "+7 999 789-01-23",
        status: "confirmed",
        isMinor: true,
        parentalConsent: "approved",
      },
      {
        id: 18,
        name: "Белов Максим",
        age: 25,
        email: "maxim@example.com",
        phone: "+7 999 890-12-34",
        status: "confirmed",
        isMinor: false,
      },
    ],
  },
  {
    id: 6,
    name: "Зета Инновации",
    memberCount: 5,
    captain: "Павлов Денис",
    status: "pending",
    submissionDate: "2024-01-22",
    members: [
      {
        id: 19,
        name: "Павлов Денис",
        age: 31,
        email: "denis@example.com",
        phone: "+7 999 901-23-45",
        status: "confirmed",
        isMinor: false,
      },
      {
        id: 20,
        name: "Крылова София",
        age: 15,
        email: "sofia@example.com",
        phone: "+7 999 012-34-56",
        status: "confirmed",
        isMinor: true,
        parentalConsent: "pending",
      },
    ],
  },
]

// Статистика для текущего ивента
const eventStats = {
  total: mockTeams.length,
  approved: mockTeams.filter((t) => t.status === "approved").length,
  rejected: mockTeams.filter((t) => t.status === "rejected").length,
  pending: mockTeams.filter((t) => t.status === "pending").length,
  totalParticipants: mockTeams.reduce((sum, team) => sum + team.memberCount, 0),
  minorsCount: mockTeams.reduce((sum, team) => sum + (team.members?.filter((m) => m.isMinor).length || 0), 0),
}

export default function EventTeamsPage() {
  const params = useParams();
  const eventId = params.id;

  const [selectedTeam, setSelectedTeam] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const { data: eventstats, isPending, error} = useQuery({
    queryKey: ['EventsStat'],
    queryFn: () => apiEvents.getEventStats(Number(eventId)),
})

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: "Ожидает", variant: "secondary", icon: Clock },
      approved: { label: "Одобрено", variant: "default", icon: CheckCircle },
      rejected: { label: "Отклонено", variant: "destructive", icon: XCircle },
    }

    // const config = statusConfig[status]
    // const Icon = config.icon

    return (
      <Badge variant='default' className="flex items-center gap-1">
        {/* <Icon className="w-3 h-3" /> */}
        {/* {config.label} */}
      </Badge>
    )
  }

  const getParentalConsentBadge = (status) => {
    const statusConfig = {
      pending: { label: "Ожидает", variant: "secondary", icon: Clock },
      approved: { label: "Одобрено", variant: "default", icon: UserCheck },
      rejected: { label: "Отклонено", variant: "destructive", icon: UserX },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const handleTeamAction = (teamId, action) => {
    console.log(`${action} team ${teamId}`)
  }

  const handleParentalConsentAction = (memberId, action) => {
    console.log(`${action} parental consent for member ${memberId}`)
  }

  const handleMassParentalConsent = (teamId, action) => {
    console.log(`${action} all parental consents for team ${teamId}`)
  }

  const filteredTeams = mockTeams.filter((team) => {
    const matchesStatus = statusFilter === "all" || team.status === statusFilter
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.captain.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesStatus && matchesSearch
  })

  const openTeamDetails = (team) => {
    setSelectedTeam(team)
    setIsDetailModalOpen(true)
  }

  return (
      <div className="min-h-screen bg-background text-foreground p-10">
        <div className="max-w-[1600px] mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold">Команды ивента</h1>
          </div>
          <EventNavigation />
          {/* Main Content */}
          <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                <EventTeamStatsCard title='Всего команд' value={eventstats?.total_teams ?? 0} subtitle='в ивенте' icon={Users} isLoading={isPending}/>
                <EventTeamStatsCard title='Одобрено' value={eventstats?.teams?.approved ?? 0} subtitle='готовы к участию' icon={CircleCheckBig} color='text-green-500' isLoading={isPending} />
                <EventTeamStatsCard title='Ожидает' value={eventstats?.teams?.pending ?? 0} subtitle='требует решения' icon={CircleAlert} color='text-orange-500' isLoading={isPending} />
                <EventTeamStatsCard title='Отклонено' value={eventstats?.teams?.rejected ?? 0} subtitle='не прошли отбор' icon={XCircle} color='text-red-500' isLoading={isPending} />
                <EventTeamStatsCard title='Участников' value={eventstats?.total_participants ?? 0} subtitle='всего человек' icon={Users} color='text-blue-500' isLoading={isPending} />
              </div>
            {/* <EventTeamFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            /> */}
            <EventTeamsTable
              filteredTeams={filteredTeams}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
              isDetailModalOpen={isDetailModalOpen}
              setIsDetailModalOpen={setIsDetailModalOpen}
              getStatusBadge={getStatusBadge}
              getParentalConsentBadge={getParentalConsentBadge}
              handleTeamAction={handleTeamAction}
              handleParentalConsentAction={handleParentalConsentAction}
              handleMassParentalConsent={handleMassParentalConsent}
              openTeamDetails={openTeamDetails}
              mockTeams={mockTeams}
            />
          </div>
        </div>
      </div>
  )
}