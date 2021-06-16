import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AdminService } from '../../admin.service';

import { Role } from '../../_models/role';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent implements OnInit {

  constructor(private _adminservice: AdminService, private router: Router, private _authService: AuthService) { }

  currentUser = this._authService.currentUserValue;
  public CreatedTournaments = [];
  public StartedTournaments = [];
  public FinishedTournaments = [];
  public NewTournaments = [];
  public Tourstructures = [];
  public Tourstructures1 = [];

  ngOnInit(): void {

    this._adminservice.getCreatedTournament()
      .subscribe((data) => {
        this.CreatedTournaments = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getStartedTournament()
      .subscribe((data) => {
        this.StartedTournaments = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getFinishedTournament()
      .subscribe((data) => {
        this.FinishedTournaments = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );


    this._adminservice.getNewTour()
      .subscribe((data) => {
        this.NewTournaments = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

  }

  hasStructures(){
    if(this.Tourstructures[0]?.strutureName==null){
      return false
    }else{
      return true
    }
  }

  hasStructures1(){
    if(this.Tourstructures1[0]?.strutureName==null){
      return false
    }else{
      return true
    }
  }

  getstructures(tournementId){
    this._adminservice.getStructures(tournementId)
      .subscribe((data) => {
        this.Tourstructures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );
  }

  getstructures1(tournementId){
    this._adminservice.getStructures(tournementId)
      .subscribe((data) => {
        this.Tourstructures1 = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );
  }

  back(){
    if (this.currentUser.RoleId == Role.Admin) {
      this.router.navigate(['/adminpanel'])
    } else if(this.currentUser.RoleId == Role.Coach){
      this.router.navigate(['/institutecoach'])
    }else if(this.currentUser.RoleId == Role.Player){
      this.router.navigate(['/player'])
    }
  }

  show() {
    if (this.currentUser.RoleId == Role.Admin) {
      return true;
    } else {
      return false;
    }
  }

  iscreatedadmin(userId) {
    if (userId==this.currentUser.userId) {
      return true;
    } else {
      return false;
    }
  }

  starttour(tournementId) {
    if (confirm('Are you sure to start this Tournament?') == true){
      this._adminservice.starttournament(tournementId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
    }
  }

  finishtour(tournementId) {
    if (confirm('Are you sure to finish this Tournament?') == true){
      this._adminservice.finishtournament(tournementId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
    }
  }

  postponetour(tournementId) {
    if (confirm('Are you sure to postpone this Tournament?') == true){
      this._adminservice.postponetournament(tournementId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
    }
  }

  joinTour(tournementId) {
    if (confirm('Are you sure to join this Tournament?') == true){
      this._adminservice.JoinTournament(this.CreatedTournaments,tournementId)
      .subscribe(
        response => {
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
    }else{

    }
    this.ngOnInit();
  }

  @ViewChild('myModalClose1') modalClose1;

  close(){
    this.modalClose1.nativeElement.click();
  }

  checkcricket(sport) {
    if (sport == 'Cricket') {
      return true
    } else {
      false
    }
  }

  checkfootballe(sport) {
    if (sport == 'Football') {
      return true
    } else {
      false
    }
  }

  checkrugby(sport) {
    if (sport == 'Rugby') {
      return true
    } else {
      false
    }
  }

}
