import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import Game, { GameStatus, KnockoutGame, PouleGame, TournamentGame } from '../models/Game';
import Competition, { CompetitionType, CompetitionStatus } from '../models/Competition';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class GameService {
  private gameCollection: AngularFirestoreCollection<Game>;
  private games$: Observable<Game[]>;

  constructor(private db: AngularFirestore) {
    this.gameCollection = this.db.collection<Game>('games');
  }

  public get games(): Observable<Game[]> {
    return this.games$;
  }

  public async deleteGame(gameId) {
    await this.db
      .collection('games')
      .doc(gameId)
      .delete();
  }

  public async deleteAllGamesCompetition(competition: Competition) {
    competition.games = {};

    const batch = this.db.firestore.batch();
    const collection = await this.db.collection('games', ref => ref.where('competition.id', '==', competition.id));
    await collection
      .valueChanges()
      .take(1)
      .map((games: Game[]) => {
        for (const game of games) {
          batch.delete(collection.doc(game.id).ref);
        }
      })
      .toPromise();
    await batch.commit();

    // Delete references
    try {
      const deleteGames = { games: {} };
      await this.db
        .collection('competitions')
        .doc(competition.id)
        .update(deleteGames);
    } catch (e) {
      console.log('Error', e);
    }
  }

  public requestGameId(): string {
    return this.db.createId();
  }

  public async addGames(games: { [id: string]: Game }, competition: Competition) {
    const collection = this.db.collection('games');
    const batch = this.db.firestore.batch();

    Object.entries(games).forEach(([id, game]) => {
      const ref = collection.doc(game.id.toString());
      batch.set(ref.ref, game);
    });

    await batch.commit();

    // Update competition relationship
    let updateCompetition = {};

    if (competition['poules'] === undefined) {
      updateCompetition = {
        games: competition.games,
        status: CompetitionStatus.PLAYING,
        startTimeDay: competition.startTimeDay,
        endTimeDay: competition.endTimeDay,
        participants: competition.participants,
        simultaneousGames: competition.simultaneousGames
      };
    } else {
      updateCompetition = {
        games: competition.games,
        status: CompetitionStatus.PLAYING,
        startTimeDay: competition.startTimeDay,
        endTimeDay: competition.endTimeDay,
        participants: competition.participants,
        simultaneousGames: competition.simultaneousGames,
        poules: competition['poules']
      };
    }



    await this.db
      .collection('competitions')
      .doc(competition.id)
      .update(updateCompetition);
  }

  public getGame(id: string): Observable<Game> {
    const itemDoc = this.gameCollection.doc<Game>(id);
    return itemDoc.valueChanges();
  }

  public getAllGamesForCompetition(competitionId: string): Observable<Game[]> {
    const gameCollection = this.db.collection<Game>('games', ref =>
      ref.where('competition.id', '==', competitionId).orderBy('start')
    );
    return gameCollection.valueChanges();
  }

  public getGamesForCompetition(competitionId: string): Observable<Game[]> {
    const gameCollection = this.db.collection<Game>('games', ref =>
      ref.where('competition.id', '==', competitionId).where('type', '==', 0)
    );
    return gameCollection.valueChanges();
  }

  public getKnockoutGamesForCompetition(competitionId: string): Observable<KnockoutGame[]> {
    const gameCollection = this.db.collection<KnockoutGame>('games', ref =>
      ref.where('competition.id', '==', competitionId).where('type', '==', 1)
    );
    return gameCollection.valueChanges();
  }

  public getPouleGamesForCompetition(competitionId: string): Observable<PouleGame[]> {
    const gameCollection = this.db.collection<PouleGame>('games', ref =>
      ref.where('competition.id', '==', competitionId).where('type', '==', 2)
    );
    return gameCollection.valueChanges();
  }

  private updateKnockoutWinner(game: KnockoutGame): Game {
    game.winner = game.score1 > game.score2 ? 1 : 2;

    // Update next game
    const update = {};
    update['player' + game.nextPlayer] = game['player' + game.winner];
    this.gameCollection.doc(game.nextGameId).update(update);

    // Return game with new winner
    return game;
  }

  public updateGame(game: Game) {
    if (game.status === GameStatus.FINISHED && game.type === 1) {
      game = this.updateKnockoutWinner(game as KnockoutGame);
    }
    this.gameCollection.doc<Game>(game.id).set(game);
  }
}
