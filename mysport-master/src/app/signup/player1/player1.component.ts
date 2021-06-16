import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms'
import { RegistrationService } from '../../registration.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-player1',
  templateUrl: './player1.component.html',
  styleUrls: ['./player1.component.scss']
})
export class Player1Component implements OnInit {

  constructor(private _adminservice: AdminService, private _auth: AuthService, private fbPlayer1: FormBuilder, private _registrationServive: RegistrationService, private router: Router, private route: ActivatedRoute) { }

  public Structures = [];
  public Institutes = [];
  secretcode: string

  ngOnInit(): void {
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

    this._adminservice.getInstitutes()
      .subscribe((data) => {
        this.Institutes = data;
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

  get firstNamePlayer() {
    return this.playerRegistration1.get('firstNamePlayer');
  }
  get secondNamePlayer() {
    return this.playerRegistration1.get('secondNamePlayer');
  }
  get teleNoPlayer() {
    return this.playerRegistration1.get('teleNoPlayer');
  }

  register = {
    "userEmail": sessionStorage.getItem('email'),
    "userType": localStorage.getItem('userType')
  }

  playerRegistration1 = this.fbPlayer1.group({
    firstNamePlayer: ['', [Validators.required, Validators.minLength(3)]],
    secondNamePlayer: ['', [Validators.required, Validators.minLength(3)]],
    perAddressPlayer: ['', [Validators.required]],
    teleNoPlayer: ['', [Validators.required, Validators.pattern('(07)[0-9]{8}')]],
    dobpPlayer: ['', [Validators.required]],
    MFplayer: ['', [Validators.required]],
    PlayerStructure: ['', [Validators.required]],
    PlayerInstitute: ['', [Validators.required]],
    SecretCode: ['', [Validators.required]],
  })

  setCode(secretNo){
    alert('hi')
    alert(secretNo)
    this.secretcode=secretNo
  }
  compare() {
    if (this.playerRegistration1.value.SecretCode == this.secretcode) {
      return true
    } else {
      return false
    }
  }

  playerSubmit() {
    
    for(let index = 0; index < this.Institutes.length; index++){
      if(this.Institutes[index].instituteId==this.playerRegistration1.value.PlayerInstitute){
        this.secretcode=this.Institutes[index].secretNo
      }
    }
    if (this.compare()) {
      this._auth.registerUser(this.register)
        .subscribe(
          response => {
            this._auth.registerplayer(this.playerRegistration1.value,sessionStorage.getItem('email'))
              .subscribe(
                response => {
                  this.router.navigate(['/player']);
                  localStorage.removeItem('userType')
                  sessionStorage.removeItem('email')
                },
                error => {
                  console.error('Error!', error)
                }
              )
          },
          error => {
            console.error('Error!', error)
          }
        );
    } else {
      alert('Secter code is wrong')
    }

  }

}
