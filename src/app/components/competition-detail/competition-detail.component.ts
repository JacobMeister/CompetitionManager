import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Competition, { CompetitionType } from "../../core/models/Competition";
import { GameService } from "../../core/services/game.service";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import User from "../../core/models/User";
import Game from "../../core/models/Game";
import { CompetitionService } from "../../core/services/competition.service";
import { AuthService } from "../../core/services/auth.service";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";


@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss']
})
export class CompetitionDetailComponent implements OnInit {
  competition: Competition;
  editableCompetition: Competition;
  users: User[];
  currentUser: Observable<User>;
  participants: User[];
  modal: any;
  selectedGame: Game;
  games: Game[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cs: CompetitionService,
    private gs: GameService,
    private us: UserService,
    private auth: AuthService,
    private modalService: NgbModal
  ) {
    this.currentUser = auth.user;
    this.participants = [];
    this.users = [];
  }

  ngOnInit() {
    this.route.data.subscribe((data: { competition: Competition }) => {
      this.competition = data.competition;
      this.editableCompetition = Object.assign({}, this.competition);
      this.users = [];
      this.gs.getAllGamesForCompetition(this.competition.id).subscribe(games => {
        this.games = games;
      });

      this.us.getParticipantsForCompetition(this.competition.id).subscribe(participants => {
        this.participants = participants;

        this.us.users.subscribe(users => {
          this.users = [];
          users.forEach(u => {
            const foundUser = this.participants.find(p => p.uid === u.uid);
            if (foundUser === undefined) {
              this.users.push(u);
            }
          });
        });
      });
    });
  }

  public isOwnerOfCompetition(user: User) {
    return user && this.competition.owner.uid === user.uid;
  }

  editCompetition(event: object) {
    this.modal.close();

    this.competition = this.editableCompetition;
    this.editableCompetition = Object.assign({}, this.competition);

    if (event['user']) {
      this.cs.editCompetition(event['competition']);
      this.router.navigate(['/competitions']);
    }
  }

  cancelEdit() {
    this.editableCompetition = Object.assign({}, this.competition);
    this.modal.close();
  }

  public isOfType(competitionType: number) {
    const type: CompetitionType = competitionType;
    return this.competition.type.toString() === type.toString();
  }

  canAddPlayer() {
    return this.participants.length < this.competition.maxParticipants;
  }

  openModal(content) {
    this.modal = this.modalService.open(content);
  }

  selectGame(game: Game) {
    this.selectedGame = game;
  }

  onGameSave(game: Game) {
    this.gs.updateGame(game);
  }

  addPlayer(email: string) {
    if (this.canAddPlayer()) {
      this.us.getUserByEmail(email).subscribe(user => {
        this.cs.signUpForCompetition(this.competition, user);
      });
    }
  }

  isOpen() {
    return this.competition.status === 0;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(
        term =>
          term.length < 2
            ? []
            : this.users
                .filter(v => {
                  if (
                    v.name.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                    v.email.toLowerCase().indexOf(term.toLowerCase()) > -1
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .slice(0, 10)
                .map(p => p.email)
      )
    );
}
