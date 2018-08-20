import Competition, { CompetitionType, UserInfo } from '../models/Competition';
import { GeneratorInfo, GeneratorResult } from './Generator';
import { GameService } from '../services/game.service';
import { GroupsGeneratorInfo } from './PouleGenerator';
import { UserService } from '../services/user.service';
import User from '../models/User';

export default class GeneratorStarter {

  constructor(private gs: GameService, private us: UserService) {
  }

  generateWithSpecificPouleOrder(generator, competition: Competition, usersInPoules: [UserInfo[]]) {

    const generatorInfo: GroupsGeneratorInfo = {
      competition: competition,
      participants: usersInPoules,
      id: competition.id,
      name: competition.name,
      simultaneousGames: competition.simultaneousGames,
    };

    const generatorResult: GeneratorResult = generator.generateWithPoules(generatorInfo);
    const gameIds = Object.keys(generatorResult.games);
    const generatedIds: string[] = [];
    const competitionGames: { [id: string]: string } = {};

    // Change competition
    competition = generatorResult.competition;

    this.gs.deleteAllGamesCompetition(competition).then(() => {
      for (let i = gameIds.length - 1; i >= 0; i--) {
        // Request game id
        let generatedGameId = '';
        do {
          generatedGameId = this.gs.requestGameId();
        } while (generatedIds.includes(generatedGameId));

        generatorResult.games[gameIds[i]].id = generatedGameId;

        // Create list of games for competition
        competitionGames[generatedGameId] = generatorResult.games[gameIds[i]].name;
      }

      // Bulk save
      competition.games = competitionGames;
      this.gs.addGames(generatorResult.games, competition);
    });
  }

  async generate(generator, competition: Competition, participants: UserInfo[] = null) {
    const competitionParticipants = [];
    const selectedParticipants = {};

    Object.entries(competition.participants).forEach(([id, userInfo]) => {
      competitionParticipants.push({
        uid: userInfo.uid,
        name: userInfo.name
      });
      selectedParticipants[userInfo.uid] = {
        uid: userInfo.uid,
        name: userInfo.name
      };
    });

    if (participants === null) {
      participants = competitionParticipants;
    }

    const generatorInfo: GeneratorInfo = {
      competition: competition,
      participants: participants,
      id: competition.id,
      name: competition.name,
      simultaneousGames: competition.simultaneousGames,
    };

    const generatorResult: GeneratorResult = generator.generate(generatorInfo);
    const gameIds = Object.keys(generatorResult.games);
    const changedIds: { [id: string]: string } = {};
    const generatedIds: string[] = [];
    const competitionGames: { [id: string]: string } = {};

    // Change competition
    competition = generatorResult.competition;
    competition.participants = selectedParticipants;

    // Get users of competition that are no participants and delete the competition from the users
    const usersToBeDeleted: User[] = [];
    this.us.getParticipantsForCompetition(competition.id).subscribe(users => {
      users.forEach(user => {
        if (competition.participants[user.uid] === undefined) {
          usersToBeDeleted.push(user);
        }
      });

      this.us.deleteCompetitionFromUsers(usersToBeDeleted, competition.id);
    });

    // Handle all games
    for (let i = gameIds.length - 1; i >= 0; i--) {
      // Change game id references
      const currentNextGameId = generatorResult.games[gameIds[i]]['nextGameId'];
      if (currentNextGameId !== undefined && changedIds[currentNextGameId] !== undefined) {
        generatorResult.games[gameIds[i]]['nextGameId'] = changedIds[currentNextGameId];
      }

      // Request game id
      let generatedGameId = '';
      do {
        generatedGameId = this.gs.requestGameId();
      } while (generatedIds.includes(generatedGameId));

      generatorResult.games[gameIds[i]].id = generatedGameId;

      // Remember changed id
      changedIds[gameIds[i]] = generatedGameId;
      generatedIds.push(generatedGameId);

      // Create list of games for competition
      competitionGames[generatedGameId] = generatorResult.games[gameIds[i]].name;
    }

    // Delete old games
    await this.gs.deleteAllGamesCompetition(competition).then(() => {
      // Bulk save
      competition.games = competitionGames;
      this.gs.addGames(generatorResult.games, competition);
    });
  }
}
