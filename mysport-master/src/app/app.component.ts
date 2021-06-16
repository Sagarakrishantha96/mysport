import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators }  from '@angular/forms';
import {Router} from '@angular/router'
import { AuthService } from './auth.service';
import { HomepageService } from './_services/homepage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','./mystyles/templatemo-finance-business.css']
})
export class AppComponent {

  constructor(private fb: FormBuilder,private _home: HomepageService,private fb1 : FormBuilder,private router : Router,public _auth : AuthService){
  }

  loginForm = this.fb1.group({
      userEmail:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z1-9]*'),Validators.maxLength(20),Validators.minLength(8)]]
  })

  onSubmit(){
    this._auth.loginUser(this.loginForm.value)
      .subscribe(
        response =>{
          console.log('Success!', response)
          localStorage.setItem('token',response.token)
          this.router.navigate(['/selectTeam']);
        },
        error => {
          console.error('Error!', error)
          alert("Invalid login")
          this.loginForm.reset()
      }
      );
  }

  sendmail = this.fb.group({
    FullName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    message: ['', [Validators.required]]
  })

  ReviewSubmit() {
    this._home.SendReview(this.sendmail.value)
      .subscribe(
        response => {
          alert('Email successfully send')
          this.sendmail.reset();
        },
        error => {
          console.error('Error!', error)
        }
      )
  }
}
