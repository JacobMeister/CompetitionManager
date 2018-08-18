import Generator, { GeneratorInfo, GeneratorResult } from './Generator';
import Game, { GameStatus, TournamentGame } from '../models/Game';
import { UserInfo } from '../models/Competition';

export default class TournamentGenerator extends Generator {
  games: { [id: string]: TournamentGame };

  generate(generatorInfo): GeneratorResult {
    this.games = {};
    this.reset(generatorInfo);
    this.resetPlayersAndGames();

    while (this.amountCreatedGames < this.amountGames) {
      // Player 1
      const player1 = this.getRandomPlayer(undefined, this.games);
      this.registerPlayer(player1);

      // Player 2
      let player2: UserInfo;
      while (player2 === undefined || player2 === null) {
        player2 = this.getRandomPlayer(player1, this.games);
      }
      this.registerPlayer(player2);

      // Create game
      this.createGame(player1, player2);
    }

    return { games: this.games, competition: generatorInfo.competition };
  }

  getAmountOfGames(amountPlayers: number) {
    let amountGames = 1;

    for (let i = 3; i <= amountPlayers; i++) {
      amountGames += i - 1;
    }

    return amountGames;
  }

  createGame(player1, player2) {
    this.amountCreatedGames++;
    this.currentSimultaneousGames++;

    if (
      this.checkIfPlayerIsInRound(player1, this.round, this.games) ||
      this.checkIfPlayerIsInRound(player2, this.round, this.games)
    ) {
      this.calculateNextDateAndTimeOfGame();
      this.round++;
      this.currentSimultaneousGames = 0;
    }

    const game: TournamentGame = {
      id: 'ID' + this.amountCreatedGames,
      name: 'Tournament game ' + this.amountCreatedGames,
      status: GameStatus.OPEN,
      competition: { id: this.generatorInfo.id, name: this.generatorInfo.name },
      type: 0,
      start: this.start,
      end: this.end,
      player1: player1,
      score1: 0,
      player2: player2,
      score2: 0,
      winner: 0,
      round: this.round
    };
    this.games['ID' + this.amountCreatedGames] = game;

    if (this.currentSimultaneousGames === this.generatorInfo.simultaneousGames) {
      this.calculateNextDateAndTimeOfGame();
      this.round++;
      this.currentSimultaneousGames = 0;
    }
  }
}
