"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UploadIcon, UsersIcon, CheckIcon } from "lucide-react"
import { toast } from "sonner"

interface CreateTeamFormProps {
    onTeamCreated: () => void
}

export default function CreateTeamForm({ onTeamCreated }: CreateTeamFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        maxMembers: "4",
        avatar: null as File | null
    })
    const [avatarPreview, setAvatarPreview] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData(prev => ({ ...prev, avatar: file }))
            const reader = new FileReader()
            reader.onload = (e) => {
                setAvatarPreview(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Здесь будет API запрос для создания команды
            await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация API

            toast.success("Команда успешно создана!")
            onTeamCreated()
        } catch (error) {
            toast.error("Ошибка при создании команды")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UsersIcon className="w-6 h-6" />
                        Создать новую команду
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Аватар команды */}
                        <div className="space-y-2">
                            <Label>Аватар команды</Label>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src={avatarPreview} />
                                    <AvatarFallback>
                                        {formData.name ? formData.name.substring(0, 2).toUpperCase() : "ТМ"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                        id="avatar-upload"
                                    />
                                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                                        <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                                            <UploadIcon className="w-4 h-4" />
                                            <span>Загрузить изображение</span>
                                        </div>
                                    </Label>
                                </div>
                            </div>
                        </div>

                        {/* Название команды */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Название команды *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Введите название команды"
                                required
                            />
                        </div>

                        {/* Описание */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Описание команды</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Расскажите о вашей команде, целях и опыте..."
                                rows={4}
                            />
                        </div>

                        {/* Максимальное количество участников */}
                        <div className="space-y-2">
                            <Label htmlFor="maxMembers">Максимальное количество участников</Label>
                            <Select value={formData.maxMembers} onValueChange={(value) => setFormData(prev => ({ ...prev, maxMembers: value }))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2">2 участника</SelectItem>
                                    <SelectItem value="3">3 участника</SelectItem>
                                    <SelectItem value="4">4 участника</SelectItem>
                                    <SelectItem value="5">5 участников</SelectItem>
                                    <SelectItem value="6">6 участников</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Кнопка создания */}
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isSubmitting || !formData.name.trim()}
                                className="min-w-[140px]"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Создание...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <CheckIcon className="w-4 h-4" />
                                        Создать команду
                                    </div>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
} 