import { restAxios } from '../api';

export interface JoinTeam {
  event_id: number;
  invite_token: string;
}

export interface CreateTeam {
  event_id: number;
  name: string;
}

interface TeamMember {
  firstname: string;
  lastname: string;
  is_event_leader: boolean;
}

interface Team {
  name: string;
  status: 'pending' | 'approved' | 'rejected'; 
  created_at: string; 
  members: TeamMember[];
}

interface TeamsResponse {
  teams: Team[];
}

export const apiEventTeams = {
  getEventTeam: async (event_id: number) => {
    return (await restAxios.get(`api/events/${event_id}/event-teams/my`)).data
  },
  createTeam: async (event_id: number, name: string) => {
    return (await restAxios.post(`/api/events/${event_id}/event-teams`, {name})).data;
  },
  joinTeam: async (event_id: number, invite_token: string) => {
    return (await restAxios.post(`/api/events/${event_id}/event-teams/join/${invite_token}`)).data;
  },
  getEventTeams: async (event_id: number, page?: number, page_size?: number): Promise<TeamsResponse> => {
    return (await restAxios.get(`/api/events/${event_id}/event-teams`)).data;
  },

  // getEventsTeams: async (params?: {
  //   event_id: number
  //   page?: number
  //   page_size?: number
  // }): Promise<TeamsResponse> => {
  //   return (await restAxios.get(`/api/events/${params?.event_id}/event-teams`, {params })).data
  // },

}

