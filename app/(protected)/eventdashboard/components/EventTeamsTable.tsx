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
  
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null)

  const toggleRow = (index: number) => {
    setOpenRowIndex(openRowIndex === index ? null : index)
  }

  const { data: teams, isPending, error} = useQuery({
    queryKey: ['Eventsteam'],
    queryFn: () => apiEventTeams.getEventTeams(Number(eventId)),
  })

  const getStatus = (status: string) => {
    const statusConfig = {
      pending: { icon: CircleAlert, color: 'text-orange-500' },
      approved: { icon: CheckCircle, color: 'text-green-500' },
      rejected: { icon: XCircle, color: 'text-red-500' },
    }


    // const config = statusConfig[status]
    // const Icon = config.icon
    const Icon = statusConfig[status].icon
    const color = statusConfig[status].color

    return (
      <Icon className={color} /> 
    )
  }

  function parseDate(dateStr: string) {
    const date = new Date(dateStr); 
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
    
    return `${year}-${month}-${day}`
} 

  return (
    <Card className="p-8">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">Команды ивента "Хакатон 2024"</CardTitle>
        <CardDescription className="text-lg">
          Найдено {filteredTeams.length} команд из {mockTeams.length} зарегистрированных
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Статус</TableHead>
                <TableHead className="text-lg">Название команды</TableHead>
                <TableHead className="text-lg">Дата создания</TableHead>
                <TableHead className="text-lg">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending || !teams?.teams ? (
                <TableRow >
                  <TableCell colSpan={6}><Skeleton className="h-5 w-auto" /></TableCell>
                </TableRow>
              ) : (
                <>
              {teams?.teams.map((team, idx) => ( <>
                  <TableRow onClick={() => toggleRow(idx)} key={idx} className="cursor-pointer hover:bg-muted/50 text-lg">
                    <TableCell className="font-semibold">{getStatus(team.status)}</TableCell>
                    <TableCell className="font-semibold">{team.name}</TableCell>
                    {/* <TableCell>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5" />
                        {team.memberCount}
                        {team.members?.some((m: any) => m.isMinor) && (
                          <AlertTriangle
                            className="w-5 h-5 text-yellow-600"
                            title="Есть несовершеннолетние участники"
                          />
                        )}
                      </div>
                    </TableCell> */}
                    {/* <TableCell>{team.captain}</TableCell> */}
                    {/* <TableCell>{getStatusBadge(team.status)}</TableCell> */}
                    {/* <TableCell>{new Date(team.submissionDate).toLocaleDateString('ru-RU')}</TableCell> */}
                    <TableCell>{parseDate(team.created_at)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="lg" onClick={() => openTeamDetails(team)}>
                          <Eye className="w-5 h-5 mr-2" />
                          Детали
                        </Button>
                        {team.status === 'pending' && (
                          <>
                            <Button variant="default" size="lg" onClick={() => handleTeamAction(team.id, 'approve')}>
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Одобрить
                            </Button>
                            <Button
                              variant="destructive"
                              size="lg"
                              onClick={() => handleTeamAction(team.id, 'reject')}
                            >
                              <XCircle className="w-5 h-5 mr-2" />
                              Отклонить
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {openRowIndex === idx && (
                    // <TableRow>
                    //   <TableCell className="p-2 border-b bg-gray-50 text-sm text-gray-600">
                    //     {team.captain}
                    //   </TableCell>
                    //   <TableCell className="p-2 border-b bg-gray-50 text-sm text-gray-600">
                    //     {team.captain}
                    //   </TableCell>
                    // </TableRow>
                    <tr>
                      {team.members.map((member) => (
                        <td className="p-2 hover:bg-muted/50" colSpan={6}>
                        {/* Вложенная таблица */}
                        <table className="w-full table-auto bg-muted/80">
                          <thead className="hover:bg-muted/50">
                            <tr>
                              <th className="p-2 text-left text-sm w-1/20">Лидер</th>
                              <th className="p-2 text-left text-sm">Имя</th>
                              <th className="p-2 text-left text-sm">Фамилия</th>
                              <th className="p-2 text-left text-sm">Согласие</th>
                            </tr>
                          </thead>
                          <tbody>
                              <tr className="hover:bg-muted/50">
                                <td className="p-2 text-sm border-t w-1/20">{member.is_event_leader && <CheckCircle/>}</td>
                                <td className="p-2 text-sm border-t">{member.firstname}</td>
                                <td className="p-2 text-sm border-t">{member.lastname}</td>
                                <td className="p-2 text-sm border-t">
                                <Button variant="outline" size="lg">
                                  <Eye className="w-5 h-5 mr-2" />
                                  Скачать согласие
                                </Button>
                                </td>
                              </tr>
                          </tbody>
                        </table>
                      </td>
                      ))}
                    </tr>
                  )}
              </>
              ))}
              </>
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
            <DialogDescription>Детальная информация о команде для ивента "Хакатон 2024"</DialogDescription>
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
                    <p className="text-lg">{selectedTeam.captain}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Статус заявки</Label>
                    <div className="mt-1">{getStatusBadge(selectedTeam.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Ивент</Label>
                    <p className="text-lg">Хакатон 2024</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Дата подачи</Label>
                    <p className="text-lg">{new Date(selectedTeam.submissionDate).toLocaleDateString('ru-RU')}</p>
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
                    <Button variant="default" onClick={() => handleMassParentalConsent(selectedTeam.id, 'approve')}>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Одобрить все
                    </Button>
                    <Button
                      variant="destructive"
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
                                <div className="mt-1">{getParentalConsentBadge(member.parentalConsent)}</div>
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