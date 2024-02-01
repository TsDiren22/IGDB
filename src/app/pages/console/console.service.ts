import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Console } from '../../models/console.model';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  private url = 'https://direnbackend.herokuapp.com/api/consoles/';

  constructor(private httpClient:HttpClient) { }

  onGet(): Observable<Console[]> {
    return this.httpClient.get<Console[]>(this.url);
  }

  onAdd(c: Console):Observable<Console>{
    return this.httpClient.post<Console>(this.url, c);
  }

  onDelete(id:String): Observable<Console>{
    return this.httpClient.delete<Console>(this.url + id);
  }

  onGetConsole(id:String): Observable<Console>{
    return this.httpClient.get<Console>(this.url + id);
  }

  onUpdate(c:Console, id:String):Observable<Console>{
    console.log('On Update: ' + id);
    console.log(c);
    return this.httpClient.put<Console>(this.url + id, c);
  }
}
