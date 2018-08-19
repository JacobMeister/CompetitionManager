
export enum CompetitionStatus {
  OPEN,
  PLAYING,
  FINISHED
}

export enum CompetitionType {
  TOURNAMENT,
  KNOCKOUT,
  POULE
}

export interface UserInfo {
  uid: string;
  name: string;
}

export default class Competition {
  id: string;
  name: string;
  status: CompetitionStatus = CompetitionStatus.OPEN;
  type: CompetitionType;
  maxParticipants: number;
  participants: { [id: string]: UserInfo };
  games: { [id: string]: string };
  owner: UserInfo;
  simultaneousGames?: number;
}
