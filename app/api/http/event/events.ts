import { restAxios } from '../api';

// const nextAxios = axios.create({
//     // baseURL: process.env.NEXTAUTH_URL,
//     baseURL: '//localhost:8000',
//   });

export interface EventStage {
  stage_name: string
  description: string
  type: string
  users_on_stage: number
  stage_status: string
  id: number
  start_date: string
  end_date: string
}

export interface Event {
  id: number
  event_name: string
  description: string
  image_url: string
  users_count: number
  format: string
  venue: string
  stages: EventStage[]
}

export interface CurrentEvents {
  team: string
  event: string
  stage: string
}

type EventsResponse = {
  events: Events[]
  total: number
  count: number
  offset: number
}

export const apiEvents = {
  // getEvents: async ({signal}: { signal: AbortSignal}) => {
  //   const res = await restAxios.get(`/api/events`, { signal });
  //   return await (res.data as Promise<Event[]>);
  // },

  getCurrentEventsUser: async (): Promise<CurrentEvents[]> => {
    return (await restAxios.get(`/api/users/users/my/events/current`)).data
  },

  getEventDetail: async (id: number): Promise<Event> => {
    const res = await restAxios.get(`/api/events/${id}`);
    return res.data as Event;
  },

  getMyEvents: async (): Promise<{ events: Event[], total: number, count: number, offset: number }> => {
    const res = await restAxios.get(`api/events/my/participations/?page=1&page_size=10`);
    return res.data;
  }
}

