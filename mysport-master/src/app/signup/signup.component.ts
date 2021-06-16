import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../shared/password.validator';
import { AuthService } from '../auth.service';
import { RegistrationService } from '../registration.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private fb2: FormBuilder, private _auth: AuthService, private _registration: RegistrationService) { }

  ngOnInit(): void {
  }

  goToSelection() {
    this.router.navigate(['/select']);
  }

  get userEmail() {
    return this.registrationForm.get('userEmail');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  registrationForm = this.fb2.group({
    userEmail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.maxLength, Validators.pattern('[a-zA-Z1-9]*')]],
    confirmPassword: ['']
  }, { validator: PasswordValidator });

  onSubmitt() {
    this._auth.chechuser(this.registrationForm.value)
      .subscribe(
        response => {
          console.log('Success!', response)
          sessionStorage.setItem('email', this.registrationForm.value.userEmail)

          this._auth.tempregister(this.registrationForm.value)
            .subscribe(
              response => {
                console.log('Success!', response)
                this.router.navigate(['/select']);
              },
              error => {
                console.error('Error!', error)
                console.log('Hi error!')
              }
            )
        },
        error => {
          console.error('Error!', error)
          alert("Already have an account")
          this.registrationForm.reset()
        }
      );
  }

  onSubmit() {
    this._auth.chechuser(this.registrationForm.value)
      .subscribe(
        response => {
          this._auth.tempregister(this.registrationForm.value)
            .subscribe(
              response => {
                this._auth.sendMail(this.registrationForm.value)
                  .subscribe(
                    response => {
                      this.router.navigate(['/waitforemail']);
                    },
                    error => {
                      console.error('Error!', error)
                    }
                  )
                  this.router.navigate(['/waitforemail']);
              },
              error => {
                console.error('Error!', error)
              }
            )
        },
        error => {
          alert("Already have an account")
          this.registrationForm.reset()
        }
      );
  }

}
