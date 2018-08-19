import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Competition, { CompetitionType, CompetitionStatus } from '../models/Competition';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import User from '../models/User';
import Game from '../models/Game';

@Injectable()
export class CompetitionService {
  private competitionsCollection: AngularFirestoreCollection<Competition>;
  private competitions$: Observable<Competition[]>;

  constructor(private db: AngularFirestore) {
    this.competitionsCollection = db.collection<Competition>('competitions');
    this.competitions$ = this.competitionsCollection.valueChanges();
  }

  public get competitions(): Observable<Competition[]> {
    return this.competitions$;
  }

  
  public addCompetition(
    owner: User,
    name: string,
    type: CompetitionType,
    maxParticipants: number,
    startDate: string,
    durationGame: number
  ) {
    const id = this.db.createId();
    const competition: Competition = {
      id,
      name,
      type,
      maxParticipants,
      status: CompetitionStatus.OPEN,
      owner: { uid: owner.uid, name: owner.name },
      participants: {},
      games: {},
      startDate: startDate,
      durationGame: durationGame

    };
    this.competitionsCollection.doc<Competition>(id).set(competition);

    owner.ownedCompetitions[id] = true;
    this.db
      .collection('users')
      .doc(owner.uid)
      .set(owner);
  }

  public editCompetition(competition: Competition) {
    this.competitionsCollection.doc<Competition>(competition.id).update({
      name: competition.name,
      type: competition.type,
      maxParticipants: competition.maxParticipants
    });

    if (competition.games) {
      const update = {
        competition: {
          id: competition.id,
          name: competition.name
        }
      };
      const gameCollection = this.db.collection<Game>('games');
      for (const key in competition.games) {
        if (competition.games.hasOwnProperty(key)) {
          gameCollection.doc<Game>(key).update(update);
        }
      }
    }
  }

  public getCompetition(id: string): Observable<Competition> {
    const itemDoc = this.competitionsCollection.doc<Competition>(id);
    return itemDoc.valueChanges();
  }

  public getCompetitionsForUser(userId: string): Observable<Competition[]> {
    const participantUrl = 'participants.' + userId + '.uid';
    const collection = this.db.collection<Competition>('competitions', ref => ref.where(participantUrl, '==', userId));

    return collection.valueChanges();
  }

  public getOwnedCompetitionsForUser(userId: string): Observable<Competition[]> {
    const collection = this.db.collection<Competition>('competitions', ref => ref.where('owner.uid', '==', userId));
    return collection.valueChanges();
  }

  public updateCompetition(comp: Competition) {
    this.competitionsCollection.doc<Competition>(comp.id).update(comp);
  }

  public updateName(competition: Competition, name: string) {
    this.competitionsCollection.doc<Competition>(competition.id).update({ name: name });

    if (competition.games) {
      const update = {
        competition: {
          id: competition.id,
          name: name
        }
      };
      const gameCollection = this.db.collection<Game>('games');
      for (const key in competition.games) {
        if (competition.games.hasOwnProperty(key)) {
          gameCollection.doc<Game>(key).update(update);
        }
      }
    }
  }

  public signUpForCompetition(comp: Competition, user: User) {
    comp.participants[user.uid] = { uid: user.uid, name: user.name };
    user.competitions[comp.id] = comp.name;

    const addParticiant = { participants: comp.participants };
    this.db
      .collection('competitions')
      .doc(comp.id)
      .update(addParticiant);

    const addCompetition = { competitions: user.competitions };
    this.db
      .collection('users')
      .doc(user.uid)
      .update(addCompetition);
  }

  public signOutOfCompetition(comp: Competition, user: User) {
    delete comp.participants[user.uid];
    delete user.competitions[comp.id];

    const deleteParticipant = { participants: comp.participants };
    this.db
      .collection('competitions')
      .doc(comp.id)
      .update(deleteParticipant);

    const deleteCompetition = { competitions: user.competitions };
    this.db
      .collection('users')
      .doc(user.uid)
      .update(deleteCompetition);
  }

  public isOwnerOfCompetition(comp: Competition, user: User) {
    return comp.owner.uid === user.uid;
  }
}
