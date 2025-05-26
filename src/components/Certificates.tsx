import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Certificate {
  title: string;
  downloadUrl: string;
}

const Certificates: React.FC = () => {
  const certificates: Certificate[] = [
    {
      title: 'Студенту интенсива "От идеи к прототипу" осень 24',
      downloadUrl: '#'
    },
    {
      title: 'Студенту интенсива "От идеи к прототипу" осень 24',
      downloadUrl: '#'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {certificates.map((cert, index) => (
        <Card key={index} className="bg-background border border-border">
          <CardContent className="p-3 flex flex-row items-center justify-between space-x-2">
            <p className="text-foreground text-base font-medium line-clamp-2">
              {cert.title}
            </p>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={() => window.open(cert.downloadUrl, '_blank')}
            >
              <Download className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Certificates; 