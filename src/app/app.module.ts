import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './pages/games/games.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './pages/games/edit/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './pages/details/details.component';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AboutMeComponent } from './pages/about/about-me.component';
import { EditStudioComponent } from './pages/studio/edit/edit-studio/edit-studio.component';
import { StudiosComponent } from './pages/studio/edit/studios/studios.component';
import { DetailsStudioComponent } from './pages/studio/details-studio/details-studio.component';
import { ConsoleComponent } from './pages/console/console/console.component';
import { ConsoleDetailsComponent } from './pages/console/console-details/console-details.component';
import { ConsoleEditComponent } from './pages/console/console-edit/console-edit.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoggedInAuthGuard } from './pages/authentication/auth.guards';


@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    NavComponent,
    FooterComponent,
    EditComponent,
    DetailsComponent,
    AboutMeComponent,
    EditStudioComponent,
    StudiosComponent,
    DetailsStudioComponent,
    ConsoleComponent,
    ConsoleDetailsComponent,
    ConsoleEditComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, NgbModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe,  LoggedInAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
