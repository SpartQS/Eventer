import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { UsersIcon, CalendarIcon, CopyIcon, TrashIcon, UploadIcon } from "lucide-react"
import { Team, TeamMember } from "../data"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import TeamMembersList from "./team-members-list"
import { toast } from "sonner"

const roles = ["Разработчик", "Дизайнер", "Экономист", "Лидер"]
const statusOptions = [
    { value: "active", label: "Активная" },
    { value: "inactive", label: "Неактивная" }
]

interface TeamModalProps {
    open: boolean
    team: Team | null
    onClose: () => void
    onDelete?: (id: string) => void
    onSave?: (team: Team) => void
    autoFocusNewMemberInput?: boolean
}

export default function TeamModal({ open, team, onClose, onDelete, onSave, autoFocusNewMemberInput }: TeamModalProps) {
    const [form, setForm] = useState<Team | null>(team)
    const [members, setMembers] = useState<TeamMember[]>(team?.members || [])
    const [newMember, setNewMember] = useState<{ id: string }>({ id: '' })
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(team?.avatar)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setForm(team)
        setMembers(team?.members || [])
        setNewMember({ id: '' })
        setAvatarPreview(team?.avatar)
    }, [team, open])

    if (!form) return null

    const handleField = (field: keyof Team, value: any) => {
        setForm(prev => prev ? { ...prev, [field]: value } : prev)
    }
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setAvatarPreview(ev.target?.result as string)
                handleField('avatar', ev.target?.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/teams/${form.id}`)
        toast.success("Ссылка скопирована")
    }
    const handleDelete = () => {
        if (onDelete) onDelete(form.id)
        onClose()
    }
    const handleSave = () => {
        if (onSave) onSave({ ...form, members, membersCount: members.length })
        toast.success("Изменения сохранены")
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg w-full sm:max-w-lg sm:rounded-xl rounded-none min-h-[500px] sm:min-h-[600px] max-h-[90vh] p-2 sm:p-6 !overflow-y-auto !max-h-[100dvh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3 w-full">
                        <div className="flex items-center gap-3 w-full">
                            <Avatar className="h-14 w-14">
                                {avatarPreview ? (
                                    <AvatarImage src={avatarPreview} alt={form.name} />
                                ) : (
                                    <AvatarFallback>{form.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                )}
                            </Avatar>
                            <Button
                                variant="outline"
                                size="icon"
                                className="ml-2"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <UploadIcon className="w-4 h-4" />
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                            <Input
                                value={form.name}
                                onChange={e => handleField('name', e.target.value)}
                                className="text-lg sm:text-2xl font-bold border-none shadow-none focus-visible:ring-0 px-2 py-1 bg-transparent w-full sm:w-[180px]"
                            />
                        </div>
                        <Select value={form.status} onValueChange={v => handleField('status', v)}>
                            <SelectTrigger className="w-full sm:w-32 mt-2 sm:mt-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto">
                    <Textarea
                        value={form.description}
                        onChange={e => handleField('description', e.target.value)}
                        className="mt-2 mb-4 text-muted-foreground text-sm resize-none w-full"
                        rows={3}
                        maxLength={400}
                    />
                    <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                        <UsersIcon className="w-4 h-4" />
                        <span>{members.length}/</span>
                        <Select value={String(form.maxMembers)} onValueChange={v => handleField('maxMembers', Number(v))}>
                            <SelectTrigger className="w-16 h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span>участников</span>
                        <CalendarIcon className="w-4 h-4 ml-4" />
                        <span>Создана {new Date(form.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <TeamMembersList
                        members={members}
                        setMembers={setMembers}
                        editable={true}
                        newMember={newMember}
                        setNewMember={setNewMember}
                        roles={roles}
                        autoFocusInput={autoFocusNewMemberInput}
                    />
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-4 items-center w-full">
                        <span className="font-semibold">Мероприятия:</span>
                        <Input
                            value={form.events?.join(", ") || ""}
                            onChange={e => handleField('events', e.target.value.split(/,\s*/))}
                            className="w-full sm:max-w-xs text-xs"
                            placeholder="Через запятую"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 mt-6 justify-end w-full">
                        <Button variant="outline" size="sm" onClick={handleCopy} className="w-full sm:w-auto">
                            <CopyIcon className="w-4 h-4 mr-1" /> Копировать ссылку
                        </Button>
                        <Button variant="destructive" size="sm" onClick={handleDelete} className="w-full sm:w-auto">
                            <TrashIcon className="w-4 h-4 mr-1" /> Удалить
                        </Button>
                        <Button size="sm" onClick={handleSave} className="w-full sm:w-auto">
                            Сохранить
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 