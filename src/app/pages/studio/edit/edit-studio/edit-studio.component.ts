import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Studio } from 'src/app/models/studio.model';
import { AuthService } from 'src/app/pages/authentication/auth.service';
import { StudioService } from 'src/app/services/studio.service';


@Component({
  selector: 'app-edit-studio',
  templateUrl: './edit-studio.component.html',
  styleUrls: ['./edit-studio.component.css']
})
export class EditStudioComponent implements OnInit {
  curUser: any;
  dateString: any | undefined;
  form: FormGroup | undefined;
  id: any;
  header: string | undefined;
  studios: Studio[] = [];
  studio: Studio = new Studio();

  constructor(private router: Router, private route: ActivatedRoute, private studioService:StudioService, private authService:AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.header = 'Studio';
    this.studioService.onGet().subscribe((studios) => {
      this.studios = studios;
    })
    if(this.id != 0){
      this.studioService.onGetStudio(this.id).subscribe((studio) => {
        this.studio = studio;
        this.dateString = studio.dateFounded!.toLocaleDateString('fr-CA');
        console.log(this.dateString);
      });
      console.log(this.dateString);
    }
  }

  getId(){
    return this.id;
  }

  onSubmit(form: NgForm){
      
    let stud : Studio = {
      _id:undefined,
      name: form.value.name,
      address: form.value.address,
      founder: form.value.founder,
      dateFounded: new Date(form.value.dateFounded),
      website: form.value.website,
      amountOfEmployees: form.value.amountOfEmployees,
    }
    
    console.log (stud.dateFounded);
    this.authService.currentUser$.subscribe((user) => {
      stud.user = user;

    if(!this.id){
      this.studioService.onAdd(stud).subscribe((s)=>{
        this.router.navigateByUrl('studios');
      });
    } else{
    this.studioService.onUpdate(stud, this.id).subscribe((stud)=>{
      this.router.navigateByUrl('studios');
    });} 
  });
  }

}