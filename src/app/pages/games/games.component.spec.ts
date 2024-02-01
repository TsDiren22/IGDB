
import { Directive, HostListener, Input } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, convertToParamMap, Router } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";
import { Console } from "src/app/models/console.model";
import { Game, Genre } from "src/app/models/game.model";
import { Studio } from "src/app/models/studio.model";
import { User } from "src/app/models/user.model";
import { GameService } from "src/app/services/game.service";
import { AuthService } from "../authentication/auth.service";
import { GamesComponent } from "./games.component";

@Directive({
  selector: '[routerLink]',
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick(): void {
    this.navigatedTo = this.linkParams;
  }
}

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

/**
 *
 */
describe('GamesComponent', () => {
  // De 'echte' component-under-test - deze mocken we dus niet!
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  // Mock services die de constructor nodig heeft
  let gameServiceSpy: any;
  let authServiceSpy;
  let routerSpy;

  /**
   *
   */
  beforeEach(() => {

    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'register',
      'logout',
      'getUserFromLocalStorage',
      'saveUserToLocalStorage'
    ]);
    const mockUser$ = new BehaviorSubject<User>(expectedUserData);
    authServiceSpy.currentUser$ = mockUser$;

    gameServiceSpy = jasmine.createSpyObj('GameService', ['onGet', 'onAdd', 'onDelete', 'onGetGame', 'onUpdate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userMayEdit', 'returnUserNonObservable']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      declarations: [
        GamesComponent, // The 'real' component that we will test
        RouterLinkStubDirective, // Stubbed component required to instantiate the real component.
      ],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: GameService, useValue: gameServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                id: '61b1076941db1e6894e23ee7',
              })
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  fit('should create component', (done) => {

    gameServiceSpy.onGet.and.returnValue(of(expectedGames));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.games).toEqual(expectedGames);
    done();
  });
});
