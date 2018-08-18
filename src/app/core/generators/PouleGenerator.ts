import Generator, { GeneratorResult, GeneratorInfo } from './Generator';
import Game, { PouleGame, GameStatus } from '../models/Game';
import TournamentGenerator from './TournamentGenerator';
import Competition, { UserInfo } from '../models/Competition';

export interface GroupsGeneratorInfo {
  competition: Competition;
  participants: [UserInfo[]];
  id: string;
  name: string;
  simultaneousGames: number;
  duration: number;
  startDateAndTime: Date;
  startTimeDay: number;
  endTimeDay: number;
}

export default class PouleGenerator extends Generator {
  private amountOfPoules;
  public maxPlayersInPoule;
  games: { [id: string]: PouleGame };
  generationData: {
    [pouleId: string]: { available: UserInfo[]; registered: UserInfo[]; gameCounter: number; maxGames: number };
  };

  calculateAmountOfPoules(amountPlayers, maxPlayersInPoule): number {
    this.amountOfPoules = Math.ceil(amountPlayers / maxPlayersInPoule);
    return this.amountOfPoules;
  }

  calculatePlayersInPouleByIndex(index: number) {
    const amountOfPoules = this.calculateAmountOfPoules(this.amountPlayers, this.maxPlayersInPoule);

    if (index < 0 || index >= amountOfPoules) {
      // Invalid poule
      return 0;
    }

    let rest = this.amountPlayers % this.maxPlayersInPoule;

    if (rest > 0) {
      let amountOfPlayersInPoule = Math.floor(this.amountPlayers / amountOfPoules);
      rest = this.amountPlayers % amountOfPoules;

      if (rest === 0) {
        return amountOfPlayersInPoule;
      }

      if (index < rest) {
        amountOfPlayersInPoule += 1;
      }

      return amountOfPlayersInPoule;
    }

    return this.maxPlayersInPoule;
  }

  getAmountOfGamesInPoule(amountPlayers: number) {
    let amountGames = 1;

    for (let i = 3; i <= amountPlayers; i++) {
      amountGames += i - 1;
    }

    return amountGames;
  }

  getAmountOfGames(amountPlayers: number) {
    const amountOfPoules = this.calculateAmountOfPoules(amountPlayers, this.maxPlayersInPoule);
    let amountOfGames = 0;

    for (let i = 0; i < amountOfPoules; i++) {
      const playersInPoule = this.calculatePlayersInPouleByIndex(i);
      const gamesInPoule = this.getAmountOfGamesInPoule(playersInPoule);
      amountOfGames += gamesInPoule;
    }

    return amountOfGames;
  }

  checkIfPlayerIsInRoundAndPoule(player: UserInfo, round: number, poule: string): boolean {
    let isFound = false;

    Object.entries(this.games).forEach(([gameId, game]) => {
      if (game.round === round && game.poule === poule && (game.player1 === player || game.player2 === player)) {
        isFound = true;
      }
    });

    return isFound;
  }

  resetPoule(generatorInfo) {
    this.games = {};
    this.amountOfPoules = this.calculateAmountOfPoules(this.amountPlayers, this.maxPlayersInPoule);

    this.generationData = {};
    this.generatorInfo.competition['poules'] = {};

    let firstIndex = 0;

    for (let i = 0; i < this.amountOfPoules; i++) {
      const pouleLetter = String.fromCharCode(65 + i);
      const playersInPoule = this.calculatePlayersInPouleByIndex(i);
      const maxGames = this.getAmountOfGamesInPoule(playersInPoule);

      this.generationData[pouleLetter] = { available: [], registered: [], gameCounter: 0, maxGames: maxGames };
      this.generatorInfo.competition['poules'][pouleLetter] = [];

      for (let p = firstIndex; p < firstIndex + playersInPoule; p++) {
        this.generationData[pouleLetter].available.push(this.availablePlayersRound[p]);
        this.generatorInfo.competition['poules'][pouleLetter].push(this.availablePlayersRound[p]);
      }

      firstIndex += playersInPoule;
    }
  }

  resetPouleWithGroups(generatorInfo: GroupsGeneratorInfo) {
    this.games = {};
    this.amountOfPoules = Object.keys(generatorInfo.participants).length;

    this.generationData = {};
    this.generatorInfo.competition['poules'] = {};

    this.amountPlayers = 0;
    this.amountGames = 0;

    Object.entries(generatorInfo.participants).forEach(([pouleIndex, userInfos]) => {
      const pouleLetter = String.fromCharCode(65 + Number(pouleIndex));
      this.amountPlayers += userInfos.length;
      const gamesInPoule = this.getAmountOfGamesInPoule(userInfos.length);
      this.amountGames += gamesInPoule;

      this.generationData[pouleLetter] = { available: [], registered: [], gameCounter: 0, maxGames: gamesInPoule };
      this.generatorInfo.competition['poules'][pouleLetter] = [];

      Object.entries(userInfos).forEach(([index, userInfo]) => {
        this.generationData[pouleLetter].available.push(userInfo);
        this.generatorInfo.competition['poules'][pouleLetter].push(userInfo);
      });
    });
  }

  generate(generatorInfo): GeneratorResult {
    this.maxPlayersInPoule = 4;
    this.reset(generatorInfo);
    this.resetPlayersAndGames();
    this.resetPoule(generatorInfo);
    this.generationBody();
    return { games: this.games, competition: generatorInfo.competition };
  }

  generateWithPoules(generatorInfo: GroupsGeneratorInfo): GeneratorResult {
    this.reset(generatorInfo);
    this.resetPouleWithGroups(generatorInfo);
    this.generationBody();
    return { games: this.games, competition: generatorInfo.competition };
  }

  private generationBody() {
    while (this.amountCreatedGames < this.amountGames) {
      for (let i = 0; i < this.amountOfPoules; i++) {
        const pouleLetter = String.fromCharCode(65 + i);

        // Load generation data
        this.availablePlayersRound = this.generationData[pouleLetter].available;
        this.registeredPlayersRound = this.generationData[pouleLetter].registered;

        if (this.generationData[pouleLetter].gameCounter === this.generationData[pouleLetter].maxGames) {
          // Created all games for the poule
          continue;
        }

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
        this.createGame(player1, player2, pouleLetter);

        // Save generation data
        this.generationData[pouleLetter].available = this.availablePlayersRound;
        this.generationData[pouleLetter].registered = this.registeredPlayersRound;
        this.generationData[pouleLetter].gameCounter++;

        if (this.amountCreatedGames === this.amountGames) {
          break;
        }
      }
    }
  }

  createGame(player1, player2, pouleLetter) {
    this.amountCreatedGames++;
    this.currentSimultaneousGames++;

    if (
      this.checkIfPlayerIsInRoundAndPoule(player1, this.round, pouleLetter.charCodeAt(0)) ||
      this.checkIfPlayerIsInRound(player2, this.round, pouleLetter.charCodeAt(0))
    ) {
      this.calculateNextDateAndTimeOfGame();
      this.round++;
      this.currentSimultaneousGames = 0;
    }

    const game: PouleGame = {
      id: 'ID' + this.amountCreatedGames,
      name: 'Poule ' + pouleLetter + ' game ' + this.generationData[pouleLetter].gameCounter,
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
      round: this.round,
      poule: pouleLetter
    };
    this.games['ID' + this.amountCreatedGames] = game;

    if (this.currentSimultaneousGames === this.generatorInfo.simultaneousGames) {
      this.calculateNextDateAndTimeOfGame();
      this.round++;
      this.currentSimultaneousGames = 0;
    }
  }
}
