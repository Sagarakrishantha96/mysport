import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../auth.service';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createcoach',
  templateUrl: './createcoach.component.html',
  styleUrls: ['./createcoach.component.scss']
})
export class CreatecoachComponent implements OnInit {

  constructor(private router: Router, private fbAdmin: FormBuilder, private _auth: AuthService, private _adminservice: AdminService) { }

  public Sports = [];
  number

  ngOnInit(): void {
    this._adminservice.getSports()
      .subscribe((data) => {
        this.Sports = data;
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

  get firstNameCoach() {
    return this.CoachRegistration.get('firstNameCoach');
  }
  get lastNameCoach() {
    return this.CoachRegistration.get('lastNameCoach');
  }
  get teleNoCoach() {
    return this.CoachRegistration.get('teleNoCoach');
  }

  CoachRegistration = this.fbAdmin.group({
    firstNameCoach: ['', [Validators.required, Validators.minLength(3)]],
    lastNameCoach: ['', [Validators.required, Validators.minLength(3)]],
    addressAdmin: ['', [Validators.required]],
    teleNoCoach: ['', [Validators.required, Validators.pattern('(07)[0-9]{8}')]],
    genderCoach: ['', [Validators.required]],
    dobCoach: ['', [Validators.required]],
    emailAddress: ['', [Validators.required]],
    password: [''],
    Sport: ['', [Validators.required]],
  });

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

  coachSubmit() {
    this.number=this.getRandomString(10)
    this.chechusermodel.userEmail = this.CoachRegistration.value.emailAddress
    this._auth.chechuser(this.chechusermodel)
      .subscribe(
        response => {
          this.CoachRegistration.value.password=this.number
          this._adminservice.coachregister(this.CoachRegistration.value)
            .subscribe(
              response => {
                console.log('success', response),
                  this.router.navigate(['/adminpanel']);
              },
              error => console.error('Error!', error)
            );
        },
        error => {
          console.error('Error!', error)
          alert("Already have an account")
          this.CoachRegistration.reset()
        }
      );
  }

}
