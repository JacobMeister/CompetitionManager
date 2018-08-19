import PouleGenerator from './PouleGenerator';
import { GeneratorInfo, GeneratorResult } from './Generator';
import Competition from '../models/Competition';

describe('PouleGenerator', () => {
  let pouleGenerator: PouleGenerator;
  beforeEach(done => {
    pouleGenerator = new PouleGenerator();
    pouleGenerator.maxPlayersInPoule = 4;
    done();
  });

  it('create an instance', () => {
    expect(pouleGenerator).toBeTruthy();
  });

  it('can get amount of poules', () => {
    expect(pouleGenerator.calculateAmountOfPoules(8, 4)).toEqual(2);
    expect(pouleGenerator.calculateAmountOfPoules(10, 4)).toEqual(3);
    expect(pouleGenerator.calculateAmountOfPoules(12, 4)).toEqual(3);
    expect(pouleGenerator.calculateAmountOfPoules(12, 3)).toEqual(4);
  });

  it('can get amount of players in poule by index', () => {
    pouleGenerator.amountPlayers = 10;
    expect(pouleGenerator.calculatePlayersInPouleByIndex(0)).toEqual(4);
    expect(pouleGenerator.calculatePlayersInPouleByIndex(1)).toEqual(3);
    expect(pouleGenerator.calculatePlayersInPouleByIndex(2)).toEqual(3);
    expect(pouleGenerator.calculatePlayersInPouleByIndex(-1)).toEqual(0);
    expect(pouleGenerator.calculatePlayersInPouleByIndex(3)).toEqual(0);
  });

  it('can get amount of games in poule by index', () => {
    expect(pouleGenerator.getAmountOfGamesInPoule(4)).toEqual(6);
    expect(pouleGenerator.getAmountOfGamesInPoule(3)).toEqual(3);
  });

  it('can get amount of games with 7 players', () => {
    pouleGenerator.amountPlayers = 7;
    expect(pouleGenerator.getAmountOfGames(7)).toEqual(9);
  });

  it('can get amount of games with 8 players', () => {
    pouleGenerator.amountPlayers = 8;
    expect(pouleGenerator.getAmountOfGames(8)).toEqual(12);
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

    const generatorResult: GeneratorResult = pouleGenerator.generate(generatorInfo);
    expect(Object.entries(generatorResult.games).length).toEqual(12);
    expect(Object.entries(generatorResult.competition['poules']).length).toEqual(2);
    expect(generatorResult.competition['poules']['A']).toBeDefined();
    expect(generatorResult.competition['poules']['B']).toBeDefined();
    expect(generatorResult.competition['poules']['C']).toBeUndefined();
    expect(Object.entries(generatorResult.competition['poules']['A']).length).toEqual(4);
    expect(Object.entries(generatorResult.competition['poules']['B']).length).toEqual(4);
  });

  it('can generate games for a knockout with 10 participants', () => {
    const participantsGeneratorInfo = [];
    const participants = {};
    for (let i = 1; i <= 10; i++) {
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

    const generatorResult: GeneratorResult = pouleGenerator.generate(generatorInfo);
    expect(Object.entries(generatorResult.games).length).toEqual(12);
    expect(Object.entries(generatorResult.competition['poules']).length).toEqual(3);
    expect(generatorResult.competition['poules']['A']).toBeDefined();
    expect(generatorResult.competition['poules']['B']).toBeDefined();
    expect(generatorResult.competition['poules']['C']).toBeDefined();
    expect(Object.entries(generatorResult.competition['poules']['A']).length).toEqual(4);
    expect(Object.entries(generatorResult.competition['poules']['B']).length).toEqual(3);
    expect(Object.entries(generatorResult.competition['poules']['C']).length).toEqual(3);
  });
});
