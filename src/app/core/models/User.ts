export default class User {
    uid: string;
    name: string;
    email: string;
    competitions: { [id: string]: string };
    games: { [id: string]: boolean };
    ownedCompetitions: { [id: string]: boolean };
  
    constructor(uid: string, name?: string) {
      this.uid = uid;
      this.name = name;
    }
  }
  