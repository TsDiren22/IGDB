import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'src/app/models/console.model';
import { Studio } from 'src/app/models/studio.model';
import { StudioService } from 'src/app/services/studio.service';
import { AuthService } from '../../authentication/auth.service';
import { ConsoleService } from '../console.service';


@Component({
  selector: 'app-console-edit',
  templateUrl: './console-edit.component.html',
  styleUrls: ['./console-edit.component.css']
})

export class ConsoleEditComponent implements OnInit {
  curUser: any;
  dateString: any | undefined;
  form: FormGroup | undefined;
  id: any;
  header: string | undefined;
  consoles: Console[] = [];
  c: Console = new Console();

  constructor(private router: Router, private route: ActivatedRoute, private consoleService:ConsoleService, private authService:AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.header = 'Console';
    this.consoleService.onGet().subscribe((consoles) => {
      this.consoles = consoles;
    })
    if(this.id != 0){
      this.consoleService.onGetConsole(this.id).subscribe((c) => {
        this.c = c;
      });
      this.dateString = this.c.dateOfRelease?.toLocaleDateString('fr-CA');
      console.log(this.dateString);
    }
  }

  getId(){
    return this.id;
  }

  onSubmit(form: NgForm){
      
    let con : Console = {
      _id:undefined,
      name: form.value.name,
      amountOfUser: form.value.amountOfUser,
      dateOfRelease: new Date(form.value.dateOfRelease),
      website: form.value.website,
    }

    this.authService.currentUser$.subscribe((user) => {
      con.user = user;

    if(!this.id){
      this.consoleService.onAdd(con).subscribe((c)=>{
        this.router.navigateByUrl('consoles');
      });
    } else{
    this.consoleService.onUpdate(con, this.id).subscribe((c)=>{
      this.router.navigateByUrl('consoles');
    });} 
  });
  }

}