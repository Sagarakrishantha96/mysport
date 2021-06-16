import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../../../../_models/role';
import { AuthService } from '../../../../auth.service';
import { Location } from '@angular/common'
import { Sport } from '../../../../_models/sport';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-selectedfixture',
  templateUrl: './selectedfixture.component.html',
  styleUrls: ['./selectedfixture.component.scss']
})
export class SelectedfixtureComponent implements OnInit {

  fixtureId: number;
  tournementId: number;
  private sub: any;
  public FixtureDetails = [];
  public firstTeamPlayers = [];
  public secondTeamPlayers = [];
  public AddFixturePlayers = [];
  public RemoveFixturePlayers = [];
  public Tournament = [];
  public sample = [];

  firsttournamentTeamId
  secondtournamentTeamId
  currentUser = this._authService.currentUserValue;
  firstplayer
  secondplayer
  noofplayers

  constructor(private fbAdmin: FormBuilder,private location: Location, private route: ActivatedRoute, private _adminservice: AdminService, private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.fixtureId = +params['fixtureId'];
    })

    this._adminservice.UpcomingFixtureDetails(this.fixtureId)
      .subscribe((data) => {
        this.FixtureDetails = data;
        this.firsttournamentTeamId = this.FixtureDetails[0].tournamentTeamId
        this.secondtournamentTeamId = this.FixtureDetails[1].tournamentTeamId
        this.tournementId = this.FixtureDetails[1].tournementId

        this._adminservice.getFixtureTeamPlayers(this.fixtureId, this.firsttournamentTeamId)
          .subscribe((data) => {
            this.firstTeamPlayers = data;
          },
            err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.router.navigate(['/home'])
                }
              }
            }
          );

        this._adminservice.getFixtureTeamPlayers(this.fixtureId, this.secondtournamentTeamId)
          .subscribe((data) => {
            this.secondTeamPlayers = data;
          },
            err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.router.navigate(['/home'])
                }
              }
            }
          );

        this._adminservice.getSelectededTournament(this.FixtureDetails[1].tournementId)
          .subscribe((data) => {
            this.Tournament = data;
            if (this.Tournament[0]?.sportId[0] == Sport.Cricket) {
              this.noofplayers = 11
            } else if (this.Tournament[0]?.sportId[0] == Sport.Football) {
              this.noofplayers = 11
            } else if (this.Tournament[0]?.sportId[0] == Sport.Rugby) {
              this.noofplayers = 15
            }
          },
            err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.router.navigate(['/home'])
                }
              }
            }
          );
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );


    this._adminservice.getAddFixturePlayers(this.fixtureId)
      .subscribe((data) => {
        this.AddFixturePlayers = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getRemoveFixturePlayers(this.fixtureId)
      .subscribe((data) => {
        this.RemoveFixturePlayers = data;
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
    this.location.back()
  }

  ReasonAlert(Reason) {
    if(this.show()){
      alert(Reason);
    } 
  }

  show() {
    if (this.currentUser.RoleId == Role.Admin || this.currentUser.RoleId == Role.Coach) {
      return true;
    } else {
      return false;
    }
  }

  showadmin() {
    if (this.currentUser.RoleId == Role.Admin) {
      return true;
    } else {
      return false;
    }
  }

  iscreatedadmin() {
    if (this.Tournament[0]?.userId==this.currentUser.userId) {
      return true;
    } else {
      return false;
    }
  }

  disablestart() {
    if(this.firstTeamPlayers.length==this.noofplayers && this.secondTeamPlayers.length==this.noofplayers){
      return true
    }else{
      return false
    }
  }


  AddPlayer(userId) {
    this._adminservice.addPlayerFixture(this.sample, this.fixtureId, userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
    this.ngOnInit();
  }

  RemovePlayer(userId) {
    this._adminservice.removePlayerFixture(this.sample, this.fixtureId, userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
    this.ngOnInit();
  }

  startfixtureshow() {
    if (this.Tournament[0]?.tournamentstatus == 1 && this.FixtureDetails[0]?.fixtureState == null) {
      return true;
    } else {
      return false;
    }
  }
  addremoveshow() {
    if ((this.Tournament[0]?.tournamentstatus == 1 || this.Tournament[0]?.tournamentstatus == null) && this.FixtureDetails[0]?.fixtureState == null) {
      return true;
    } else {
      return false;
    }
  }

  startfixture() {
    if (confirm('Are you sure to start this fixture?') == true){
      if(this.disablestart()){
        this._adminservice.startFixture(this.FixtureDetails, this.fixtureId)
        .subscribe(
          response => {
            this.ngOnInit();
            console.log('success', response)
            this.router.navigate(['/ongoingtour', this.FixtureDetails[1].tournementId]);
          },
          error => console.error('Error!', error)
        );
      }else{
        alert('Fill '+this.noofplayers+' players')
      }
    }
  }

  deleteFixture() {
    if (confirm('Are you sure to delete this fixture?') == true){
      this._adminservice.deleteFixture(this.fixtureId)
      .subscribe(
        response => {
          console.log('success', response)
          this.location.back()
        },
        error => console.error('Error!', error)
      );
    this.ngOnInit();
    }
  }

  EditFixture = this.fbAdmin.group({
    fixtureVenue: [''],
    fixtureDate: ['2000-01-01T00:00:00.000Z'],
    fixtureTime: ['']
  });

  @ViewChild('myModalClose2') modalClose2;

  FixtureSubmit() {
    this.modalClose2.nativeElement.click();
    this._adminservice.editFixture(this.EditFixture.value,this.fixtureId)
      .subscribe(
        response => {
          console.log('success', response),
          this.ngOnInit();
        },
        error => console.error('Error!', error)
      );
  }

  checkcricket() {
    if (this.Tournament[0]?.sportId[0] == 's0001') {
      return true
    } else {
      false
    }
  }

  checkfootballe() {
    if (this.Tournament[0]?.sportId[0] == 's0002') {
      return true
    } else {
      false
    }
  }

  checkrugby() {
    if (this.Tournament[0]?.sportId[0] == 's0003') {
      return true
    } else {
      false
    }
  }
}
