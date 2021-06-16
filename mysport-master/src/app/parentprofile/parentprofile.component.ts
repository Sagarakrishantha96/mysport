import { Component, OnInit } from '@angular/core';
import { ParentService } from '../_services/parent.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms'
import { ViewChild } from '@angular/core';
import { PasswordValidator } from '../shared/password.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-parentprofile',
  templateUrl: './parentprofile.component.html',
  styleUrls: ['./parentprofile.component.scss']
})
export class ParentprofileComponent implements OnInit {

  constructor(private _authService: AuthService, private fbParent: FormBuilder, private fb2: FormBuilder, private _parentservice: ParentService,
    private router: Router, private route: ActivatedRoute, private fbPlayer1: FormBuilder) { }

  currentUser
  userId: number
  usercode : string

  public Players = [];
  public ParentProfile = [];

  ngOnInit(): void {
    this.currentUser = this._authService.currentUserValue;
    this.userId = this.currentUser.userId

    this._parentservice.getPlayers(this.userId)
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

    this._parentservice.getParentProfile(this.userId)
      .subscribe((data) => {
        this.ParentProfile = data;
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

  addPlayer(){
    this._parentservice.addPlayer(this.registrationForm.value, this.userId,this.usercode)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success');
        },
        error => {
          alert("Invalid Code")
          console.error('Error!', error)
        }
      )
  }

  @ViewChild('myModalClose1') modalClose1;

  close() {
    this.modalClose1.nativeElement.click();
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
    this._parentservice.changePassword(this.registrationForm.value, this.userId)
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

  get firstNameParent() {
    return this.parentRegistration.get('firstNameParent');
  }
  get secondNameParent() {
    return this.parentRegistration.get('secondNameParent');
  }
  get teleNoParent() {
    return this.parentRegistration.get('teleNoParent');
  }

  parentRegistration = this.fbParent.group({
    firstNameParent: ['', [Validators.minLength(3)]],
    secondNameParent: ['', [Validators.minLength(3)]],
    AddressParent: ['', [Validators.minLength(5)]],
    teleNoParent: ['', [Validators.pattern('(07)[0-9]{8}')]]
  })

  parentSubmit() {
    this._parentservice.changeParentProfile(this.parentRegistration.value, this.userId)
      .subscribe(
        response => {
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
    this.ngOnInit();
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

}
