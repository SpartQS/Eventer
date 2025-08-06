import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Eye, CheckCircle, XCircle, AlertTriangle, UserCheck, UserX, CircleAlert } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiEventTeams } from '@/app/api/http/EventTeams/event_teams';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

export function EventTeamsTable({
  filteredTeams,
  selectedTeam,
  setSelectedTeam,
  isDetailModalOpen,
  setIsDetailModalOpen,
  getStatusBadge,
  getParentalConsentBadge,
  handleTeamAction,
  handleParentalConsentAction,
  handleMassParentalConsent,
  openTeamDetails,
  mockTeams,
}: any) {
  const params = useParams();
  const eventId = params.id;

  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setOpenRowIndex(openRowIndex === index ? null : index);
  };

  const { data: teams, isPending, error } = useQuery({
    queryKey: ['Eventsteam'],
    queryFn: () => apiEventTeams.getEventTeams(Number(eventId)),
  });

  const getStatus = (status: string) => {
    const statusConfig = {
      pending: { icon: CircleAlert, color: 'text-orange-500' },
      approved: { icon: CheckCircle, color: 'text-green-500' },
      rejected: { icon: XCircle, color: 'text-red-500' },
    };

    const Icon = statusConfig[status]?.icon || CircleAlert;
    const color = statusConfig[status]?.color || 'text-muted-foreground';

    return <Icon className={`h-5 w-5 ${color}`} />;
  };

  function parseDate(dateStr: string) {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <Card className="p-6">
      <CardHeader className="pb-4 px-0">
        <CardTitle className="text-2xl font-bold">Команды ивента "Хакатон 2024"</CardTitle>
        <CardDescription className="text-base">
          Найдено {filteredTeams.length} команд из {mockTeams.length} зарегистрированных
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0 px-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Статус</TableHead>
                <TableHead>Название команды</TableHead>
                <TableHead className="w-[150px]">Дата создания</TableHead>
                <TableHead className="w-[300px] text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending || !teams?.teams ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                </TableRow>
              ) : (
                teams?.teams.map((team, idx) => (
                  <>
                    <TableRow
                      key={team.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleRow(idx)}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          {getStatus(team.status)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{parseDate(team.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openTeamDetails(team);
                            }}
                            className="hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Детали
                          </Button>
                          {team.status === 'pending' && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTeamAction(team.id, 'approve');
                                }}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Одобрить
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTeamAction(team.id, 'reject');
                                }}
                                className="hover:bg-red-700"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Отклонить
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {openRowIndex === idx && (
                      <TableRow className="bg-muted/20">
                        <TableCell colSpan={4} className="p-0">
                          <div className="p-4">
                            <h4 className="text-sm font-medium mb-2">Участники команды:</h4>
                            <div className="border rounded-lg overflow-hidden">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[50px]">Лидер</TableHead>
                                    <TableHead>Имя</TableHead>
                                    <TableHead>Фамилия</TableHead>
                                    <TableHead className="text-right">Согласие</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {team.members?.map((member) => (
                                    <TableRow key={member.id}>
                                      <TableCell>
                                        {member.is_event_leader && <CheckCircle className="h-4 w-4 text-green-500" />}
                                      </TableCell>
                                      <TableCell>{member.firstname}</TableCell>
                                      <TableCell>{member.lastname}</TableCell>
                                      <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                          <Eye className="w-4 h-4 mr-2" />
                                          Скачать согласие
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Team Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {selectedTeam?.name}
            </DialogTitle>
            <DialogDescription>
              Детальная информация о команде для ивента "Хакатон 2024"
            </DialogDescription>
          </DialogHeader>

          {selectedTeam && (
            <Tabs defaultValue="members" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="members">Участники</TabsTrigger>
                <TabsTrigger value="consents">Родительские согласия</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium">Капитан команды</Label>
                    <p className="text-base">{selectedTeam.captain}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Статус заявки</Label>
                    <div className="mt-1">{getStatusBadge(selectedTeam.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Ивент</Label>
                    <p className="text-base">Хакатон 2024</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Дата подачи</Label>
                    <p className="text-base">
                      {new Date(selectedTeam.submissionDate).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Список участников</h3>
                  <div className="space-y-3">
                    {selectedTeam.members?.map((member: any) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <Label className="text-sm font-medium">ФИО</Label>
                              <p className="font-medium">{member.name}</p>
                              {member.isMinor && (
                                <Badge variant="outline" className="mt-1">
                                  Несовершеннолетний
                                </Badge>
                              )}
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Возраст</Label>
                              <p>{member.age} лет</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Контакты</Label>
                              <p className="text-sm">{member.email}</p>
                              <p className="text-sm">{member.phone}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Статус участия</Label>
                              <div className="mt-1">{getStatusBadge(member.status)}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="consents" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Родительские согласия</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleMassParentalConsent(selectedTeam.id, 'approve')}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Одобрить все
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleMassParentalConsent(selectedTeam.id, 'reject')}
                    >
                      <UserX className="w-4 h-4 mr-2" />
                      Отклонить все
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedTeam.members
                    ?.filter((member: any) => member.isMinor)
                    .map((member: any) => (
                      <Card key={member.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{member.name}</h4>
                                <Badge variant="outline">{member.age} лет</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <p>{member.email}</p>
                                <p>{member.phone}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <Label className="text-sm font-medium">Родительское согласие</Label>
                                <div className="mt-1">
                                  {getParentalConsentBadge(member.parentalConsent)}
                                </div>
                              </div>

                              {member.parentalConsent === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() => handleParentalConsentAction(member.id, 'approve')}
                                  >
                                    <UserCheck className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleParentalConsentAction(member.id, 'reject')}
                                  >
                                    <UserX className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                  {selectedTeam.members?.filter((member: any) => member.isMinor).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      В команде нет несовершеннолетних участников
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}