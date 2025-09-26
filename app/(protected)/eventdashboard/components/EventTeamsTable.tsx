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
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

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

  const stopClickPropagation = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  const { data: teams, isPending, error } = useQuery({
    queryKey: ['Eventsteam'],
    queryFn: () => apiEventTeams.getEventTeams(Number(eventId)),
  })

  //   const getStatusBadge = (status: string) => {
  //     switch (status) {
  //         case "active":
  //             return <Badge className="bg-green-600 hover:bg-green-700">Активный</Badge>
  //         case "waiting":
  //             return <Badge className="bg-blue-600 hover:bg-blue-700">Предстоящий</Badge>
  //         case "closed":
  //             return <Badge className="bg-gray-600 hover:bg-gray-700">Завершен</Badge>
  //         default:
  //             return <Badge variant="secondary">{status}</Badge>
  //     }
  // }

  const getStatus = (status: string) => {
    const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
      pending: { icon: CircleAlert, color: 'text-orange-500', label: 'Ожидает' },
      approved: { icon: CheckCircle, color: 'text-green-500', label: 'Одобрено' },
      rejected: { icon: XCircle, color: 'text-red-500', label: 'Отклонено' },
    }
    const fallback = { icon: CircleAlert, color: 'text-muted-foreground', label: 'Неизвестно' }
    const mapped = statusConfig[status] ?? fallback
    const Icon = mapped.icon
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center">
            <Icon className={mapped.color} />
          </span>
        </TooltipTrigger>
        <TooltipContent>{mapped.label}</TooltipContent>
      </Tooltip>
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
      <CardContent className="pt-0 px-4 md:px-6">
        <div className="rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg text-center w-[96px]">Статус</TableHead>
                <TableHead className="text-lg">Название команды</TableHead>
                <TableHead className="text-lg text-center w-[140px]">Дата создания</TableHead>
                <TableHead className="text-lg text-right w-[320px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending || !teams?.teams ? (
                <TableRow >
                  <TableCell colSpan={6}><Skeleton className="h-5 w-auto" /></TableCell>
                </TableRow>
              ) : (
                <>
                  {teams?.teams.map((team, idx) => (
                    <>
                      <TableRow onClick={() => toggleRow(idx)} key={team.id ?? idx} className="cursor-pointer hover:bg-muted/50 text-lg">
                        <TableCell className="font-semibold text-center">{getStatus(team.status)}</TableCell>
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
                        <TableCell className="text-center">{parseDate(team.created_at)}</TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-2 justify-end min-w-[280px]">
                            <Button variant="ghost" size="sm" onClick={(e) => { stopClickPropagation(e); openTeamDetails(team) }}>
                              <Eye className="w-4 h-4 mr-2" />
                              Детали
                            </Button>
                            {team.status === 'pending' && (
                              <>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm" onClick={stopClickPropagation}>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Одобрить
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Подтвердить одобрение команды?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Это действие одобрит заявку команды. Продолжить?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleTeamAction(team.id, 'approve')}>Одобрить</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm" onClick={stopClickPropagation}>
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Отклонить
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Отклонить команду?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Заявка будет отклонена. Вы уверены?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                                      <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => handleTeamAction(team.id, 'reject')}>Отклонить</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
                            {team.status === 'approved' && (
                              <Badge variant="outline" className="text-green-500 border-green-500/40">Одобрено</Badge>
                            )}
                            {team.status === 'rejected' && (
                              <Badge variant="outline" className="text-red-500 border-red-500/40">Отклонено</Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      {openRowIndex === idx && (
                        <TableRow key={`expanded-${team.id ?? idx}`} className="bg-muted/30">
                          <TableCell colSpan={4} className="p-0">
                            <div className="p-2">
                              <table className="w-full table-auto bg-muted/60 rounded-md">
                                <thead className="hover:bg-muted/50">
                                  <tr>
                                    <th className="p-2 text-center text-sm w-[96px]">Лидер</th>
                                    <th className="p-2 text-left text-sm">Имя</th>
                                    <th className="p-2 text-left text-sm">Фамилия</th>
                                    <th className="p-2 text-right text-sm w-[220px]">Согласие</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {team.members?.map((member: any) => (
                                    <tr className="hover:bg-muted/50" key={member.id}>
                                      <td className="p-2 text-sm border-t text-center">{member.is_event_leader && <CheckCircle />}</td>
                                      <td className="p-2 text-sm border-t">{member.firstname}</td>
                                      <td className="p-2 text-sm border-t">{member.lastname}</td>
                                      <td className="p-2 text-sm border-t text-right">
                                        <Button variant="outline" size="sm" onClick={stopClickPropagation} className="inline-flex">
                                          <Eye className="w-4 h-4 mr-2" />
                                          Скачать согласие
                                        </Button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </TableCell>
                        </TableRow>
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