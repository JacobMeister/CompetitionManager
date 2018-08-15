import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import Competition from "../../core/models/Competition";
import { CompetitionService } from "../../core/services/competition.service";
import { AuthService } from "../../core/services/auth.service";


@Component({
  selector: 'app-my-competitions',
  templateUrl: './my-competitions.component.html',
  styleUrls: ['./my-competitions.component.scss']
})
export class MyCompetitionsComponent implements OnInit {
  public competitions: Observable<Competition[]>;

  constructor(private cs: CompetitionService, private auth: AuthService) {
    this.auth.user.subscribe(user => {
      this.competitions = this.cs.getOwnedCompetitionsForUser(user.uid);
    });
  }

  ngOnInit() {}
}
