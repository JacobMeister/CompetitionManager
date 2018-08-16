import { Component, OnInit, Input } from '@angular/core';
import Competition, { UserInfo } from '../../core/models/Competition';
import { KnockoutGame, GameStatus } from '../../core/models/Game';
import { GameService } from '../../core/services/game.service';
import { UserService } from '../../core/services/user.service';
import { DragulaService } from 'ng2-dragula';
@Component({
  selector: 'app-competition-knockout',
  templateUrl: './competition-knockout.component.html',
  styleUrls: ['./competition-knockout.component.scss']
})
export class CompetitionKnockoutComponent implements OnInit {
  @Input() public competition: Competition;
  @Input() public games: KnockoutGame[];
  public usersInGroups: [UserInfo[]];
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
    this.usersInGroups = [[]];

    this.canDragItems = true;
    this.games.forEach(game => {
      if (game.round === 1) {
        const index = Number(game.name.split(' ')[2]) - 1;
        this.usersInGroups[index] = [game.player1, game.player2];
      }
      if (game.status === GameStatus.FINISHED) {
        this.canDragItems = false;
      }
    });
  }

  private onDrop(args) {
    const [el, target, source] = args;
    const uid = el['id'].replace('user-', '');
    const toGroupIndex = target['id'].replace('group-', '');
    const fromGroupIndex = source['id'].replace('group-', '');

    const userIndex = this.usersInGroups[fromGroupIndex].findIndex(u => {
      if (u.uid === uid) {
        return true;
      }
    });

    if (userIndex < 0) return;

    // Move
    this.usersInGroups[toGroupIndex].push(this.usersInGroups[fromGroupIndex][userIndex]);
    this.usersInGroups[fromGroupIndex].splice(userIndex, 1);

    // Move first
    this.usersInGroups[fromGroupIndex].push(this.usersInGroups[toGroupIndex][0]);
    this.usersInGroups[toGroupIndex].splice(0, 1);

    this.generateKnockout();
  }

  generateKnockout() {
    let participants: UserInfo[] = [];
    Object.entries(this.usersInGroups).forEach(([index, userInfos]) => {
      participants = participants.concat(userInfos);
    });

    // const generatorStarter = new GeneratorStarter(this.gs, this.us);
    // const generator = new KnockoutGenerator();
    // generatorStarter.generate(generator, this.competition, participants);
  }
}
