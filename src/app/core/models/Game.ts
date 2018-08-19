export enum GameStatus {
    OPEN,
    FINISHED
  }
  
  export default class Game {
    name: string;
    id: string;
    status: GameStatus = GameStatus.OPEN;
    competition: { id: string; name: string };
    type: number;
    player1: { uid: string; name: string };
    score1: number;
    player2: { uid: string; name: string };
    score2: number;
    winner: number;
    round: number;
  }
  
  export class TournamentGame extends Game {}
  
  export class KnockoutGame extends Game {
    nextGameId: string;
    nextPlayer: number;
  }
  
  export class PouleGame extends Game {
    poule: string;
  }
  