import { restAxios } from '../api';

export interface Category {
  id: number
  category_name: string
}

export interface Events {
  id: number
  event_name: string
  description: string
  image_url: string
  users_count: number
  format: string
  venue: string
  start_date: string
  end_date: string
  event_status: string
  orginizer_id: number
  category_id: number
  category: Category
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
  getAllEvents: async (params?: {
    page?: number
    page_size?: number
    venue?: string | null
    date?: string | null
    category?: string | null
    format?: string | null
    event_status?: string | null
  }): Promise<EventsResponse> => {
    return (await restAxios.get(`api/events`, {params })).data
  }
}

