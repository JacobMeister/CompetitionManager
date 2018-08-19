import TournamentGenerator from './TournamentGenerator';

describe('TournamentGenerator', () => {
  let tournamentGenerator: TournamentGenerator;
  beforeEach(() => {
    tournamentGenerator = new TournamentGenerator();
  });

  it('create an instance', () => {
    expect(tournamentGenerator).toBeTruthy();
  });

  it('can get amount of games', () => {
    expect(tournamentGenerator.getAmountOfGames(2)).toEqual(1);
    expect(tournamentGenerator.getAmountOfGames(3)).toEqual(3);
    expect(tournamentGenerator.getAmountOfGames(4)).toEqual(6);
    expect(tournamentGenerator.getAmountOfGames(5)).toEqual(10);
  });
});
