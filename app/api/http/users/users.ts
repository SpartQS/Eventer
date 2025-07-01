import { getServerSession } from 'next-auth';
import { restAxios } from '../api';
import { authOptions } from '@/lib/auth';
import { getSession } from 'next-auth/react';


type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  role: string
  gender: string
  age: number
  city_id: number
}

interface stage {
  event_id: number
  stage_id: number
  title: string
  start_date: string
}

interface upcomingstages {
  stages: stage[]
}

interface Category {
  id: number
  category_name: string
}

interface TopCategoryItem {
  category: Category
  count: number
}

export interface TopCategoriesResponse {
  'top-categories': TopCategoryItem[]
}

export const apiUsers = {
  getUpcomingStages: async (): Promise<upcomingstages> => {
    return (await restAxios.get(`/api/users/my/events/upcoming-stages`)).data
  },

  getTopCategories: async (): Promise<TopCategoriesResponse> => {
    return (await restAxios.get(`/api/users/my/top-categories`)).data
  }
}

