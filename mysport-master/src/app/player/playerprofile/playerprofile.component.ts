import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../_services/player.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'
import { ViewChild } from '@angular/core';
import { PasswordValidator } from '../../shared/password.validator';
import { AuthService } from '../../auth.service';
import { Role } from '../../_models/role';
import { Location } from '@angular/common'
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-playerprofile',
  templateUrl: './playerprofile.component.html',
  styleUrls: ['./playerprofile.component.scss']
})
export class PlayerprofileComponent implements OnInit {

  userId: number
  private sub: any;

  currentUser

  constructor(private _adminservice: AdminService, private fbAdmin: FormBuilder, private fb2: FormBuilder, private _playerservice: PlayerService,
    private router: Router, private route: ActivatedRoute, private fbPlayer1: FormBuilder, private _authService: AuthService, private location: Location) { }

  public PlayerTeams = [];
  public PlayerProfile = [];
  public Achievements = [];
  public Strengths = [];
  public Weaknesses = [];
  public Fixtures = [];
  public OngoingFixtures = [];
  public FinishedFixtures = [];
  public Parents = [];
  public Structures = [];
  public PlayerAttendance = [];

  instituteId: number
  fixtureId: number
  tournamentTeamId: number
  searchFixture
  attendance

  ngOnInit(): void {

    this.currentUser = this._authService.currentUserValue;

    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['playerId'];
    })

    this._playerservice.getPlayerTeams(this.userId)
      .subscribe((data) => {
        this.PlayerTeams = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._playerservice.getProfile(this.userId)
      .subscribe((data) => {
        this.PlayerProfile = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._playerservice.getPlayerAttendance(this.userId)
      .subscribe((data) => {
        this.PlayerAttendance = data;
        
        if(this.PlayerAttendance[0]?.sessioncount==null || this.PlayerAttendance[0]?.sessioncount==''){
          this.attendance=0;
        }else{
          this.attendance=(this.PlayerAttendance[0]?.yescount/this.PlayerAttendance[0]?.sessioncount)*100
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

    this._playerservice.getPlayerAchiev(this.userId)
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

    this._playerservice.getPlayerStrengths(this.userId)
      .subscribe((data) => {
        this.Strengths = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._playerservice.getPlayerWeaknesses(this.userId)
      .subscribe((data) => {
        this.Weaknesses = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._playerservice.getPlayerFixtures(this.userId)
      .subscribe((data) => {
        this.Fixtures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._playerservice.getPlayerFixturesOngoing(this.userId)
      .subscribe((data) => {
        this.OngoingFixtures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._playerservice.getPlayerFixturesFinished(this.userId)
      .subscribe((data) => {
        this.FinishedFixtures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._playerservice.getPlayerParents(this.userId)
      .subscribe((data) => {
        this.Parents = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getStructure()
      .subscribe((data) => {
        this.Structures = data;
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

  deleteAchieve(playerAchieveId) {
    if (confirm('Are you sure to delete this Achievement?') == true) {
      this._playerservice.deletePlayerAchieve(playerAchieveId)
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

  deleteStrengths(strengthId) {
    if (confirm('Are you sure to delete this Strength?') == true) {
      this._playerservice.deletePlayerStrength(strengthId)
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

  deleteWeakness(weaknessesId) {
    if (confirm('Are you sure to delete this Strength?') == true) {
      this._playerservice.deletePlayerWeakness(weaknessesId)
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

  deletePlayer() {
    if (confirm('Are you sure to delete Player?') == true) {
      this._playerservice.deletePlayer(this.userId)
        .subscribe(
          response => {
            this.location.back()
          },
          error => {
            console.error('Error!', error)
          }
        )
    }
  }

  changeavailability(fixtureId, tournamentTeamId) {
    if (confirm('Are you sure to confirm this availability?') == true) {
      this.fixtureId = fixtureId[0]
      this.tournamentTeamId = tournamentTeamId
      this._playerservice.ConfirmAvailability(this.PlayerTeams, this.userId, this.fixtureId, this.tournamentTeamId)
        .subscribe(
          response => {
            this.ngOnInit();
            console.log('success', response)
          },
          error => console.error('Error!', error)
        );
    }
  }

  navigateTeam(teamId) {
    if (this.currentUser.RoleId == Role.Parent) {

    } else {
      this.router.navigate(['/adminteam', teamId]);
    }
  }

  back() {
    this.location.back()
  }

  achiveshow() {
    if (this.currentUser.RoleId == Role.Parent) {
      return false
    } else {
      return true
    }
  }

  confirm() {
    if (this.currentUser.RoleId == Role.Parent) {
      return true
    } else {
      return false
    }
  }

  achieve = this.fbAdmin.group({
    achievecontent: ['', [Validators.required, Validators.minLength(3)]],
  });

  @ViewChild('myModalClose2') modalClose2;

  achieveSubmit() {
    this.modalClose2.nativeElement.click();
    this._playerservice.addAchievPlayer(this.achieve.value, this.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  strength = this.fbAdmin.group({
    playerStrengths: ['', [Validators.required, Validators.minLength(3)]],
  });

  @ViewChild('myModalClose4') modalClose4;

  strengthsSubmit() {
    this.modalClose4.nativeElement.click();
    this._playerservice.addStrengthPlayer(this.strength.value, this.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  weaknesses = this.fbAdmin.group({
    playerWeaknesses: ['', [Validators.required, Validators.minLength(3)]],
  });

  @ViewChild('myModalClose5') modalClose5;

  weaknessesSubmit() {
    this.modalClose5.nativeElement.click();
    this._playerservice.addWeaknessesPlayer(this.weaknesses.value, this.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  get firstNamePlayer() {
    return this.playerRegistration1.get('firstNamePlayer');
  }
  get secondNamePlayer() {
    return this.playerRegistration1.get('secondNamePlayer');
  }
  get teleNoPlayer() {
    return this.playerRegistration1.get('teleNoPlayer');
  }

  playerRegistration1 = this.fbPlayer1.group({
    firstNamePlayer: [this.PlayerProfile[0]?.playerFName, [Validators.minLength(3)]],
    secondNamePlayer: [this.PlayerProfile[0]?.playerLName, [Validators.minLength(3)]],
    perAddressPlayer: [this.PlayerProfile[0]?.playerAddress, [Validators.minLength(3)]],
    teleNoPlayer: [this.PlayerProfile[0]?.playerteleNum, [Validators.pattern('(07)[0-9]{8}')]],
    heightPlayer: [''],
    weightPlayer: [''],
    bloodSelect: [''],
    PlayerStructure: ['']
  })

  @ViewChild('myModalClose1') modalClose1;

  close() {
    this.modalClose1.nativeElement.click();
  }

  @ViewChild('myModalClose3') modalClose3;

  close1() {
    this.modalClose3.nativeElement.click();
  }

  playerSubmit() {
    this._playerservice.changeProfile(this.playerRegistration1.value, this.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success');
          this.playerRegistration1.reset();
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

  get password() {
    return this.registrationForm.get('password');
  }

  registrationForm = this.fb2.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.maxLength, Validators.pattern('[a-zA-Z1-9]*')]],
    confirmPassword: ['']
  }, { validator: PasswordValidator });

  @ViewChild('myModalClose6') modalClose6;


  onSubmit() {
    this._playerservice.changePassword(this.registrationForm.value, this.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          this.registrationForm.reset();
          console.log('success');
        },
        error => {
          console.error('Error!', error)
        }
      )
    this.modalClose6.nativeElement.click();
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
