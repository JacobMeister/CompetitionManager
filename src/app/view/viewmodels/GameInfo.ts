export interface GameInfo {
    done: boolean;
    player1: {
      score: number;
      name: string;
      winner: boolean;
    };
    player2: {
      score: number;
      name: string;
      winner: boolean;
    };
  }
  