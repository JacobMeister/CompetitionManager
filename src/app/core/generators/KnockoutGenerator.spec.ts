import KnockoutGenerator from './KnockoutGenerator';
import { GeneratorInfo, GeneratorResult } from './Generator';
import Competition from '../models/Competition';

describe('KnockoutGenerator', () => {
  let knockoutGenerator: KnockoutGenerator;
  beforeEach(() => {
    knockoutGenerator = new KnockoutGenerator();
  });

  it('create an instance', () => {
    expect(knockoutGenerator).toBeTruthy();
  });

  it('has not enough players', () => {
    const errors = knockoutGenerator.checkValidAmountOfPlayers(1);
    expect(errors.length).toEqual(1);
    expect(errors.indexOf('Select at least 2 players.') !== -1).toBe(true);
  });

  it('can validate correct amount of players', () => {
    expect(knockoutGenerator.isValidKnockout(2)).toEqual(true);
    expect(knockoutGenerator.isValidKnockout(3)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(4)).toEqual(true);
    expect(knockoutGenerator.isValidKnockout(5)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(6)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(7)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(8)).toEqual(true);
    expect(knockoutGenerator.isValidKnockout(9)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(15)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(16)).toEqual(true);
    expect(knockoutGenerator.isValidKnockout(17)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(31)).toEqual(false);
    expect(knockoutGenerator.isValidKnockout(32)).toEqual(true);
    expect(knockoutGenerator.isValidKnockout(33)).toEqual(false);
  });

  it('can get amount of games in round', () => {
    expect(knockoutGenerator.getAmountOfGamesInRound(8, 1)).toEqual(4);
  });

  it('can get amount of rounds', () => {
    expect(knockoutGenerator.getRoundsKnockout(2)).toEqual(1);
    expect(knockoutGenerator.getRoundsKnockout(4)).toEqual(2);
    expect(knockoutGenerator.getRoundsKnockout(8)).toEqual(3);
  });

  it('can get amount of games', () => {
    expect(knockoutGenerator.getAmountOfGames(2)).toEqual(1);
    expect(knockoutGenerator.getAmountOfGames(4)).toEqual(3);
    expect(knockoutGenerator.getAmountOfGames(8)).toEqual(7);
  });

  it('has a valid amount of players', () => {
    const errors = knockoutGenerator.checkValidAmountOfPlayers(2);
    expect(errors.length).toEqual(0);
  });

  it('can get round of games', () => {
    expect(knockoutGenerator.getRoundOfGame(8, 5)).toEqual(2);
  });

  it('has an invalid amount of players', () => {
    const errors = knockoutGenerator.checkValidAmountOfPlayers(3);
    expect(errors.length).toEqual(1);
    expect(
      errors.indexOf('Amount of players for knockout not valid. Amount of players should be 2, 4, 8, 16, 32 etc.') !==
        -1
    ).toBe(true);
  });

  it('can generate games for a knockout with 8 participants', () => {
    const participantsGeneratorInfo = [];
    const participants = {};
    for (let i = 1; i <= 8; i++) {
      participantsGeneratorInfo.push({ uid: 'UID' + i, name: 'NAME' + i });
      participants['ID' + i] = { uid: 'UID' + i, name: 'NAME' + i };
    }

    const competition: Competition = {
        id: 'id',
        name: 'competitie',
        owner: { uid: '1', name: 'owner' },
        type: 0,
        status: 0,
        games: {},
        durationGame: 60,
        maxParticipants: 8,
        participants: {},
        startDate: '2020-08-18',
        simultaneousGames: 2
    };

    const generatorInfo: GeneratorInfo = {
      competition: competition,
      participants: participantsGeneratorInfo,
      id: competition.id,
      name: competition.name,
      simultaneousGames: competition.simultaneousGames,
      duration: competition.durationGame,
      startDateAndTime: new Date(),
      startTimeDay: 8000000,
      endTimeDay: 9000000
    };

    const generatorResult: GeneratorResult = knockoutGenerator.generate(generatorInfo);
    expect(Object.entries(generatorResult.games).length).toEqual(7);
  });

  it('can generate games for a knockout with 16 participants', () => {
    const participantsGeneratorInfo = [];
    const participants = {};
    for (let i = 1; i <= 16; i++) {
      participantsGeneratorInfo.push({ uid: 'UID' + i, name: 'NAME' + i });
      participants['ID' + i] = { uid: 'UID' + i, name: 'NAME' + i };
    }

    const competition: Competition = {
        id: 'id',
        name: 'competitie',
        owner: { uid: '1', name: 'owner' },
        type: 0,
        status: 0,
        games: {},
        durationGame: 60,
        maxParticipants: 8,
        participants: {},
        startDate: '2020-08-18',
        simultaneousGames: 2
    };

    const generatorInfo: GeneratorInfo = {
      competition: competition,
      participants: participantsGeneratorInfo,
      id: competition.id,
      name: competition.name,
      simultaneousGames: competition.simultaneousGames,
      duration: competition.durationGame,
      startDateAndTime: new Date(),
      startTimeDay: 8000000,
      endTimeDay: 9000000
    };

    const generatorResult: GeneratorResult = knockoutGenerator.generate(generatorInfo);
    expect(Object.entries(generatorResult.games).length).toEqual(15);
  });
});
