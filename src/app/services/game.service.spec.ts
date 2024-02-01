import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { GameService } from './game.service';
import { Game, Genre } from '../models/game.model';
import { User } from '../models/user.model';
import { Console } from '../models/console.model';
import { Studio } from '../models/studio.model';


// Global mock objects
const expectedUserData: User = {
  _id: '61b1000a41db1e6894e23ea5',
  firstName: 'Diren',
  lastName: 'Ozturk',
  email: 'diren_2001@hotmail.con',
  token: 'some.dummy.token',
  password:'abcd'
};

const expectedConsolePs4: Console = {
  _id:'61b105cd41db1e6894e23eb4',
  name:"Playstation 4",
  amountOfUser:116670000,
  dateOfRelease: new Date(2013, 11, 15),
  website:new URL("https://www.playstation.com/nl-nl/"),
  user: expectedUserData
}

const expectedConsolePs5: Console = {
  _id:'61b1062341db1e6894e23ec0',
  name:"Playstation 5",
  amountOfUser:15740000,
  dateOfRelease: new Date(2020, 11, 12),
  website:new URL("https://www.playstation.com/nl-nl/"),
  user: expectedUserData
}

const expectedConsoleXboxOne: Console = {
  _id:'61b105ef41db1e6894e23eb8',
  name:"Xbox One",
  amountOfUser: 50470000,
  dateOfRelease: new Date(2013, 11, 22),
  website:new URL("https://www.xbox.com/nl-NL"),
  user: expectedUserData
}

const expectedConsoleXboxXS: Console = {
  _id:'61b1063f41db1e6894e23ec4',
  name:"Xbox Series X/S",
  amountOfUser: 10080000,
  dateOfRelease: new Date(2020, 11, 10),
  website:new URL("https://www.xbox.com/nl-NL"),
  user: expectedUserData
}

const expectedStudio: Studio = {
  _id: '61b1069041db1e6894e23ecd',
  name: 'CD Projekt Red',
  address: 'ul. Jagiellońska 74, 03-301 Warsaw, Poland',
  founder: 'Marcin Iwiński and Michał Kiciński',
  dateFounded: new Date('2002-02-12T00:00:00.000+00:00'),
  website: new URL('https://en.cdprojektred.com/'),
  amountOfEmployees: 1111,
}

const expectedGames: Game[] = [{
  _id: undefined,
  title: 'Minecraft',
  studio: expectedStudio,
  description: 'A game about a steve doing steve stuff',
  releaseDate: "2015-05-18",
  genre: Genre.Singleplayer,
  console: [expectedConsolePs4, expectedConsoleXboxOne, expectedConsolePs5, expectedConsoleXboxXS],
  user: expectedUserData,
}];

describe('GameService', () => {
  let service: GameService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
    providers: [{ provide: HttpClient, useValue: httpSpy }],
    });
    service = TestBed.inject(GameService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should return list of games', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedGames));
    service.onGet().subscribe((games: Game[]) => {
      expect(games[0]._id).toEqual(expectedGames[0]._id);
      done();
    });
  });

  fit('should update game by id', (done: DoneFn) => {
    httpSpy.put.and.returnValue(of(expectedGames[0]));
    
    service.onUpdate(expectedGames[0], expectedGames[0]._id!).subscribe((game) => {
      expect(expectedGames[0].title).toEqual(game.title);
      done();
    });

  });

  fit('should return one game by id', (done: DoneFn) => {
    httpSpy.get.and.returnValue(of(expectedGames[0]));

    service.onGetGame(expectedGames[0]._id!).subscribe((game) => {
      expect(game._id).toEqual(expectedGames[0]._id);
      done();
    });

  });

  fit('should add new game', (done: DoneFn) => {
    httpSpy.post.and.returnValue(of(expectedGames[0]));
    
    service.onAdd(expectedGames[0]).subscribe((game: Game) => {
      expect(game._id).toEqual(expectedGames[0]._id);
      done();
    });
  });


  fit('should delete a game by id', (done: DoneFn) => {
    httpSpy.delete.and.returnValue(of(expectedGames[0]));
    service.onDelete(expectedGames[0]._id!).subscribe((game: Game) => {
      expect(game._id).toBe(expectedGames[0]._id);
      done();
    });
  });
});