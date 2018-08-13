import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CompetitionService } from './services/competition.service';
import { GameService } from './services/game.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  imports: [CommonModule, AngularFirestoreModule, AngularFireAuthModule],
  providers: [CompetitionService, GameService, UserService, AuthService, AuthGuard]
})
export class CoreModule {}
