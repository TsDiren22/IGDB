import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'src/app/models/console.model';
import { Game, Genre } from 'src/app/models/game.model';
import { Studio } from 'src/app/models/studio.model';
import { AuthService } from 'src/app/pages/authentication/auth.service';
import { ConsoleService } from 'src/app/pages/console/console.service';
import { GameService } from 'src/app/services/game.service';
import { StudioService } from 'src/app/services/studio.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormGroup | undefined;
  id: any;
  header: string | undefined;
  curStudio: any;
  genres = Object.values(Genre);
  consoles: Console[] = [];
  studios: Studio[] = [];
  game: Game = {
    _id: undefined,
    title: '',
    description: '',
    releaseDate: '',
    genre: Genre.Action,
    studio: undefined,
    console: []
  };
  input: any;
  consoleList: Console[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private gameService:GameService, private authService:AuthService, private studioService:StudioService, private consoleService:ConsoleService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Init: ' + this.id);
    this.header = 'Game';

    this.consoleService.onGet().subscribe((c) => {
      this.consoles = c;
    });

    this.studioService.onGet().subscribe((studios) => {
      this.studios = studios;
    });
    if(this.id){
      this.gameService.onGetGame(this.id).subscribe((game) => {
        this.game = game;
        this.game.console?.forEach(element => {
          this.consoleList.push(element);
        });
      });

    } else{
      this.game = new Game;
    }

  }

  deleteConsole(c:Console){
    const index = this.consoleList.indexOf(c);
    if (index > -1) {
      this.consoleList.splice(index, 1);
    }
  }

  addConsole(){
    console.log('Add console input: ' + this.input);
    this.consoleService.onGetConsole(this.input).subscribe((c) => {
      this.consoleList.push(c);
    });
    this.input = '';
  }

  setNewUser(studio: Studio): void {
    console.log(studio);
    this.curStudio = studio;
  }

  getSelected(){
    return this.game.studio?._id;
  }

  onSubmit(form: NgForm){
      
    let gam : Game = {
      _id: undefined,
      title: form.value.title,
      description: form.value.description,
      releaseDate: form.value.releaseDate,
      genre: form.value.genre,
      studio: form.value.studio,
      console: this.consoleList
    }
    console.log(form.value.studio);
    gam.studio = this.studios.find(x => x._id == form.value.studio);
    console.log(this.consoleList);
    console.log(gam.console);

    this.authService.currentUser$.subscribe((user) => {
      gam.user = user;

    if(!this.id){
      this.gameService.onAdd(gam).subscribe((game) => {
        this.router.navigateByUrl('games');
      });
    } else{
    this.gameService.onUpdate(gam, this.id).subscribe((game)=>{
      this.router.navigateByUrl('games');
    });
    } 
  });

  }

}
