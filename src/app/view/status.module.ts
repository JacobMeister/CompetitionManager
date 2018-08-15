import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnockoutComponent } from './knockout/knockout.component';
import { TournamentComponent } from './tournament/tournament.component';
import { PouleComponent } from './poule/poule.component';

@NgModule({
  imports: [CommonModule],
  declarations: [KnockoutComponent, TournamentComponent, PouleComponent],
  exports: [KnockoutComponent, TournamentComponent, PouleComponent]
})
export class StatusModule {}
