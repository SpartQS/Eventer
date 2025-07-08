import { restAxios } from '../api';

interface Invite {
  id: number;
  team_id: number;
  expired_at: string;
  code: string;
  inviter_id: number;
  invitee_id: number;
  used: boolean;
}

export const apiInvites = {
  getInvites: async (): Promise<Invite[]> => {
    return (await restAxios.get(`/api/users/me/team-invites`)).data
  },
}

