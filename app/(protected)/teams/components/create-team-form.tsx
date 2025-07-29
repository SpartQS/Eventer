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
import { apiTeams, CreateTeam, CreateTeamResponse } from "@/app/api/http/teams/teams"
import { useMutation } from "@tanstack/react-query"

export default function CreateTeamForm() {
    const [teamData, setTeamData] = useState<CreateTeam>({
        team_name: '',
        logo: '',
        description: '',
      });

    const [showSuccess, setShowSuccess] = useState(false);

    const CreateTeamMutation = useMutation<CreateTeamResponse, Error, CreateTeam>({
        mutationFn: apiTeams.createTeam,
        onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); // Убрать через 3 сек
            setTeamData({ team_name: '', logo: '', description: '' });
        },
        onError: () => {
            toast.error("Ошибка при создании команды");
          }
    })

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        CreateTeamMutation.mutate(teamData);
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTeamData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

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
                {showSuccess && (
                    <div style={{
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        background: '#4BB543',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        zIndex: 9999
                    }}>
                        ✅ Команда успешно создана!
                    </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Аватар команды
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
                        </div> */}

                        {/* Аватар команды ТОЛЬКО ПО URL */}
                        <div className="space-y-2">
                            <Label htmlFor="logo">Аватар команды *</Label>
                            <Input
                                name="logo"
                                type="text"
                                value={teamData.logo}
                                onChange={handleChange}
                                placeholder="Введите url аватара"
                                required
                            />
                        </div>

                        {/* Название команды */}
                        <div className="space-y-2">
                            <Label htmlFor="team_name">Название команды *</Label>
                            <Input
                                name="team_name"
                                type="text"
                                value={teamData.team_name}
                                onChange={handleChange}
                                placeholder="Введите название команды"
                                required
                            />
                        </div>

                        {/* Описание */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Описание команды *</Label>
                            <Textarea
                                name="description"
                                value={teamData.description}
                                onChange={handleChange}
                                placeholder="Расскажите о вашей команде, целях и опыте..."
                                rows={4}
                            />
                        </div>

                        {/* Кнопка создания */}
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={CreateTeamMutation.isPending}
                                className="min-w-[140px]"
                            >
                                {CreateTeamMutation.isPending ? (
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