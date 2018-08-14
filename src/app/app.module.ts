import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CompetitionsModule } from './components/competitions.module';
import { RouterModule } from '@angular/router';
import { CompetitionsRoutingModule } from './components/competitions-routes.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    CompetitionsRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    CoreModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  }),
  CompetitionsModule,
  RouterModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
