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

export default function EventTeamStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  isLoading
}: EventTeamStatsCardProps) {
  return (
    <Card className="p-6 h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0 pb-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${color || 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent className="p-0 flex flex-col flex-grow justify-between">
        {isLoading ? (
          <Skeleton className="h-8 w-20 my-2" />
        ) : (
          <div className={`text-3xl font-bold ${color || ''}`}>{value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}