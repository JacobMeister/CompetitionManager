import 'rxjs/add/operator/first';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import User from '../../core/models/User';
import { AuthService } from '../../core/services/auth.service';
import { CompetitionService } from '../../core/services/competition.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isNavBarCollapsed = true;
  user$: Observable<User>;

  constructor(private auth: AuthService, private cs: CompetitionService) {
    this.user$ = this.auth.user;
  }

  ngOnInit() {}

  public toggleCollapse() {
    this.isNavBarCollapsed = !this.isNavBarCollapsed;
  }

  public logout() {
    this.auth.logout();
  }

  loginWithGoogle() {
    this.auth.loginWithGooglePopup();
  }
}
