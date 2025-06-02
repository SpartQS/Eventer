'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DocumentUploadProps {
    onFileUpload: (file: File, type: 'regulation' | 'task') => void
}

export function DocumentUpload({ onFileUpload }: DocumentUploadProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Загрузка документов</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label className="text-base mb-4 block">Регламент</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <p className="text-base text-muted-foreground mb-4">
                                Перетащите файлы сюда или нажмите для выбора
                                <br />
                                PDF, DOC до 10 МБ
                            </p>
                        </div>
                        <div className="mt-4 space-y-4">
                            <Label htmlFor="regulation-file" className="text-base text-muted-foreground">
                                Загруженные файлы
                            </Label>
                            <Input
                                id="regulation-file"
                                defaultValue="pravila.pdf"
                                className="text-base"
                            />
                        </div>
                    </div>
                    <div>
                        <Label className="text-base mb-4 block">Задание</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <p className="text-base text-muted-foreground mb-4">
                                Перетащите файлы сюда или нажмите для выбора
                                <br />
                                PDF, DOC до 20 МБ
                            </p>
                        </div>
                        <div className="mt-4 space-y-4">
                            <Label htmlFor="task-file" className="text-base text-muted-foreground">
                                Загруженные файлы
                            </Label>
                            <Input
                                id="task-file"
                                defaultValue="pravila.pdf"
                                className="text-base"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 