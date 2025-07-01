import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import React, { useRef, useEffect } from "react"
import { TeamMember } from "../data"

interface TeamMembersListProps {
    members: TeamMember[]
    setMembers?: (members: TeamMember[]) => void
    editable?: boolean
    newMember?: { id: string }
    setNewMember?: (m: { id: string }) => void
    roles?: string[]
    autoFocusInput?: boolean
}

const defaultRoles = ["Разработчик", "Дизайнер", "Экономист", "Лидер"]

const mockUserById = (id: string): TeamMember | null => {
    if (!id) return null
    return {
        id,
        name: `User ${id}`,
        email: `${id}@mail.com`,
        role: "member",
        joinedAt: new Date().toISOString(),
    }
}

export default function TeamMembersList({
    members,
    setMembers,
    editable = false,
    newMember,
    setNewMember,
    roles = defaultRoles,
    autoFocusInput = false
}: TeamMembersListProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (autoFocusInput && inputRef.current) {
            inputRef.current.focus()
        }
    }, [autoFocusInput])
    const handleDelete = (idx: number) => {
        setMembers && setMembers(members.filter((_, i) => i !== idx))
    }
    const handleAdd = () => {
        if (!setMembers || !setNewMember || !newMember) return
        const user = mockUserById(newMember.id)
        if (!user) return
        if (members.some(m => m.id === newMember.id)) return
        setMembers([...members, user])
        setNewMember({ id: '' })
    }

    return (
        <div className="bg-card border rounded-xl p-4">
            <div className="font-semibold text-base mb-1">Команда</div>
            <div className="text-muted-foreground text-sm mb-3">Участников - {members.length}</div>
            <div className="flex flex-col gap-3 max-h-60 sm:max-h-60 overflow-y-auto sm:overflow-y-auto max-sm:max-h-40">
                {members.map((member, idx) => (
                    <div key={member.id} className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold leading-tight truncate">{member.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{member.email}</div>
                        </div>
                        {editable && (
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(idx)}>
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            {editable && setNewMember && newMember && (
                <div className="flex items-center gap-2 mt-4 w-full">
                    <Input
                        ref={inputRef}
                        autoFocus={autoFocusInput}
                        placeholder="ID пользователя"
                        value={newMember.id}
                        onChange={e => setNewMember({ id: e.target.value })}
                        className="h-8 text-xs w-full max-w-xs"
                    />
                    <Button size="sm" onClick={handleAdd} className="h-8 px-3 whitespace-nowrap">Добавить</Button>
                </div>
            )}
        </div>
    )
} 