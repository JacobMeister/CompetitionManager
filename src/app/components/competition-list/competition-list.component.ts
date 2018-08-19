import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../../core/services/competition.service';
import Competition from '../../core/models/Competition';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import User from '../../core/models/User';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {
  @Input() public competitions: Competition[];
  user$: Observable<User>;

  constructor(private cs: CompetitionService, private us: UserService, private auth: AuthService) {
    this.user$ = this.auth.user;
  }

  ngOnInit() {}

  signUp(competition: Competition, user: User) {
    if (user) {
      this.cs.signUpForCompetition(competition, user);
    }
  }

  signOut(competition: Competition, user: User) {
    if (user) {
      this.cs.signOutOfCompetition(competition, user);
    }
  }

  canSignUpForCompetition(competition: Competition, user: User) {
    if (competition.status !== 0) return false;

    if (user) {
      const amountOfParticipants = Object.entries(competition.participants).length;
      if (amountOfParticipants < competition.maxParticipants) {
        return competition.participants[user.uid] === undefined;
      }
    }

    return false;
  }

  canSignOutOfCompetition(competition: Competition, user: User) {
    if (competition.status !== 0) return false;

    if (user) {
      return competition.participants[user.uid] !== undefined;
    }

    return false;
  }
}
