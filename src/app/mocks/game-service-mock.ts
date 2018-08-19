import Game, { GameStatus } from "../core/models/Game";
import Competition from "../core/models/Competition";
import { Observable } from "rxjs/Observable";

export class GameServiceMock {
    public addGame(game: Game, competition: Competition): Game {
      game.id = 'new id';
      return game;
    }
  
    public getAllGamesForCompetition(competitionId: string): Observable<Game[]> {
      return new Observable<Game[]>(observer => {
        const gameList: Game[] = [];
  
        for (let i = 0; i < 5; i++) {
          const game: Game = {
            name: 'Game ' + i,
            id: 'ID ' + i,
            status: GameStatus.OPEN,
            competition: { id: 'competition id', name: 'competition name' },
            type: 0,
            start: new Date(2018, 8, 18, 9, 30, 0, 0),
            end: new Date(2018, 8, 18, 11, 0, 0, 0),
            player1: { uid: 'p1uid' + i, name: 'p1name' + i },
            player2: { uid: 'p2uid' + i, name: 'p2name' + i },
            winner: 0,
            round: i % 2 + 1,
            score1: 0,
            score2: 0
          };
  
          if (i < 3) {
            game['poule'] = 'A';
          } else {
            game['poule'] = 'B';
          }
  
          gameList.push(game);
        }
  
        observer.next(gameList);
        observer.complete();
      });
    }
  }
  