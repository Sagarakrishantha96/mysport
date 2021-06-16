import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { Role } from '../_models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb1: FormBuilder, private router: Router, public _auth: AuthService) { }

  currentUser
  number

  ngOnInit(): void {
  }

  loginForm = this.fb1.group({
    userEmail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z1-9]*'), Validators.maxLength(20), Validators.minLength(8)]]
  })

  route() {
    if (this.currentUser.RoleId == Role.Admin) {
      this.router.navigate(['/adminpanel'])
    } else if (this.currentUser.RoleId == Role.Coach) {
      this.router.navigate(['/institutecoach'])
    } else if (this.currentUser.RoleId == Role.Player) {
      this.router.navigate(['/player'])
    }else if (this.currentUser.RoleId == Role.Parent) {
      this.router.navigate(['/parentprofile'])
    }
  }

  onSubmit() {
    this._auth.loginUser(this.loginForm.value)
      .subscribe(
        response => {
          console.log('Success!', response)
          this.currentUser = this._auth.currentUserValue;
          this.route();
        },
        error => {
          console.error('Error!', error)
          alert("Invalid login")
          this.loginForm.reset()
        }
      );
  }

  getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  @ViewChild('myModalClose') modalClose;

  changepassword(){
    this.loginForm.value.password=this.getRandomString(10)
    this.modalClose.nativeElement.click();

    this._auth.RecoverPassword(this.loginForm.value)
      .subscribe(
        response => {
          this.loginForm.reset();
        },
        error => {
          this.loginForm.reset()
        }
      );
  }

  

  // onSubmitt() {
  //   this._auth.sendMail(this.loginForm.value)
  //     .subscribe(
  //       response => {
  //         console.log('Success!', response)
  //       },
  //       error => {
  //         console.error('Error!', error)
  //         alert("Invalid login")
  //         this.loginForm.reset()
  //       }
  //     );
  // }

}

