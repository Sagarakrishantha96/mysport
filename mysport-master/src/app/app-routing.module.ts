import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { Role } from './_models/role';

import { CreateteamComponent } from './adminpanel/createteam/createteam.component';
import { HomeComponent } from './home/home.component';
import { SelectTeamComponent } from './select-team/select-team.component';
import { ParentComponent } from './signup/parent/parent.component';
import { Player1Component } from './signup/player1/player1.component';
import { SelectionComponent } from './signup/selection/selection.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './signup/admin/admin.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
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
import { PlayerprofileComponent } from './player/playerprofile/playerprofile.component';
import { PlayerComponent } from './player/player.component';
import { InstitutecoachComponent } from './institutecoach/institutecoach.component';
import { ParentprofileComponent } from './parentprofile/parentprofile.component';
import { CoachprofileComponent } from './institutecoach/coachprofile/coachprofile.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { ChatboxComponent } from './adminpanel/adminteam/chatbox/chatbox.component';
import { WaitForEmailComponent } from './wait-for-email/wait-for-email.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'signup', component: SignupComponent },
  { path: 'confirmemail', component: ConfirmemailComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'select',
    component: SelectionComponent
  },
  {
    path: 'parent',
    component: ParentComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'player1',
    component: Player1Component
  },
  {
    path: 'waitforemail',
    component: WaitForEmailComponent
  },
  {
    path: 'adminpanel',
    component: AdminpanelComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin,Role.Coach,Role.Player] }
  },
  {
    path: 'player',
    component: PlayerComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Player] }
  },
  {
    path: 'institutecoach',
    component: InstitutecoachComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Coach] }
  },
  {
    path: 'parentprofile',
    component: ParentprofileComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Parent] }
  },
  {
    path: 'createteam',
    component: CreateteamComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'createcoach',
    component: CreatecoachComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'createplayer',
    component: CreateplayerComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'createtourn',
    component: CreatetournamentComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'tournament',
    component: TournamentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'selectTeam',
    component: SelectTeamComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Coach] }
  },
  {
    path: 'adminteam/:teamid',
    component: AdminteamComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chat/:teamid',
    component: ChatboxComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'selectedtour/:tournamentId',
    component: SelectedtourComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ongoingtour/:tournamentId',
    component: OngoingtourComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'finished/:tournamentId',
    component: FinishedtourComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ongoing/:fixtureId',
    component: OngoingfixtureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'createfixture/:tournamentId',
    component: CreatefixtureComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'selectedfixture/:fixtureId',
    component: SelectedfixtureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'playerProfile/:playerId',
    component: PlayerprofileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coachProfile/:coachId',
    component: CoachprofileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
