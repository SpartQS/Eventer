import { restAxios } from '../api';

export interface CreateTeam {
  team_name: string;
  logo: string;
  description: string;
}

export interface CreateTeamResponse {
  team_name: string;
  logo: string;
  description: string;
}

interface Teams {
  team_name: string;
  logo: string;
  description: string;
  id: number
}


export const apiTeams = {
  createTeam: async (teamData: CreateTeam) => {
    return (await restAxios.post(`/api/teams`, teamData)).data;
  },

  getTeams: async (): Promise<Teams[]> => {
    return (await restAxios.get(`/api/teams`)).data
  },
}

