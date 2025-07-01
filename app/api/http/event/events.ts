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
  category_id: number
  description: string
  start_date: any
  end_date: any
  event_name: string
  event_status: string
  format: string
  image_url: string
  organizer_id: number
  users_count: number
  venue: string
  stages: EventStage[]
}

export interface CurrentEvents {
  team: string
  event: string
  stage: string
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
  }
}

