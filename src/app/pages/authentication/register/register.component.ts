import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup | undefined;
  subs: Subscription | undefined;
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

  onSubmit(form: NgForm){
    let u: User = {
      _id: undefined,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password
    };
      this.authService.register(u).subscribe((user) => {
        if (user) {
          console.log('user = ', user);
          this.router.navigate(['/games']);
        }
        this.error = this.authService.rError;
      });
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
