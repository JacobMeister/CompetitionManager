import { CompetitionService } from "src/app/core/services/competition.service";
import { TestBed } from "@angular/core/testing";
import { GameService } from "src/app/core/services/game.service";

beforeEach(() => {
  TestBed.configureTestingModule({ providers: [CompetitionService, GameService] });  
});