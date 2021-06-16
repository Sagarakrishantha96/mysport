import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AdminService } from '../admin.service';
import { AuthService } from '../auth.service';
import { Role } from '../_models/role';
import { ChatService } from '../_services/chat.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { PasswordValidator } from '../shared/password.validator';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent implements OnInit {

  constructor(private location: Location,private chatService: ChatService, private _adminservice: AdminService,
    private router: Router, private _authService: AuthService, private fbAdmin: FormBuilder,private fb2: FormBuilder) { }

  public Teams = [];
  public Coaches = [];
  public Players = [];
  public TeamCount = [];
  public CoachCount = [];
  public PlayerCount = [];
  public InstituteProfile = [];
  public userInfo = [];
  public institute = [];
  public AdminProfile = [];

  searchTeam;
  searchCoach;
  searchPlayer;
  Announcement: string
  currentUser
  name;
  instituteId: number
  adminId

  saveArray = {
    messageContent: '',
    messageDateTime: '',
    teamId: null,
    userId: 0,
    instituteId: 0,
    userName: '',
    RoleId: ''
  }

  ngOnInit(): void {

    this.currentUser = this._authService.currentUserValue;

    this._adminservice.getInstituteProfile()
      .subscribe((data) => {
        this.InstituteProfile = data;
        this._adminservice.getAdminProfile(this.InstituteProfile[0]?.userId)
          .subscribe((data) => {
            this.AdminProfile = data;
          },
            err => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
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

    this._adminservice.getTeams()
      .subscribe((data) => {
        this.Teams = data;
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

    this._adminservice.getPlayers()
      .subscribe((data) => {
        this.Players = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getInstituteTeamCount()
      .subscribe((data) => {
        this.TeamCount = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getInstituteCoachCount()
      .subscribe((data) => {
        this.CoachCount = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getInstitutePlayerCount()
      .subscribe((data) => {
        this.PlayerCount = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getUserInfo(this.currentUser.userId, this.currentUser.RoleId)
      .subscribe((data) => {
        this.userInfo = data;
        if (this.currentUser.RoleId == Role.Admin) {
          this.name = this.userInfo[0].adminFName
        } else if (this.currentUser.RoleId == Role.Player) {
          this.name = this.userInfo[0].playerFName
        } else if (this.currentUser.RoleId == Role.Coach) {
          this.name = this.userInfo[0].coachFName
        }
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

    this._adminservice.getInstituteId(this.currentUser.userEmail)
      .subscribe((data) => {
        this.institute = data;
        this.instituteId = this.institute[0]?.instituteId
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

  }

  back(){
    this.location.back()
  }

  checkadmin() {
    if (this.currentUser.RoleId==Role.Admin) {
      return true
    } else {
      false
    }
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

  @ViewChild('myModalClose') modalClose;

  sendAnnouncement() {
    this.saveArray.userId = this.currentUser.userId
    this.saveArray.userName = this.name
    this.saveArray.messageContent = this.Announcement
    this.saveArray.messageDateTime = new Date().toJSON("yyyy/MM/dd HH:mm");
    this.saveArray.RoleId = this.currentUser.RoleId
    this.saveArray.instituteId = this.instituteId

    this.chatService.sendMessage(this.saveArray);
    this.Announcement = '';

    this._adminservice.saveMessage(this.saveArray)
      .subscribe(
        response => {
          this.modalClose.nativeElement.click();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  checkmale(playerGender) {
    if (playerGender == 'male') {
      return true
    } else {
      return false
    }
  }

  checkfemale(playerGender) {
    if (playerGender == 'female') {
      return true
    } else {
      return false
    }
  }

  get firstNameAdmin() {
    return this.EditAdminProfile.get('firstNameAdmin');
  }
  get lastNameAdmin() {
    return this.EditAdminProfile.get('lastNameAdmin');
  }
  get teleNoAdmin() {
    return this.EditAdminProfile.get('teleNoAdmin');
  }

  EditAdminProfile = this.fbAdmin.group({
    firstNameAdmin: ['', [Validators.minLength(3)]],
    lastNameAdmin: ['', [Validators.minLength(3)]],
    addressAdmin: [''],
    teleNoAdmin: ['', [Validators.pattern('(07)[0-9]{8}')]]
  });

  @ViewChild('myModalClose1') modalClose1;

  adminSubmit() {
    this._adminservice.editProfile(this.EditAdminProfile.value,this.currentUser.userId)
      .subscribe(
        response => {
          this.modalClose1.nativeElement.click();
        },
        error => console.error('Error!', error)
      );
    this.ngOnInit();
  }

  @ViewChild('myModalClose3') modalClose3;

  close1() {
    this.modalClose3.nativeElement.click();
  }

  get password() {
    return this.registrationForm.get('password');
  }

  registrationForm = this.fb2.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.maxLength, Validators.pattern('[a-zA-Z1-9]*')]],
    confirmPassword: ['']
  }, { validator: PasswordValidator });

  onSubmit() {
    this._adminservice.changePassword(this.registrationForm.value, this.currentUser.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success');
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

}
