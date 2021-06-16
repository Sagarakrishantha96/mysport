import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core'
import { Role } from '../../_models/role';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common'
import { ChatboxComponent } from './chatbox/chatbox.component'


@Component({
  selector: 'app-adminteam',
  templateUrl: './adminteam.component.html',
  styleUrls: ['./adminteam.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminteamComponent implements OnInit {

  @ViewChild(ChatboxComponent) child: ChatboxComponent;

  teamid: number;
  private sub: any;

  constructor(private location: Location, private route: ActivatedRoute, private _adminservice: AdminService, private router: Router,
    private fbAdmin: FormBuilder, private _authService: AuthService, private fbteam: FormBuilder) { }

  currentUser = this._authService.currentUserValue;

  public TeamPlayers = [];
  public TeamDetails = [];
  public Achievements = [];
  public addplayers = [];
  public Coaches = [];
  public UpcomingTournaments = [];
  public OngoingTournaments = [];
  public FinishedTournaments = [];
  public UpcomingSession = [];
  public FinishedSession = [];
  public SessionPlayers = [];

  searchPlayer;
  sportName;
  searchTour;
  status;
  searchSession;
  currentsession;

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.teamid = +params['teamid'];
    })

    this._adminservice.getTeamPlayers(this.teamid)
      .subscribe((data) => {
        this.TeamPlayers = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getTeamDetails(this.teamid)
      .subscribe((data) => {
        this.TeamDetails = data;
        this.sportName = this.TeamDetails[0]?.sportName
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getTeamAchieve(this.teamid)
      .subscribe((data) => {
        this.Achievements = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getTeamTourUpcoming(this.teamid)
      .subscribe((data) => {
        this.UpcomingTournaments = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getTeamTourOngoing(this.teamid)
      .subscribe((data) => {
        this.OngoingTournaments = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getTeamTourFinished(this.teamid)
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

    this._adminservice.getUpcomingSession(this.teamid)
      .subscribe((data) => {
        this.UpcomingSession = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getFinishedSession(this.teamid)
      .subscribe((data) => {
        this.FinishedSession = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getaddplayers(this.teamid)
      .subscribe((data) => {
        this.addplayers = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getCoaches()
      .subscribe((data) => {
        this.Coaches = data;
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

  back() {
    this.location.back()
  }

  achieve = this.fbAdmin.group({
    achievecontent: ['', [Validators.required, Validators.minLength(3)]],
  });

  @ViewChild('myModalClose') modalClose;

  achieveSubmit() {
    this.modalClose.nativeElement.click();
    this._adminservice.addAchieve(this.achieve.value, this.teamid)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  AddPlayer(playerId) {
    this._adminservice.addplayerteam(this.achieve.value, this.teamid, playerId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  RemovePlayer(playerId) {
    this._adminservice.removeplayerteam(this.achieve.value, this.teamid, playerId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  show() {
    if (this.currentUser.RoleId == Role.Admin || this.currentUser.RoleId == Role.Coach) {
      return true;
    } else {
      return false;
    }
  }

  checkcricket() {
    if (this.TeamDetails[0]?.sportName == 'Cricket') {
      return true
    } else {
      false
    }
  }

  checkfootballe() {
    if (this.TeamDetails[0]?.sportName == 'Football') {
      return true
    } else {
      false
    }
  }

  checkrugby() {
    if (this.TeamDetails[0]?.sportName == 'Rugby') {
      return true
    } else {
      false
    }
  }

  EditTeam = this.fbteam.group({
    TeamName: [''],
    Coach: ['']
  })

  @ViewChild('myModalClose2') modalClose2;

  TeamSubmit() {
    this.modalClose2.nativeElement.click();
    this._adminservice.editTeam(this.EditTeam.value, this.teamid)
      .subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

  deleteAchieve(achieveId) {
    if (confirm('Are you sure to delete this Achievement?') == true) {
      this._adminservice.deleteAchieve(achieveId)
        .subscribe(
          response => {
            this.ngOnInit();
          },
          error => {
            console.error('Error!', error)
          }
        )
    }
  }

  checkcricketTour(sport) {
    if (sport == 'Cricket') {
      return true
    } else {
      false
    }
  }

  checkfootballTour(sport) {
    if (sport == 'Football') {
      return true
    } else {
      false
    }
  }

  checkrugbyTour(sport) {
    if (sport == 'Rugby') {
      return true
    } else {
      false
    }
  }

  //Session

  AddSession = this.fbteam.group({
    DateTime: ['', Validators.required],
    Venue: ['', [Validators.required, Validators.minLength(4)]]
  })

  @ViewChild('myModalClose3') modalClose3;

  SessionSubmit() {
    this.modalClose3.nativeElement.click();
    this._adminservice.AddSession(this.AddSession.value, this.teamid)
      .subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

  SetSession(sessionId, sessionSummery) {
    this.currentsession = sessionId
    this.DescriptModel.description = sessionSummery
  }

  DescriptModel = {
    description: ''
  }

  submitDescrip() {
    this._adminservice.AddSessionDescript(this.DescriptModel, this.teamid, this.currentsession)
      .subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

  FinishSession(sessionId) {
    this._adminservice.FinishSession(this.DescriptModel, sessionId)
      .subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.error('Error!', error)
        }
      )

    for (var i = 0; i < this.TeamPlayers.length; i++) {
      this._adminservice.AddSessionPlayers(this.TeamPlayers, sessionId,this.TeamPlayers[i].userId)
        .subscribe(
          response => {
            this.ngOnInit();
          },
          error => {
            console.error('Error!', error)
          }
        )
    }
  }

  GetSessionPlayers(sessionId){
    this._adminservice.getSessionPlayers(sessionId)
      .subscribe((data) => {
        this.SessionPlayers = data;
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

  SetParticipated(sessionPlayerId) {
    this._adminservice.SetParticipated(this.AddSession.value,sessionPlayerId)
      .subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.error('Error!', error)
        }
      )
      this.ngOnInit();
  }

  SetNotParticipated(sessionPlayerId) {
    this._adminservice.SetNotParticipated(this.AddSession.value,sessionPlayerId)
      .subscribe(
        response => {
          this.ngOnInit();
        },
        error => {
          console.error('Error!', error)
        }
      )
      this.ngOnInit();
  }

}
