"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
    UsersIcon,
    CalendarIcon,
    MoreHorizontalIcon,
    EditIcon,
    TrashIcon,
    EyeIcon,
    PlusIcon,
    UserPlusIcon,
    CrownIcon,
    MailIcon,
    CopyIcon,
    Share2Icon
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Team, mockTeams } from "../data"
import { toast } from "sonner"
import TeamModal from "./team-modal"
import { apiTeams } from "@/app/api/http/teams/teams"
import { useQuery } from "@tanstack/react-query"

interface TeamsListProps {
    searchQuery: string
}

export default function TeamsList({ searchQuery }: TeamsListProps) {
    const [modalOpen, setModalOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const {data: all_team, error, isPending } = useQuery({
        queryKey: ['teams'],
        queryFn: () => apiTeams.getTeams()
    })

    if (error) {
        return ''
    } 

    if (isPending) {
        return ''
    }

    // if (filteredTeams.length === 0) {
    //     return (
    //         <Card>
    //             <CardContent className="flex flex-col items-center justify-center py-16">
    //                 <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
    //                     <UsersIcon className="w-12 h-12 text-muted-foreground" />
    //                 </div>
    //                 <h3 className="text-xl font-semibold mb-2">
    //                     {searchQuery ? "Команды не найдены" : "У вас пока нет команд"}
    //                 </h3>
    //                 <p className="text-muted-foreground text-center mb-6 max-w-md">
    //                     {searchQuery
    //                         ? "Попробуйте изменить поисковый запрос или создать новую команду"
    //                         : "Создайте свою первую команду для участия в мероприятиях и начните сотрудничать с другими участниками"
    //                     }
    //                 </p>
    //                 {!searchQuery && (
    //                     <Button size="lg" className="flex items-center gap-2">
    //                         <PlusIcon className="w-5 h-5" />
    //                         Создать команду
    //                     </Button>
    //                 )}
    //             </CardContent>
    //         </Card>
    //     )
    // }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                {all_team?.map((team, index) => (
                    <Card key={team.id} className="hover:shadow-lg transition-all duration-200 group border-0 shadow-sm min-h-[340px] h-full flex flex-col cursor-pointer" onClick={() => handleOpenModal(team)}>
                        <CardContent className="p-4 flex flex-col h-full">
                            {/* Header with avatar and status */}
                            <div className="flex items-center justify-between mb-3">
                                <Avatar className="h-14 w-14 border-2 border-border shadow-sm">
                                    <AvatarImage src={team.logo} alt={team.team_name} />
                                    <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">
                                        {team.team_name.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-end gap-1">
                                    {/* {getStatusBadge(team.status)} */}
                                    {/* {team.members.find(m => m.role === "leader") && (
                                        <Badge variant="outline" className="flex items-center gap-1 text-xs">
                                            <CrownIcon className="w-3 h-3" />
                                            Лидер
                                        </Badge>
                                    )} */}
                                </div>
                            </div>

                            {/* Team name */}
                            <CardTitle className="text-base font-semibold mb-2 line-clamp-1">
                                {team.team_name}
                            </CardTitle>

                            {/* Team info with progress */}
                            <div className="space-y-2 mb-3">
                                <div className="space-y-1">
                                    {/* <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Участники</span>
                                        <span className="font-medium">{team.membersCount}/{team.maxMembers}</span>
                                    </div> */}
                                    {/* <div className="relative">
                                        <Progress
                                            value={(team.membersCount / team.maxMembers) * 100}
                                            className="h-2"
                                        />
                                        <div
                                            className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${getProgressColorClass((team.membersCount / team.maxMembers) * 100)}`}
                                            style={{ width: `${(team.membersCount / team.maxMembers) * 100}%` }}
                                        />
                                    </div> */}
                                </div>
                                {/* <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span>Создана {formatDate(team.createdAt)}</span>
                                </div> */}
                            </div>

                            {/* Description */}
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-4">
                                {team.description}
                            </p>

                            {/* Events */}
                            {/* {team.events.length > 0 && (
                                <div className="mb-2">
                                    <div className="flex flex-wrap gap-1 line-clamp-1 max-h-6 overflow-hidden">
                                        {team.events.slice(0, 2).map((event, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {event}
                                            </Badge>
                                        ))}
                                        {team.events.length > 2 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{team.events.length - 2}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )} */}

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-3 border-t mt-auto">
                                <Button
                                    size="sm"
                                    // onClick={(e) => { e.stopPropagation(); handleInviteMember(team.id) }}
                                    // disabled={team.membersCount >= team.maxMembers}
                                    className="flex items-center gap-1 text-xs"
                                >
                                    <UserPlusIcon className="w-3 h-3" />
                                    Пригласить
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={e => e.stopPropagation()}>
                                            <MoreHorizontalIcon className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem className="flex items-center gap-2 text-xs" 
                                        // onClick={() => handleEditTeam(team)}
                                        >
                                            <EditIcon className="w-3 h-3" />
                                            Редактировать
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="flex items-center gap-2 text-xs"
                                            // onClick={(e) => { e.stopPropagation(); handleCopyTeamLink(team.id) }}
                                        >
                                            <CopyIcon className="w-3 h-3" />
                                            Копировать ссылку
                                        </DropdownMenuItem>
                                        <Separator />
                                        <DropdownMenuItem
                                            className="flex items-center gap-2 text-red-600 text-xs"
                                            // onClick={(e) => { e.stopPropagation(); handleDeleteTeam(team.id) }}
                                        >
                                            <TrashIcon className="w-3 h-3" />
                                            Удалить
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            {/* <TeamModal
                open={modalOpen}
                team={selectedTeam}
                onClose={() => { setModalOpen(false); setEditMode(false); setSelectedTeam(null) }}
                onSave={handleSaveTeam}
                onDelete={handleDeleteTeamModal}
                autoFocusNewMemberInput={editMode}
            /> */}
        </>
    )
} 