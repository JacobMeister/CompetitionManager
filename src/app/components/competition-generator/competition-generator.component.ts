import { Component, OnInit } from '@angular/core';
import Competition, { CompetitionType, UserInfo } from '../../core/models/Competition';
import User from '../../core/models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../../core/services/competition.service';
import { GameService } from '../../core/services/game.service';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import KnockoutGenerator from '../../core/Generators/KnockoutGenerator';
import TournamentGenerator from '../../core/Generators/TournamentGenerator';
import PouleGenerator from '../../core/Generators/PouleGenerator';
import { DateHelper } from '../../core/Generators/DateHelper';
import GeneratorStarter from '../../core/Generators/GeneratorStarter';

@Component({
  selector: 'app-competition-generator',
  templateUrl: './competition-generator.component.html',
  styleUrls: ['./competition-generator.component.scss']
})
export class CompetitionGeneratorComponent implements OnInit {
  competition: Competition;
  users: User[];
  generators: Generator[];
  errors: string[];
  dateHelper: DateHelper;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CompetitionService,
    private gs: GameService,
    private us: UserService,
    private auth: AuthService
  ) {
    this.dateHelper = new DateHelper();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { competition: Competition }) => {
      this.errors = [];
      this.competition = Object.assign({}, data.competition);
      this.competition.participants = {};
      this.us.getParticipantsForCompetition(this.competition.id).subscribe(users => (this.users = users));
    });

    this.generators = [];
    this.generators[CompetitionType.TOURNAMENT.toString()] = new TournamentGenerator();
    this.generators[CompetitionType.KNOCKOUT.toString()] = new KnockoutGenerator();
    this.generators[CompetitionType.POULE.toString()] = new PouleGenerator();
  }

  validate() {
    this.errors = [];

    if (!this.dateHelper.validateDateIsInTheFuture(new Date(this.competition.startDate))) {
      this.errors.push('Start date is in the past.');
    }
    const amountOfPlayers = Object.entries(this.competition.participants).length;
    if (amountOfPlayers > this.competition.maxParticipants) {
      this.errors.push('Maximum of ' + this.competition.maxParticipants + ' players exceeded.');
    }
    const playersErrors: string[] = this.generators[this.competition.type.toString()].checkValidAmountOfPlayers(
      amountOfPlayers
    );
    this.errors = this.errors.concat(playersErrors);

    if (this.errors.length === 0) {
      this.generate();
    }
  }

  generate() {
    const generatorStarter = new GeneratorStarter(this.gs, this.us);
    const generator: Generator = this.generators[this.competition.type.toString()];
    generatorStarter.generate(generator, this.competition);

    this.router.navigate(['/competition', this.competition.id]);
  }
}
