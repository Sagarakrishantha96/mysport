import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SelectionComponent } from './signup/selection/selection.component';
import { ParentComponent } from './signup/parent/parent.component';
import { CreateteamComponent } from './adminpanel/createteam/createteam.component';
import { SelectTeamComponent } from './select-team/select-team.component';

import { AuthService } from './auth.service';
import { PlayerService } from './player.service';
import {AuthGuard} from './auth.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { Player1Component } from './signup/player1/player1.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './signup/admin/admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatecoachComponent } from './adminpanel/createcoach/createcoach.component';
import { CreateplayerComponent } from './adminpanel/createplayer/createplayer.component';
import { AdminteamComponent } from './adminpanel/adminteam/adminteam.component';
import { CreatetournamentComponent } from './adminpanel/createtournament/createtournament.component';
import { TournamentComponent } from './adminpanel/tournament/tournament.component';
import { SelectedtourComponent } from './adminpanel/tournament/selectedtour/selectedtour.component';
import { CreatefixtureComponent } from './adminpanel/tournament/selectedtour/createfixture/createfixture.component';
import { SelectedfixtureComponent } from './adminpanel/tournament/selectedtour/selectedfixture/selectedfixture.component';
import { OngoingtourComponent } from './adminpanel/tournament/ongoingtour/ongoingtour.component';
import { OngoingfixtureComponent } from './adminpanel/tournament/ongoingtour/ongoingfixture/ongoingfixture.component';
import { FinishedtourComponent } from './adminpanel/tournament/finishedtour/finishedtour.component';
import { PlayerComponent } from './player/player.component';
import { PlayerprofileComponent } from './player/playerprofile/playerprofile.component';
import { InstitutecoachComponent } from './institutecoach/institutecoach.component';
import { ParentprofileComponent } from './parentprofile/parentprofile.component';
import { CoachprofileComponent } from './institutecoach/coachprofile/coachprofile.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { ChatboxComponent } from './adminpanel/adminteam/chatbox/chatbox.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChatService } from './_services/chat.service';
import { WaitForEmailComponent } from './wait-for-email/wait-for-email.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    SelectionComponent,
    ParentComponent,
    CreateteamComponent,
    SelectTeamComponent,
    Player1Component,
    LoginComponent,
    AdminComponent,
    AdminpanelComponent,
    CreatecoachComponent,
    CreateplayerComponent,
    AdminteamComponent,
    CreatetournamentComponent,
    TournamentComponent,
    SelectedtourComponent,
    CreatefixtureComponent,
    SelectedfixtureComponent,
    OngoingtourComponent,
    OngoingfixtureComponent,
    FinishedtourComponent,
    PlayerComponent,
    PlayerprofileComponent,
    InstitutecoachComponent,
    ParentprofileComponent,
    CoachprofileComponent,
    ConfirmemailComponent,
    ChatboxComponent,
    WaitForEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule
    ],
  providers: [ChatService,AuthService,AuthGuard,PlayerService,SelectedtourComponent,
  {
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
