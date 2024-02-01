import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { GameService } from 'src/app/services/game.service';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styles: [
  ]
})

export class GamesComponent implements OnInit, OnDestroy {
  games: Game[] | undefined;
  subscription?: Subscription;
  user: any;
  id:any;

  constructor(private gameService:GameService, private authService:AuthService) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.returnUserNonObservable();
    this.subscription = this.gameService.onGet()
    .subscribe((games) => (this.games = games));
  }

  onDelete(id:String){
    this.gameService.onDelete(id).subscribe((g)=>{
      this.gameService.onGet().subscribe((g) => {
        this.games = g;
      });
    });
  }

  allowedClick(id:any): boolean{
    return this.authService.userMayEdit(id);
  }

  currentUser(){
    console.log('in currentUser:' + this.user);
    if(this.user){
      return true;
    } else{
      return false;
    }
  }
}
