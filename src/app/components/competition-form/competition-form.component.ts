import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import Competition, { CompetitionType } from "../../core/models/Competition";
import { CompetitionService } from "../../core/services/competition.service";
import { AuthService } from "../../core/services/auth.service";
import User from "../../core/models/User";
import { Router } from "@angular/router";
import { DateHelper } from "../../core/services/DateHelper";

@Component({
  selector: 'app-competition-form',
  templateUrl: './competition-form.component.html',
  styleUrls: ['./competition-form.component.scss']
})
export class CompetitionFormComponent implements OnInit {
  @Input() public competition: Competition;
  @Output() update = new EventEmitter<any>();
  @Output() cancelUpdate = new EventEmitter<any>();
  competitionType = CompetitionType;
  user: User;
  errors: string[];

  constructor(private cs: CompetitionService, private router: Router, private auth: AuthService) {
    this.competition = new Competition();
    const dateHelper = new DateHelper();
    this.competition.startDate = dateHelper.getCurrentDate();
    this.competition.durationGame = 90;
    this.auth.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {}

  save() {
    this.errors = [];
    const dateHelper = new DateHelper();
    if (!dateHelper.validateDateIsInTheFuture(new Date(this.competition.startDate))) {
      this.errors.push('Start date is in the past. Change the start date of the competition.');
    } else {
      this.update.emit({
        user: this.user,
        type: this.competitionType,
        competition: this.competition
      });
    }
  }

  cancel() {
    this.cancelUpdate.emit();
  }

  isValid(): boolean {
    const c = this.competition;
    return c.maxParticipants > 1 && c.maxParticipants < 265 && c.name && c.type !== undefined;
  }
}
