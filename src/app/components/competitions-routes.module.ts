import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { NewCompetitionComponent } from './new-competition/new-competition.component';
import { AuthGuard } from '../core/services/auth.guard';
import { MyCompetitionsComponent } from './my-competitions/my-competitions.component';
import { CompetitionDetailComponent } from './competitiondetail/competitiondetail.component';
import { JoinedCompetitionsComponent } from './joined-competitions/joined-competitions.component';
import { LiveViewComponent } from './live-view/live-view.component';


const competitionsRoutes: Routes = [
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: 'my-competitions',
    component: MyCompetitionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'joined-competitions',
    component: JoinedCompetitionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'competition/new',
    component: NewCompetitionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'competition/:id',
    component: CompetitionDetailComponent
  },
  {
    path: 'competition/:id/live',
    component: LiveViewComponent
  },
  // {
  //   path: 'competition/:id/generate',
  //   component: CompetitionGamesGeneratorComponent,
  //   resolve: { competition: CompetitionResolverService },
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(competitionsRoutes)],
  exports: [RouterModule]
})
export class CompetitionsRoutingModule {}
