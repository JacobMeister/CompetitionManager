import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../core/services/competition.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-new-competition',
  templateUrl: './new-competition.component.html',
  styleUrls: ['./new-competition.component.scss']
})
export class NewCompetitionComponent implements OnInit {
  constructor(private cs: CompetitionService, private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  saveCompetition(event: object) {
    if (event['user']) {
      this.cs.addCompetition(
        event['user'],
        event['competition'].name,
        event['competition'].type,
        event['competition'].maxParticipants,
        event['competition'].startDate,
        event['competition'].durationGame
      );
      this.router.navigate(['/competitions']);
    }
  }
}
