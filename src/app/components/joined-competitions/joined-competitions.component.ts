import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CompetitionService } from '../../core/services/competition.service';
import { AuthService } from '../../core/services/auth.service';
import Competition from '../../core/models/Competition';

@Component({
  selector: 'app-joined-competitions',
  templateUrl: './joined-competitions.component.html',
  styleUrls: ['./joined-competitions.component.scss']
})
export class JoinedCompetitionsComponent implements OnInit {
  public competitions: Observable<Competition[]>;

  constructor(private cs: CompetitionService, private auth: AuthService) {
    this.auth.user.subscribe(user => {
      this.competitions = this.cs.getCompetitionsForUser(user.uid);
    });
  }

  ngOnInit() {}
}
