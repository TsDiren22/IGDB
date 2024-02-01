import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/authentication/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser();
  }

  logout(){
    this.authService.logout();
    this.user = undefined;
  }
  
  currentUser(){
    console.log('Before:' + this.user);
    this.authService.currentUser$.subscribe((user) =>{
      this.user = user;
    });
    console.log('After' + this.user);
  }

}
