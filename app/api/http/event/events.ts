import { restAxios } from '../api';

// const nextAxios = axios.create({
//     // baseURL: process.env.NEXTAUTH_URL,
//     baseURL: '//localhost:8000',
//   });

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

  // getEvent: async (id: number) => {
  //   const res = await restAxios.get(`/api/events/${id}`);
  //   return await (res.data as Promise<Event>);
  // },

  getCurrentEventsUser: async (): Promise<CurrentEvents[]> => {
    return (await restAxios.get(`/api/users/users/my/events/current`)).data
  }
}

