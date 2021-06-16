import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { RegistrationService } from '../../registration.service'
import { Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createplayer',
  templateUrl: './createplayer.component.html',
  styleUrls: ['./createplayer.component.scss']
})
export class CreateplayerComponent implements OnInit {

  constructor(private _auth: AuthService, private fbPlayer1: FormBuilder, private _registrationServive: RegistrationService,
    private router: Router, private _adminservice: AdminService) { }

  public Structures = [];
  number

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
  }

  get firstNamePlayer() {
    return this.createPlayer.get('firstNamePlayer');
  }
  get secondNamePlayer() {
    return this.createPlayer.get('secondNamePlayer');
  }
  get teleNoPlayer() {
    return this.createPlayer.get('teleNoPlayer');
  }

  createPlayer = this.fbPlayer1.group({
    firstNamePlayer: ['', [Validators.required, Validators.minLength(3)]],
    secondNamePlayer: ['', [Validators.required, Validators.minLength(3)]],
    perAddressPlayer: ['', [Validators.required]],
    teleNoPlayer: ['', [Validators.required, Validators.pattern('(07)[0-9]{8}')]],
    dobpPlayer: ['', [Validators.required]],
    MFplayer: ['', [Validators.required]],
    emailAddress: ['', [Validators.required]],
    password: [''],
    PlayerStructure: ['', [Validators.required]]
  })

  chechusermodel = {
    userEmail: ''
  }

  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  playerSubmit() {
    this.number=this.getRandomString(10)
    this.chechusermodel.userEmail = this.createPlayer.value.emailAddress
    this._auth.chechuser(this.chechusermodel)
      .subscribe(
        response => {
          console.log('Success!', response)
          this.createPlayer.value.password = this.number
          this._adminservice.createplayer(this.createPlayer.value)
            .subscribe(
              response => {
                this.router.navigate(['/adminpanel']);
              },
              error => {
                console.error('Error!', error)
              }
            )
        },
        error => {
          console.error('Error!', error)
          alert("Already have an account")
          this.createPlayer.reset()
        }
      );
  }
}
