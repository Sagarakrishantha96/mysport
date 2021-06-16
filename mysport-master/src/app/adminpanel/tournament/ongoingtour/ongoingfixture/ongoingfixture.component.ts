import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Role } from '../../../../_models/role';
import { AuthService } from '../../../../auth.service';
import { Sport } from '../../../../_models/sport'
import { Location } from '@angular/common'

@Component({
  selector: 'app-ongoingfixture',
  templateUrl: './ongoingfixture.component.html',
  styleUrls: ['./ongoingfixture.component.scss']
})
export class OngoingfixtureComponent implements OnInit {

  fixtureId: number;
  private sub: any;
  currentUserId: number;

  public FixtureDetails = [];
  public firstTeamPlayers = [];
  public secondTeamPlayers = [];
  public Tournament = [];
  public Total1 = [];
  public Total2 = [];
  public Wicket1 = [];
  public Wicket2 = [];
  public Institute = [];

  wonteam: number
  wonscore: number
  lossteam: number
  lossscore: number
  wonteamname: string
  firstplayer
  secondplayer
  sportId: string
  extras1: number = 0
  extras2: number = 0
  realextra1: number
  realextra2: number
  description1: string
  description2: string

  scoreModel = {
    playerScore: null,
    overs: null,
    givescore: null,
    wickets: null,
    status: null,
    balls:null,
    Tries:null,
    Penalties:null,
    FieldGoals:null,
    Conversions:null,
  }

  constructor(private location: Location, private route: ActivatedRoute, private _adminservice: AdminService, private router: Router, private _authService: AuthService) { }

