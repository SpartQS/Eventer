import { restAxios } from '../api';

type Event = {
  //
}

export interface TeamWithEvent {
  event_name: string;
  team: Team;
}

export interface TeamMember {
  user_id: number;
  is_leader: boolean;
  is_active: boolean;
}

export interface Team {
  id: number;
  team_name: string;
  logo: string;
  description: string;
  members: TeamMember[];
}

export const apiEventTeams = {
  // getEvents: async ({signal}: { signal: AbortSignal}) => {
  //   const res = await nextAxios.get(`/api/events`, { signal });
  //   return await (res.data as Promise<Event[]>);
  // },

  // getEvent: async (id: number) => {
  //   const res = await nextAxios.get(`/api/events/${id}`);
  //   return await (res.data as Promise<Event>);
  // }

  getUserInActiveEvent: async (user_id: number): Promise<TeamWithEvent[]> => {
    return (await restAxios.get(`/api/teams/get_user_team_in_active_event/${user_id}`)).data
  }
}

