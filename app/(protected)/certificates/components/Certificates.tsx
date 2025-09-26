import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface Certificate {
    id: number;
    title: string;
    description: string;
    date: string;
    type: string;
}

interface CertificatesProps {
    certificates: Certificate[];
}

const typeLabel: Record<string, string> = {
    participation: 'Участие',
    completion: 'Курс',
    achievement: 'Достижение',
}

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
                <Card key={cert.id} className="bg-card text-card-foreground border-border hover:shadow-lg transition">
                    <CardContent className="p-4 sm:p-6 flex flex-col gap-3">
                        {/* Preview */}
                        <div className="aspect-[16/10] w-full rounded-md border bg-muted/40 flex items-center justify-center overflow-hidden">
                            <div className="text-sm text-muted-foreground">Превью сертификата</div>
                        </div>
                        {/* Info */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="text-base font-semibold truncate" title={cert.title}>{cert.title}</h3>
                                <p className="text-xs text-muted-foreground truncate" title={cert.date}>{cert.date}</p>
                            </div>
                            <Badge variant="outline" className="shrink-0">{typeLabel[cert.type] ?? cert.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {cert.description}
                        </p>
                        {/* Actions */}
                        <div className="flex justify-end">
                            <Button
                                className="gap-2"
                                onClick={() => window.open('#', '_blank')}
                            >
                                <Download className="h-4 w-4" />
                                Скачать
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Certificates; 