import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<User | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  private url = 'https://direnbackend.herokuapp.com/api/';
  user: any;
  error: any;
  rError:any;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.getUserFromLocalStorage()
      .pipe(
        switchMap((user: User) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(email: string, password: string): Observable<User | undefined> {

    return this.httpClient
      .post<any>(
        this.url + 'login',
        { email: email, password: password },
        { headers: this.headers }
      )
      .pipe(
        map((res) => {
          let user: User = res.user;
          user.token = res.token;
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          this.user = user;
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.error = error.error.message;

          return of(undefined);
        })
      );
  }

  register(userData: User): Observable<User | undefined> {
    console.log(userData);
    return this.httpClient
      .post<User>(this.url + 'register', userData, {
        headers: this.headers,
      })
      .pipe(
        map((user) => {
          console.dir(user);
          this.saveUserToLocalStorage(user);
          this.currentUser$.next(user);
          return user;
        }),
        catchError((error: any) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.rError = 'Email is already taken.';
          return of(undefined);
        })
      );
  }

  /**
   * Validate het token bij de backend API. Als er geen HTTP error
   * als response komt is het token nog valid. We doen dan verder niets.
   * Als het token niet valid is loggen we de user uit.
   */
  validateToken(userData: User): Observable<User | undefined> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      }),
    };

    console.log(`validateToken at ${this.url}`);
    return this.httpClient.get<any>(this.url, httpOptions).pipe(
      map((response) => {
        console.log('token is valid');
        return response;
      }),
      catchError((error: any) => {
        console.log('Validate token Failed');
        this.logout();
        this.currentUser$.next(undefined);
        return of(undefined);
      })
    );
  }

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          this.user = undefined;
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<User> {
    const localUser = JSON.parse(localStorage.getItem(this.CURRENT_USER)!);
    return of(localUser);
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  userMayEdit(itemUserId: string): boolean {
    let bool: any;
    this.currentUser$.subscribe(user => {
      if(user?._id === itemUserId) {
        bool = true;
        return bool;
      } else {
        bool = false;
        return bool;
      }
    }
    );
    return bool;

  }

  returnUserNonObservable(): User{
    return this.user;
  }
}
