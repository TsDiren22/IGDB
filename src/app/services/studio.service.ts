import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Studio } from '../models/studio.model';

@Injectable({
  providedIn: 'root'
})
export class StudioService {

  url = 'https://direnbackend.herokuapp.com/api/studios/';
  studios: Studio[] = [];
  promise: any;

  s: Studio[] = [
    {
      _id: '1',
      name: 'SIE Santa Monica Studio',
      address: '13031 W Jefferson Blvd #600, Los Angeles, CA 90094, USA',
      founder: 'Allan Becker',
      dateFounded: new Date(1999, 10, 12),
      website: new URL('https://sms.playstation.com/'),
      amountOfEmployees: 250
    }, 
    {
      _id: '2',
      name: 'CD Projekt Red',
      address: 'ul. Jagiellońska 74, 03-301 Warsaw, Poland',
      founder: 'Marcin Iwiński and Michał Kiciński',
      dateFounded: new Date(2002, 2, 12),
      website: new URL('https://en.cdprojektred.com/'),
      amountOfEmployees: 1111
    }, 
    {
      _id: '3',
      name: 'Bethesda Gaming Studio',
      address: '1370 Piccard Drive No-120 Rockville, MD 20850, USA',
      founder: 'Robert A. Altman and Christopher Weaver',
      dateFounded: new Date(2001, 5, 7),
      website: new URL('https://bethesdagamestudios.com/'),
      amountOfEmployees: 420
    }, 
    {
      _id: '4',
      name: 'Sucker Punch Productions',
      address: '500 108th Avenue Northeast Suite 2600 Bellevue, WA 98004, USA',
      founder: 'Brian Fleming',
      dateFounded: new Date(1997, 8, 15),
      website: new URL('https://www.suckerpunch.com/'),
      amountOfEmployees: 160
    }, 
    {
      _id: '5',
      name: 'Insomniac Games',
      address: '2255 N Ontario St. Suite 550. Burbank, CA 91504, Canada',
      founder: 'Ted Price',
      dateFounded: new Date(1994, 2, 28),
      website: new URL('https://insomniac.games/'),
      amountOfEmployees: 400
    }
  ];

  constructor(private httpClient:HttpClient) {
   }
/*
  seedData(){
    console.log(this.studios);
    const sm = this.studios.find((x) => x.name == this.s[0].name);
    const cd = this.studios.find((x) => x.name == 'CD Projekt Red' && x.founder == 'Marcin Iwiński and Michał Kiciński');
    const bg = this.studios.find((x) => x.name == 'Bethesda Gaming Studio' && x.founder == 'Robert A. Altman and Christopher Weaver');
    const sp = this.studios.find((x) => x.name == 'Sucker Punch Productions' && x.founder == 'Brian Fleming');
    const ins = this.studios.find((x) => x.name == 'Insomniac Games' && x.founder == 'Ted Price');

    console.log(ins);
    console.log(sm);
    if(sm == undefined){
      const s = this.s[0];
      s._id = undefined;
      this.onAdd(s);
    }
    if(!cd){
      const s = this.s[1];
      s._id = undefined;
      this.onAdd(s);
    }
    if(!bg){
      const s = this.s[2];
      s._id = undefined;
      this.onAdd(s);
    }
    if(!sp){
      const s = this.s[3];
      s._id = undefined;
      this.onAdd(s);
    }
    if(ins == undefined){
      const s = this.s[4];
      s._id = undefined;
      this.onAdd(s);
    }
  }
  */

  onGet(): Observable<Studio[]> {
    return this.httpClient.get<Studio[]>(this.url);
  }

  async getHere() {
    const data = await this.httpClient.get<Studio[]>(this.url).toPromise();
    this.promise = data;
  }

  onAdd(studio:Studio):Observable<Studio>{
    return this.httpClient.post<Studio>(this.url, studio);
  }

  onDelete(id:String){
    return this.httpClient.delete<Studio>(this.url + id);
  }

  onGetStudio(id:String): Observable<Studio>{
    return this.httpClient.get<Studio>(this.url + id);
  }

  onUpdate(studio:Studio, id:String):Observable<Studio>{
    console.log('On Update: ' + id);
    console.log(studio);
    return this.httpClient.put<Studio>(this.url + id, studio);
  }

}
