import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CompetitionstatusPipe } from './pipes/competitionstatus.pipe';
import { GamestatusPipe } from './pipes/gamestatus.pipe';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { NewCompetitionComponent } from './new-competition/new-competition.component';
import { MyCompetitionsComponent } from './my-competitions/my-competitions.component';
import { CompetitionFormComponent } from './competition-form/competition-form.component';
import { CompetitionsRoutingModule } from './competitions-routes.module';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { JoinedCompetitionsComponent } from './joined-competitions/joined-competitions.component';
import { CompetitionTournamentComponent } from './competition-tournament/competition-tournament.component';
import { CompetitionPouleComponent } from './competition-poule/competition-poule.component';
import { CompetitionKnockoutComponent } from './competition-knockout/competition-knockout.component';
import { GameFormComponent } from './game-form/game-form.component';
import { GameListComponent } from './game-list/game-list.component';
import { LiveViewComponent } from './live-view/live-view.component';
import { RoundsPipe } from './Pipes/rounds.pipe';
import { PoulesPipe } from './Pipes/poules.pipe';
import { StatusModule } from '../view/status.module';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    StatusModule,
    CompetitionsRoutingModule,
    SweetAlert2Module,
    NgbModule,
    DragulaModule.forRoot(),
    DlDateTimePickerDateModule,
    RouterModule
  ],
  declarations: [
    CompetitionListComponent,
    CompetitionsComponent,
    CompetitionDetailComponent,
    CompetitionstatusPipe,
    GamestatusPipe,
    NewCompetitionComponent,
    // CompetitionGamesGeneratorComponent,
    CompetitionTournamentComponent,
    CompetitionKnockoutComponent,
    CompetitionPouleComponent,
    MyCompetitionsComponent,
    JoinedCompetitionsComponent,
    RoundsPipe,
    CompetitionFormComponent,
    GameListComponent,
    GameFormComponent,
    LiveViewComponent,
    PoulesPipe
  ]
})
export class CompetitionsModule {}
