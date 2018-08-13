import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompetitionsComponent } from '../components/competitions/competitions.component';
const routes: Routes = [
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: '',
    component: CompetitionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionsRoutingModule {}

