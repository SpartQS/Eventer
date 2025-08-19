import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';

interface EventTeamStatsCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  isLoading: boolean;
}

export default function EventTeamStatsCard({ title, value, subtitle, icon: Icon, color, isLoading }: EventTeamStatsCardProps) {
  return (
    <Card className="p-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <Icon className={`h-6 w-6 ${color || 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <Skeleton className="h-8 w-20 mb-2" />
        ) : (
          <div className={`text-3xl font-extrabold ${color || ''}`}>{value}</div>
        )}
        <p className="text-base text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}


