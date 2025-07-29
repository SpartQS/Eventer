import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Filter, Search, Calendar } from 'lucide-react';

interface EventTeamFiltersProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
}

export function EventTeamFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }: EventTeamFiltersProps) {
  return (
    <Card className="p-8">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl font-bold">
          <Filter className="w-6 h-6" />
          Фильтры и поиск команд
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Label htmlFor="search" className="text-lg font-semibold">Поиск по названию/капитану</Label>
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Введите название команды..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-lg"
              />
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Статус заявки</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="text-lg py-3">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="approved">Одобрено</SelectItem>
                <SelectItem value="rejected">Отклонено</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Дата подачи заявки</Label>
            <div className="relative">
              <Calendar className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input type="date" className="pl-12 py-3 text-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 