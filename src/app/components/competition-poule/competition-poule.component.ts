import { Component, OnInit, Input } from '@angular/core';
import Competition, { UserInfo } from '../../core/models/Competition';
import { UserService } from '../../core/services/user.service';
import { GameService } from '../../core/services/game.service';
import { GameStatus, PouleGame } from '../../core/models/Game';
import { DragulaService } from 'ng2-dragula';
import GeneratorStarter from '../../core/Generators/GeneratorStarter';
import PouleGenerator from '../../core/Generators/PouleGenerator';

@Component({
  selector: 'app-competition-poule',
  templateUrl: './competition-poule.component.html',
  styleUrls: ['./competition-poule.component.scss']
})
export class CompetitionPouleComponent implements OnInit {
  @Input() public competition: Competition;
  @Input() public games: PouleGame[];
  public usersInPoules: [UserInfo[]];
  public gamesInPoules: [PouleGame[]];
  public canDragItems: boolean;

  constructor(private gs: GameService, private us: UserService, private dragulaService: DragulaService) {
    dragulaService.drop("competition").subscribe(value => {
      this.onDrop(value);
    });
  }

  canDrag() {
    return this.canDragItems;
  }

  ngOnInit() {
    this.usersInPoules = [[]];
    Object.entries(this.competition['poules']).forEach(([pouleLetter, userInfos]) => {
      const index = pouleLetter.charCodeAt(0) - 65;
      this.usersInPoules[index] = [];

      Object.entries(userInfos).forEach(([id, userInfo]) => {
        this.usersInPoules[index].push(userInfo);
      });
    });

    this.canDragItems = true;
    if(this.games){
      this.games.forEach(game => {
        if (game.status === GameStatus.FINISHED) {
          this.canDragItems = false;
        }
      });
    }
    
  }

  getPouleLetter(index) {
    return String.fromCharCode(65 + index);
  }

  private onDrop(args) {
    const [el, target, source] = args;
    const uid = el['id'].replace('user-', '');
    const toPouleIndex = target['id'].replace('poule-', '');
    const fromPouleIndex = source['id'].replace('poule-', '');

    const userIndex = this.usersInPoules[fromPouleIndex].findIndex(u => {
      if (u.uid === uid) {
        return true;
      }
    });

    if (userIndex < 0) return;
    this.usersInPoules[toPouleIndex].push(this.usersInPoules[fromPouleIndex][userIndex]);
    this.usersInPoules[fromPouleIndex].splice(userIndex, 1);
    if (this.usersInPoules[fromPouleIndex].length < 2) {
      this.usersInPoules[fromPouleIndex].push(this.usersInPoules[toPouleIndex][0]);
      this.usersInPoules[toPouleIndex].splice(0, 1);
    }

    this.generatePoule();
  }

  generatePoule() {
    const generatorStarter = new GeneratorStarter(this.gs, this.us);
    const generator = new PouleGenerator();
    generatorStarter.generateWithSpecificPouleOrder(generator, this.competition, this.usersInPoules);
  }
}
