import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
// import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { CompetitionstatusPipe } from './pipes/competitionstatus.pipe';
import { GamestatusPipe } from './pipes/gamestatus.pipe';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
// import { StatusdisplayModule } from '../statusdisplay/statusdisplay.module';
// import { CompetitionsRoutingModule } from './competitions-routing.module';
// import { NewCompetitionComponent } from './new-competition/new-competition.component';

import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
// import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
// import { CompetitionGamesGeneratorComponent } from './competition-games-generator/competition-games-generator.component';
// import { CompetitionTournamentComponent } from './competition-tournament/competition-tournament.component';
// import { CompetitionKnockoutSystemComponent } from './competition-knockout-system/competition-knockout-system.component';
// import { CompetitionPouleSystemComponent } from './competition-poule-system/competition-poule-system.component';
// import { MyCompetitionsComponent } from './my-competitions/my-competitions.component';
// import { JoinedCompetitionsComponent } from './joined-competitions/joined-competitions.component';
// import { DragulaModule } from 'ng2-dragula';
// import { RoundsPipe } from './rounds.pipe';
// import { CompetitionFormComponent } from './competition-form/competition-form.component';
// import { GameListComponent } from './game-list/game-list.component';
// import { GameFormComponent } from './game-form/game-form.component';
// import { LiveViewComponent } from './live-view/live-view.component';
// import { PoulesPipe } from './poules.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // StatusdisplayModule,
    CoreModule,
    // CompetitionsRoutingModule,
    SweetAlert2Module,
    NgbModule,
    // DragulaModule,
    // DlDateTimePickerDateModule
    RouterModule
  ],
  declarations: [
    CompetitionListComponent,
    CompetitionsComponent,
    // CompetitionDetailComponent,
    CompetitionstatusPipe,
    GamestatusPipe,
    // NewCompetitionComponent,
    // CompetitionGamesGeneratorComponent,
    // CompetitionTournamentComponent,
    // CompetitionKnockoutSystemComponent,
    // CompetitionPouleSystemComponent,
    // MyCompetitionsComponent,
    // JoinedCompetitionsComponent,
    // RoundsPipe,
    // CompetitionFormComponent,
    // GameListComponent,
    // GameFormComponent,
    // LiveViewComponent,
    // PoulesPipe
  ]
})
export class CompetitionsModule {}