  currentUser = this._authService.currentUserValue;

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.fixtureId = +params['fixtureId'];
    })

    this._adminservice.UpcomingFixtureDetails(this.fixtureId)
      .subscribe((data) => {
        this.FixtureDetails = data;
        this.realextra1 = this.FixtureDetails[0]?.extras
        this.realextra2 = this.FixtureDetails[1]?.extras
        this.description1 = this.FixtureDetails[0]?.description
        this.description2 = this.FixtureDetails[1]?.description

        this._adminservice.getFixtureTeamPlayers(this.fixtureId, this.FixtureDetails[0].tournamentTeamId)
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

        this._adminservice.getFixtureTeamPlayers(this.fixtureId, this.FixtureDetails[1].tournamentTeamId)
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
            this.sportId = this.Tournament[0].sportId[0]
          },
            err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.router.navigate(['/home'])
                }
              }
            }
          );

        this._adminservice.getTotal(this.fixtureId, this.FixtureDetails[0].tournamentTeamId)
          .subscribe((data) => {
            this.Total1 = data;

            this._adminservice.getTotal(this.fixtureId, this.FixtureDetails[1].tournamentTeamId)
              .subscribe((data) => {
                this.Total2 = data;

                if (this.Total1[0]?.sumScore > this.Total2[0]?.sumScore) {
                  this.wonteamname = this.FixtureDetails[0]?.teamName
                } else if((this.Total1[0]?.sumScore < this.Total2[0]?.sumScore)) {
                  this.wonteamname = this.FixtureDetails[1]?.teamName
                }else{
                  this.wonteamname='draw'
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

        this._adminservice.getWickets(this.fixtureId, this.FixtureDetails[0].tournamentTeamId)
          .subscribe((data) => {
            this.Wicket1 = data;

            this._adminservice.getWickets(this.fixtureId, this.FixtureDetails[1].tournamentTeamId)
              .subscribe((data) => {
                this.Wicket2 = data;

                if (this.Total1[0]?.sumScore > this.Total2[0]?.sumScore) {
                  this.wonteamname = this.FixtureDetails[0]?.teamName
                } else {
                  this.wonteamname = this.FixtureDetails[1]?.teamName
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
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getInstituteId(this.currentUser.userEmail)
      .subscribe((data) => {
        this.Institute = data;
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

  navigateplayer1(playerId) {
    if (this.Institute[0]?.instituteId == this.firstTeamPlayers[0].instituteId[0]) {
      this.router.navigate(['/playerProfile', playerId]);
    }
    else {
    }
  }

  navigateplayer2(playerId) {
    if (this.Institute[0]?.instituteId == this.secondTeamPlayers[0].instituteId[0]) {
      this.router.navigate(['/playerProfile', playerId]);
    } else {
    }
  }

  instituteView1() {
    if (this.Institute[0]?.instituteId == this.firstTeamPlayers[0]?.instituteId[0]) {
      return true
    } else {
      return false
    }
  }

  instituteView2() {
    if (this.Institute[0]?.instituteId == this.secondTeamPlayers[0]?.instituteId[0]) {
      return true
    } else {
      return false
    }
  }

  isCricket() {
    if (this.sportId == Sport.Cricket) {
      return true
    } else {
      return false
    }
  }

  iscreatedadmin() {
    if (this.Tournament[0]?.userId == this.currentUser.userId) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    if (this.currentUser.RoleId == Role.Admin || this.currentUser.RoleId == Role.Coach) {
      return true;
    } else {
      return false;
    }
  }

  setScore(playerScore,wickets,givescore,overs,outnotout,balls,Tries,FieldGoals,Conversions){
    this.scoreModel.playerScore=playerScore
    this.scoreModel.wickets=wickets
    this.scoreModel.givescore=givescore
    this.scoreModel.overs=overs
    this.scoreModel.status=outnotout
    this.scoreModel.balls=balls
    this.scoreModel.Tries=Tries
    this.scoreModel.FieldGoals=FieldGoals
    this.scoreModel.Conversions=Conversions
  }

  currentPlayer(userId) {
    this.currentUserId = userId
  }

  @ViewChild('myModalClose1') modalClose1;
  @ViewChild('myModalClose2') modalClose2;

  closeModel() {
    this.modalClose1.nativeElement.click();
  }

  submitPlayerScore() {
    this._adminservice.changePlayerScore(this.scoreModel, this.fixtureId, this.currentUserId, this.FixtureDetails[0].tournamentTeamId)
      .subscribe(
        response => {
          this.modalClose1.nativeElement.click();
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );

    this.scoreModel.playerScore = null
    this.scoreModel.overs = null
    this.scoreModel.givescore = null
    this.scoreModel.wickets = null
    this.scoreModel.status = null
    this.scoreModel.balls = null
    this.scoreModel.Tries = null
    this.scoreModel.FieldGoals = null
    this.scoreModel.Conversions = null
  }

  submitPlayerScore1() {
    this._adminservice.changePlayerScore(this.scoreModel, this.fixtureId, this.currentUserId, this.FixtureDetails[1].tournamentTeamId)
      .subscribe(
        response => {
          this.modalClose2.nativeElement.click();
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );

    this.scoreModel.playerScore = null
    this.scoreModel.overs = null
    this.scoreModel.givescore = null
    this.scoreModel.wickets = null
    this.scoreModel.status = null
    this.scoreModel.balls = null
    this.scoreModel.Tries = null
    this.scoreModel.FieldGoals = null
    this.scoreModel.Conversions = null
  }

  postponefixture() {
    if (confirm('Are you sure to postpone this fixture?') == true) {
      this._adminservice.PostponeFixture(this.FixtureDetails, this.fixtureId)
        .subscribe(
          response => {
            this.ngOnInit();
            console.log('success', response)
            this.router.navigate(['/ongoingtour', this.FixtureDetails[1].tournementId]);
          },
          error => {
            console.error('Error!', error)
          }
        );
    }
  }

  finishfixture() {
    if (confirm('Are you sure to finish this fixture?') == true) {
      if (this.Total1[0]?.sumScore > this.Total2[0]?.sumScore) {

        this.wonteam = this.FixtureDetails[0].tournamentTeamId
        this.lossteam = this.FixtureDetails[1].tournamentTeamId
        this.wonscore = this.Total1[0]?.sumScore
        this.lossscore = this.Total2[0]?.sumScore

        this.wonteamname = this.FixtureDetails[0]?.teamName

      } else {

        this.wonteam = this.FixtureDetails[1].tournamentTeamId
        this.lossteam = this.FixtureDetails[0].tournamentTeamId
        this.wonscore = this.Total2[0]?.sumScore
        this.lossscore = this.Total1[0]?.sumScore

        this.wonteamname = this.FixtureDetails[1]?.teamName

      }

      this._adminservice.finishFixture(this.FixtureDetails, this.fixtureId, this.wonteam, this.wonscore, this.lossteam, this.lossscore)
        .subscribe(
          response => {
            this.ngOnInit();
            console.log('success', response)
            this.router.navigate(['/ongoingtour', this.FixtureDetails[1].tournementId]);
          },
          error => console.error('Error!', error)
        );
    }
  }

  finished() {
    if (this.FixtureDetails[0]?.fixtureState == 1) {
      return true;
    } else {
      return false;
    }
  }

  showwhenfinished() {
    if (this.FixtureDetails[0]?.fixtureState == 0) {
      return true;
    } else {
      return false;
    }
  }

  @ViewChild('myModalClose3') modalClose3;
  @ViewChild('myModalClose4') modalClose4;

  submitExtra1() {
    this._adminservice.updateExtra(this.scoreModel, this.extras1, this.fixtureId, this.FixtureDetails[0].tournamentTeamId)
      .subscribe(
        response => {
          this.modalClose3.nativeElement.click();
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  submitExtra2() {
    this._adminservice.updateExtra(this.scoreModel, this.extras2, this.fixtureId, this.FixtureDetails[1].tournamentTeamId)
      .subscribe(
        response => {
          this.modalClose4.nativeElement.click();
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  submitDescrip1() {
    this._adminservice.updateDescript(this.scoreModel, this.description1, this.fixtureId, this.FixtureDetails[0].tournamentTeamId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  submitDescrip2() {
    this._adminservice.updateDescript(this.scoreModel, this.description2, this.fixtureId, this.FixtureDetails[1].tournamentTeamId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
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
