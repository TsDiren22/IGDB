import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Console } from 'src/app/models/console.model';
import { AuthService } from '../../authentication/auth.service';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']
})


export class ConsoleComponent implements OnInit, OnDestroy {
  consoles: Console[] = [];
  subscription?: Subscription;
  constructor(private consoleService:ConsoleService, private authService:AuthService) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.consoleService.onGet()
    .subscribe((consoles) => (this.consoles = consoles));
  }

  onDelete(id:String){
    this.consoleService.onDelete(id).subscribe((c)=>{
      this.consoleService.onGet().subscribe((c) => {
        this.consoles = c;
      });
    });
  }

  allowedClick(id:any): boolean{
    return this.authService.userMayEdit(id);
  }
}
