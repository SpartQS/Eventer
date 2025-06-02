import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const Certificates: React.FC<CertificatesProps> = ({ certificates }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
                <Card key={cert.id} className="bg-background border border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex flex-col space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-foreground">
                                {cert.title}
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 shrink-0"
                                onClick={() => window.open('#', '_blank')}
                            >
                                <Download className="h-5 w-5" />
                            </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {cert.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {cert.date}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Certificates; 