import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './pages/games/edit/edit/edit.component';
import { GamesComponent } from './pages/games/games.component';
import { DetailsComponent } from './pages/details/details.component';
import { AboutMeComponent } from './pages/about/about-me.component';
import { EditStudioComponent } from './pages/studio/edit/edit-studio/edit-studio.component';
import { StudiosComponent } from './pages/studio/edit/studios/studios.component';
import { DetailsStudioComponent } from './pages/studio/details-studio/details-studio.component';
import { ConsoleDetailsComponent } from './pages/console/console-details/console-details.component';
import { ConsoleEditComponent } from './pages/console/console-edit/console-edit.component';
import { ConsoleComponent } from './pages/console/console/console.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoggedInAuthGuard } from './pages/authentication/auth.guards';

const routes: Routes = [
  {
    redirectTo:"games",
    path: "", 
    pathMatch: "full"
  },
  { 
    path: "games",
    component: GamesComponent },
  { 
    path: "games/add",
    component: EditComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: "games/edit/:id",
    component: EditComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: "games/details/:id",
    component: DetailsComponent
  },
  { 
    path: "studios",
    component: StudiosComponent
  },
  { 
    path: "studios/add",
    component: EditStudioComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: "studios/edit/:id",
    component: EditStudioComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: "studios/details/:id",
    component: DetailsStudioComponent
  },
  { 
    path: "consoles",
    component: ConsoleComponent
  },
  { 
    path: "consoles/add",
    component: ConsoleEditComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: "consoles/edit/:id",
    component: ConsoleEditComponent,
    canActivate: [LoggedInAuthGuard]
  },
  {
    path: "consoles/details/:id",
    component: ConsoleDetailsComponent
  },
  {
    path:'about',
    component: AboutMeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
