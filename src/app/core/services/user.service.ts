import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import User from '../models/User';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  private users$: Observable<User[]>;

  constructor(private db: AngularFirestore) {
    this.usersCollection = this.db.collection<User>('users', ref => ref.orderBy('name'));
    this.users$ = this.usersCollection.valueChanges();
  }

  public get users(): Observable<User[]> {
    return this.users$;
  }

  public getUser(id: string): Observable<User> {
    const itemDoc = this.usersCollection.doc<User>(id);
    return itemDoc.valueChanges();
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.db
      .collection<User>('users', ref => ref.where('email', '==', email).limit(1))
      .valueChanges()
      .map(users => users[0]);
  }

  public addUser(email: string, name: string, uid: string) {
    const user: User = {
      uid,
      name,
      email,
      games: {},
      competitions: {},
      ownedCompetitions: {}
    };
    this.db
      .collection('users')
      .doc<User>(uid)
      .set(user);
  }

  public async deleteCompetitionFromUsers(users: User[], competitionId: string) {
    const collection = this.db.collection('users');
    const batch = this.db.firestore.batch();

    users.forEach(user => {
      const ref = collection.doc(user.uid);
      delete user.competitions[competitionId];

      const updateCompetitions = { competitions: user.competitions };
      batch.update(ref.ref, updateCompetitions);
    });

    await batch.commit();
  }

  public getParticipantsForCompetition(competitionId: string): Observable<User[]> {
    const competitionUrl = 'competitions.' + competitionId;
    const collection = this.db.collection<User>('users', ref => ref.where(competitionUrl, '>=', ''));

    return collection.valueChanges();
  }
}
