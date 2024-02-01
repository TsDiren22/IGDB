import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  game: any;
  allConsoles: any;
  games: Game[] = [];
  subscription?: Subscription;

  constructor(private gameService:GameService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const gameIdFromRoute = String(routeParams.get('id'));
    this.gameService.onGetGame(gameIdFromRoute).subscribe((game) => {
      this.game = game;
    });
  }

}
