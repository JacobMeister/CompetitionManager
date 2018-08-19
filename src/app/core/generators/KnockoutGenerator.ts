import Game, { KnockoutGame, GameStatus } from '../models/Game';
import Generator, { GeneratorInfo, GeneratorResult } from './Generator';
import { UserInfo } from '../models/Competition';

export default class KnockoutGenerator extends Generator {
  private rounds: number;
  private nextGameId: number;
  private nextPlayer: number;
  private previousRound: number;
  games: { [id: string]: KnockoutGame };

  checkValidAmountOfPlayers(amount): string[] {
    const errors: string[] = [];

    if (amount < 2) {
      errors.push('Select at least 2 players.');
    }

    if (!this.isValidKnockout(amount)) {
      errors.push('Amount of players for knockout not valid. Amount of players should be 2, 4, 8, 16, 32 etc.');
    }

    return errors;
  }

  isValidKnockout(amount) {
    return (Math.log(amount) / Math.log(2)) % 1 === 0;
  }

  getRoundsKnockout(amount) {
    return Math.log(amount) / Math.log(2);
  }

  getAmountOfGames(amountPlayers: number) {
    return amountPlayers - 1;
  }

  getAmountOfGamesInRound(amount, round) {
    let games = amount / 2;
    amount /= 2;

    for (let r = 1; r < round; r++) {
      amount /= 2;
      games = amount;
    }

    return games;
  }

  getRoundOfGame(amount, gameId) {
    let round = 0;
    let games = 0;

    while (games < gameId) {
      round++;
      games += this.getAmountOfGamesInRound(amount, round);
    }

    return round;
  }

  resetKnockout() {
    this.previousRound = 1;
    this.games = {};
    this.rounds = this.getRoundsKnockout(this.amountPlayers);
    this.nextGameId = this.getAmountOfGamesInRound(this.amountPlayers, 1) + 1;
    this.nextPlayer = 1;
  }

  generate(generatorInfo): GeneratorResult {
    this.reset(generatorInfo);
    this.resetPlayersAndGames();
    this.resetKnockout();

    for (let round = 1; round <= this.rounds; round++) {
      const gamesInRound = this.getAmountOfGamesInRound(this.amountPlayers, round);

      for (let game = 1; game <= gamesInRound; game++) {
        let player1: UserInfo = { uid: '?', name: '?' };
        let player2: UserInfo = { uid: '?', name: '?' };

        if (round === 1) {
          // Player 1
          player1 = this.getRandomPlayer(undefined, this.games);
          this.registerPlayer(player1);

          // Player 2
          do {
            player2 = this.getRandomPlayer(player1, this.games);
          } while (player1.uid === player2.uid);
          this.registerPlayer(player2);
        }

        // Create game
        this.createGame(round, player1, player2);

        this.previousRound = round;
      }
    }

    return { games: this.games, competition: generatorInfo.competition };
  }

  createGame(round: number, player1: UserInfo, player2: UserInfo) {
    this.amountCreatedGames++;
    this.currentSimultaneousGames++;

    let nextGameIdGame = this.nextGameId.toString();
    if (round === this.rounds) {
      nextGameIdGame = '-';
    }

    const knockoutGame: KnockoutGame = {
      id: this.amountCreatedGames.toString(),
      name: 'Knockout game ' + this.amountCreatedGames + ' (round ' + round + ')',
      status: GameStatus.OPEN,
      competition: { id: this.generatorInfo.id, name: this.generatorInfo.name },
      type: 1,
      player1: player1,
      score1: 0,
      player2: player2,
      score2: 0,
      winner: 0,
      nextGameId: nextGameIdGame,
      nextPlayer: this.nextPlayer,
      round: round
    };

    // Next game and player reference
    this.nextPlayer++;
    if (this.nextPlayer === 3) {
      this.nextPlayer = 1;
      this.nextGameId++;
    }

    this.games[this.amountCreatedGames.toString()] = knockoutGame;

    if (this.currentSimultaneousGames === this.generatorInfo.simultaneousGames) {
      this.currentSimultaneousGames = 0;
    }
  }
}
