import { restAxios } from '../api';

export interface Stages {
  stage_name: number
  description: string
  type: string
  users_on_stage: number
  stage_status: string
  id: number
  start_date: string
  end_date: string

}

export const apiStages = {
  getAllStages: async (event_id: number): Promise<Stages[]> => {
    return (await restAxios.get(`http://localhost:8000/api/events/${event_id}/stages/`)).data
  },
}
