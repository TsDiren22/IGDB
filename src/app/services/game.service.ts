import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, Genre } from '../models/game.model';
import { StudioService } from './studio.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  studio: any;
  private url = 'https://direnbackend.herokuapp.com/api/games/';
  
  constructor(private studioService:StudioService, private httpClient:HttpClient) { 
    this.studio = studioService;
  }

  onGet(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.url);
  }

  onAdd(game: Game):Observable<Game>{
    return this.httpClient.post<Game>(this.url, game);
  }

  onDelete(id:String): Observable<Game>{
    return this.httpClient.delete<Game>(this.url + id);
  }

  onGetGame(id:String): Observable<Game>{
    return this.httpClient.get<Game>(this.url + id);
  }

  onUpdate(game:Game, id:String):Observable<Game>{
    console.log('On Update: ' + id);
    console.log(game);
    return this.httpClient.put<Game>(this.url + id, game);
  }
}
