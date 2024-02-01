import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'src/app/models/console.model';
import { ConsoleService } from '../console.service';

@Component({
  selector: 'app-console-details',
  templateUrl: './console-details.component.html',
  styleUrls: ['./console-details.component.css']
})

export class ConsoleDetailsComponent implements OnInit {
  c: Console | undefined;
  constructor(private consoleService:ConsoleService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    
    const routeParams = this.route.snapshot.paramMap;
    const consoleIdFromRoute = String(routeParams.get('id'));
    this.consoleService.onGetConsole(consoleIdFromRoute).subscribe((c) =>{
      this.c = c;
    });

  }

}
