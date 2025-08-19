import { restAxios } from '../api';

type Team = {
  team_name: string;
  logo: string;
  description: string;
  created_at: string; 
  id: number;
};

type Inviter = {
  email: string;
  firstname: string;
  lastname: string;
};

type Invitation = {
  code: string;
  team: Team;
  expired_at: string; 
  inviter: Inviter;
};


export const apiInvites = {
  getInvites: async (): Promise<Invitation[]> => {
    return (await restAxios.get(`/api/users/me/team-invites`)).data
  },

  acceptInvite: async (code: string) => {
    return (await restAxios.post(`/api/teams/invites/${code}/accept`, code)).data;
  },

  rejectInvite: async (code: string) => {
    return (await restAxios.post(`/api/teams/invites/${code}/reject`, code)).data;
  },

}

