import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../authentication/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup | undefined;
  subs: Subscription | undefined;
  submitted = false;
  user: User = new User();
  emailIsValid: boolean = false;
  curEmail: string = '';
  error: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: User) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(form: NgForm): void {
    
    if (form.valid) {
      this.submitted = true;
      const email = form.value.email;
      const password = form.value.password;
      this.authService
        .login(email, password)
        // .pipe(delay(1000))
        .subscribe((user) => {
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/games']);
          }
          this.error = this.authService.error;
          this.submitted = false;
        });
    } else {
      this.submitted = false;
      console.log();
      console.error('loginForm invalid');
    }
  }

  validEmail(newValue:any) {
    const email = newValue;
    this.curEmail = email;
    const regexp = new RegExp(
      '^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$'
    );
    if (regexp.test(email) !== true) {
      this.emailIsValid = false;
      return { email: false };
    } else {
      this.emailIsValid = true;
      return true;
    }
  }
}
