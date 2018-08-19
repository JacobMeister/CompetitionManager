import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import User from '../models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService } from './user.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  private dateStore: { user: User };
  private user$: BehaviorSubject<User>;
  private subscription: Subscription;
  private _loaded: boolean;

  constructor(private auth: AngularFireAuth, private us: UserService, private router: Router) {
    this.user$ = new BehaviorSubject<User>(null);
    this.dateStore = { user: null };
    this._loaded = false;
    this.auth.authState.subscribe((authUser: firebase.User) => {
      if (authUser) {
        this.subscription = this.us.getUser(authUser.uid).subscribe(user => {
          this._loaded = true;
          this.dateStore.user = user;
          this.user$.next(Object.assign({}, this.dateStore).user);
        });
      } else {
        this._loaded = true;
        this.dateStore.user = null;
        this.user$.next(Object.assign({}, this.dateStore).user);
      }
    });
  }

  public get user(): Observable<User> {
    return this.user$.asObservable();
  }

  public get loaded(): boolean {
    return this._loaded;
  }

  public isAuthenticated(): boolean {
    return this.dateStore.user != null;
  }

  public currentUserId(): string {
    return this.isAuthenticated ? this.dateStore.user.uid : '';
  }

  public loginWithGooglePopup(): Promise<any> {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(data => {
      if (data && data.additionalUserInfo.isNewUser) {
        this.us.addUser(data.user.email, data.user.displayName, data.user.uid);
      }
    });
  }

  public logout() {
    this.auth.auth.signOut();
    this.router.navigate(['/']);
  }
}
