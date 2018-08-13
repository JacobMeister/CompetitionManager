import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../core/services/competition.service';
import Competition from '../../core/models/Competition';
import { Observable } from 'rxjs/Observable';
import User from '../../core/models/User';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {
  public competitions: Observable<Competition[]>;
  user$: Observable<User>;

  constructor(private auth: AuthService, private cs: CompetitionService) {
    this.user$ = this.auth.user;
  }

  ngOnInit() {
    this.competitions = this.cs.competitions;
  }
}
