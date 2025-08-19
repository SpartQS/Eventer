'use client';

import { Bell, Check, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiUsers } from "@/app/api/http/users/users";
import { apiInvites } from "@/app/api/http/invites/invites";
import { toast } from "sonner";

interface NotificationItem {
    id: number
    message: string
    time: string
    inviter: string
    event: string
}

export function Notifications() {
    // const [notifications, setNotifications] = useState<NotificationItem[]>([
    //     {
    //         id: 1,
    //         message: "Команда Horizon приглашает вас присоединиться к хакатону",
    //         time: "2 часа назад",
    //         inviter: "Horizon",
    //         event: "Хакатон",
    //     },
    //     {
    //         id: 2,
    //         message: "Команда Fly приглашает вас присоединиться к киберспорту",
    //         time: "3 часа назад",
    //         inviter: "Fly",
    //         event: "Киберспорт",
    //     },
    // ])

    // const handleAccept = (id: number) => {
    //     console.log(`Accepted invitation ${id}`)
    //     setNotifications((prev) => prev.filter((n) => n.id !== id))
    // }

    // const handleDecline = (id: number) => {
    //     console.log(`Declined invitation ${id}`)
    //     setNotifications((prev) => prev.filter((n) => n.id !== id))
    // }

    const [showSuccess, setShowSuccess] = useState(false);  

    const AcceptInviteMutation = useMutation({
        mutationFn: apiInvites.acceptInvite,
        onSuccess: () => {
            toast.success("✅ Приглашение принято");
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000); 
        },
        onError: () => {
            toast.error("❌ Не удалось принять приглашение");
          }
    })

    const RejectInviteMutation = useMutation({
        mutationFn: apiInvites.rejectInvite,
        onSuccess: () => {
            // setShowSuccess(true);
            // setTimeout(() => setShowSuccess(false), 3000); 
        },
        onError: () => {
            toast.error("❌ Не удалось отклонить приглашение");
          }
    })

    function parseDate(dateStr: string) {
        const date = new Date(dateStr); 
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; 
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        return new Date(year, month - 1, day, hours, minutes, seconds);
        // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    function formatTimeDifference(startDateStr: string): string {
        const startDate = parseDate(startDateStr);
        const now = new Date();
        const diffMs = startDate.getTime() - now.getTime();

        if (isNaN(diffMs)) return 'Некорректная дата';
        if (diffMs <= 0) return 'Уже началось';

        const diffSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(diffSeconds / (60 * 60 * 24));
        const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        return [
            days > 0 ? `${days}:` : '00',
            hours > 0 ? `${hours}:` : '00',
            `${minutes}:`,
            `${seconds}`,
        ]
            .filter(Boolean)
            .join('');
    }

    const {data: invites, error, isPending } = useQuery({
        queryKey: ['invites'],
        queryFn: () => apiInvites.getInvites()
    })

    if (error) {
        return <Card>
            <CardContent className="h-auto md:h-[calc(100%-60px)] overflow-x-auto">
                Нет приглашений
            </CardContent>
        </Card>
    } 

    if (isPending) {
        return <Card>
        <CardContent className="h-auto md:h-[calc(100%-60px)] overflow-x-auto">
            Нет приглашений
        </CardContent>
        </Card>
    }

    // const [showSuccess, setShowSuccess] = useState(false);

    return (
        <Card className="bg-card text-card-foreground border-border h-[450px] flex-1">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <Bell className="h-6 w-6" />
                    Рассылка
                </CardTitle>
            </CardHeader>
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
                        ✅ Заявка принята
                    </div>
                    )}
            <CardContent className="space-y-4 h-[calc(100%-60px)] overflow-y-auto">
                {invites?.map((notification, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-base text-foreground">
                                {notification.inviter.firstname} {notification.inviter.lastname} приглашает вас в команду {notification.team.team_name}<br/>
                                приглашение станет не действительным через 
                                <span className="text-muted-foreground ml-2">{formatTimeDifference(notification.expired_at)}</span>
                                {/* {notification.message} <span className="text-muted-foreground ml-2">{notification.time}</span> */}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 hover:bg-green-100 dark:hover:bg-green-900"
                                    >
                                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Подтверждение действия</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Вы точно хотите принять заявку на вступление?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="flex flex-col md:flex-row gap-2">
                                        <AlertDialogAction 
                                        onClick={() => AcceptInviteMutation.mutate(notification.code)}
                                        disabled={AcceptInviteMutation.isPending}
                                        >
                                            Принять
                                        </AlertDialogAction>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 hover:bg-red-100 dark:hover:bg-red-900"
                                    >
                                        <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Подтверждение действия</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Вы точно хотите отклонить заявку на вступление?
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="flex flex-col md:flex-row gap-2">
                                        <AlertDialogAction 
                                        onClick={() => RejectInviteMutation.mutate(notification.code)}
                                        disabled={AcceptInviteMutation.isPending}
                                        >
                                            Отклонить
                                        </AlertDialogAction>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
} 