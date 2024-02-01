import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { Studio } from 'src/app/models/studio.model';
import { AuthService } from 'src/app/pages/authentication/auth.service';
import { GameService } from 'src/app/services/game.service';
import { StudioService } from 'src/app/services/studio.service';

@Component({
  selector: 'app-studios',
  templateUrl: './studios.component.html',
  styleUrls: ['./studios.component.css']
})

export class StudiosComponent implements OnInit, OnDestroy {
  studios: Studio[] | undefined;
  subscription?: Subscription;
  constructor(private studioService: StudioService, private authService:AuthService) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.studioService.onGet().subscribe((studios) => {
      this.studios = studios;
    });
  }

  onDelete(id:String){
    this.studioService.onDelete(id).subscribe((s)=>{
      this.studioService.onGet().subscribe((s)=>{
        this.studios = s;
      });
    });
  }

  allowedClick(id:any): boolean{
    return this.authService.userMayEdit(id);
  }
}
