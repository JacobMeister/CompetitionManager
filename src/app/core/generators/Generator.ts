import Competition, { UserInfo } from '../models/Competition';
import Game from '../models/Game';
import { DateHelper } from './DateHelper';

export interface GeneratorInfo {
    competition: Competition;
    participants: UserInfo[];
    id: string;
    name: string;
    simultaneousGames: number;
    duration: number;
    startDateAndTime: Date;
    startTimeDay: number;
    endTimeDay: number;
  }
  
  export interface GeneratorResult {
    games: { [id: string]: Game };
    competition: Competition;
  }
  
  export default class Generator {
    generatorInfo: GeneratorInfo;
    start: Date;
    end: Date;
    amountCreatedGames: number;
    amountPlayers: number;
    amountGames: number;
  
    availablePlayersRound: UserInfo[];
    registeredPlayersRound: UserInfo[];
  
    round: number;
    currentSimultaneousGames;
  
    checkValidAmountOfPlayers(amount): string[] {
      const errors: string[] = [];
  
      if (amount < 2) {
        errors.push('Select at least 2 players.');
      }
  
      return errors;
    }
  
    generate(generatorInfo): GeneratorResult {
      return {
        games: {},
        competition: generatorInfo.competition
      };
    }
  
    reset(generatorInfo) {
      this.generatorInfo = generatorInfo;
      this.start = this.generatorInfo.startDateAndTime;
      this.end = new Date(this.start.getTime() + 60000 * this.generatorInfo.duration);
  
      this.currentSimultaneousGames = 0;
      this.amountCreatedGames = 0;
      this.round = 1;
    }
  
    resetPlayersAndGames() {
      this.amountPlayers = Object.keys(this.generatorInfo.participants).length;
      this.amountGames = this.getAmountOfGames(this.amountPlayers);
      this.availablePlayersRound = this.generatorInfo.participants;
      this.registeredPlayersRound = [];
    }
  
    getAmountOfGames(amountPlayers: number) {
      return 0;
    }
  
    getRandomPlayer(player: UserInfo, games: { [id: string]: Game }) {
      if (player === undefined) {
        return this.availablePlayersRound[0];
      }
  
      for (let playerIndex = 0; playerIndex < this.availablePlayersRound.length; playerIndex++) {
        if (this.isValid(player, this.availablePlayersRound[playerIndex], games)) {
          return this.availablePlayersRound[playerIndex];
        }
      }
  
      this.handleInvalidOpponents();
  
      return null;
    }
  
    isValid(player: UserInfo, opponent: UserInfo, games: { [id: string]: Game }) {
      // Check if undefined
      if (player === undefined || opponent === undefined) {
        return false;
      }
  
      // Check different player and opponent
      if (player.uid === opponent.uid) {
        return false;
      }
  
      // Check valid game
      const game = Object.entries(games).find(g => {
        if (g[1].player1.uid === player.uid && g[1].player2.uid === opponent.uid) {
          return true;
        }
        if (g[1].player1.uid === opponent.uid && g[1].player2.uid === player.uid) {
          return true;
        }
        return false;
      });
  
      return game === undefined;
    }
  
    registerPlayer(player: UserInfo) {
      const index = this.availablePlayersRound.findIndex(a => {
        if (a === player) {
          return true;
        }
      });
  
      if (index >= 0) {
        this.registeredPlayersRound.push(this.availablePlayersRound[index]);
        this.availablePlayersRound.splice(index, 1);
        this.handleRounds();
      }
    }
  
    handleRounds() {
      if (this.availablePlayersRound.length === 0 || this.availablePlayersRound[0] === undefined) {
        this.availablePlayersRound = this.registeredPlayersRound;
        this.registeredPlayersRound = [];
      }
    }
  
    handleInvalidOpponents() {
      const temp = this.availablePlayersRound;
      this.availablePlayersRound = this.registeredPlayersRound;
  
      for (let playerIndex = 0; playerIndex < this.registeredPlayersRound.length; playerIndex++) {
        temp.push(this.registeredPlayersRound[playerIndex]);
      }
  
      this.availablePlayersRound = temp;
      this.registeredPlayersRound = [];
    }
  
    checkIfPlayerIsInRound(player: UserInfo, round: number, games: { [id: string]: Game }): boolean {
      let isFound = false;
  
      Object.entries(games).forEach(([gameId, game]) => {
        if (game.round === round && (game.player1 === player || game.player2 === player)) {
          isFound = true;
        }
      });
  
      return isFound;
    }
  
    calculateNextDateAndTimeOfGame() {
      const minutes = 60 * 1000;
      let isValid = false;
  
      while (!isValid) {
        this.start = new Date(this.start.getTime() + minutes * this.generatorInfo.duration);
        this.end = new Date(this.start.getTime() + minutes * this.generatorInfo.duration);
        if (this.isValidTime(this.start) && this.isValidTime(this.end)) {
          isValid = true;
          break;
        }
  
        // Start at next day
        this.start.setDate(this.start.getDate() + 1);
        this.start = new Date(this.start.toDateString() + ' ' + this.generatorInfo.startTimeDay);
        this.end = new Date(this.start.getTime() + minutes * this.generatorInfo.duration);
        isValid = true;
      }
    }
  
    isValidTime(time: Date): boolean {
      const dateHelper = new DateHelper();
      const currentDate = dateHelper.getCurrentDate();
      const startTimeDay = new Date(currentDate + ' ' + this.generatorInfo.startTimeDay);
      const endTimeDay = new Date(currentDate + ' ' + this.generatorInfo.endTimeDay);
  
      if (
        time.getHours() < startTimeDay.getHours() ||
        (time.getHours() === startTimeDay.getHours() && time.getMinutes() < startTimeDay.getMinutes())
      ) {
        return false;
      }
  
      if (
        time.getHours() > endTimeDay.getHours() ||
        (time.getHours() === endTimeDay.getHours() && time.getMinutes() > endTimeDay.getMinutes())
      ) {
        return false;
      }
  
      return true;
    }
  }
  