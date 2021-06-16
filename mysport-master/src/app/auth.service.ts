import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../environments/environment'
import { User } from './_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private _registerUrl = environment.baseURL+"register";
  private _loginUrl = environment.baseURL+"login";
  private _checkuserUrl = environment.baseURL+"checkuser";
  private _tempregiUrl = environment.baseURL+"tempregister";
  private _playerregister = environment.baseURL+"playerregister";
  private _parentregister = environment.baseURL+"parentregister";
  private _adminregister = environment.baseURL+"adminregister";
  private _sendemail = environment.baseURL+"sendmail";
  private _recoverpassword= environment.baseURL+"recoverpassword";

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
      .pipe(map(user => {
        if (user && user.token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
      .pipe(map(user => {
        if (user && user.token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  getToken() {
    return this.currentUserValue.token
  }

  getEmail() {
    return this.currentUserValue.userEmail
  }

  logoutUser() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/home'])
  }

  chechuser(user) {
    return this.http.post<any>(this._checkuserUrl, user);
  }

  sendMail(user) {
    return this.http.post<any>(this._sendemail, user);
  }

  tempregister(user) {
    return this.http.post<any>(this._tempregiUrl, user);
  }

  registerplayer(user,email) {
    let params = new HttpParams()
      .set('email', email)
    return this.http.post<any>(this._playerregister, user,{ params })
  }

  adminregister(user) {
    return this.http.post<any>(this._adminregister, user)
  }

  ParentRegister(user) {
    return this.http.post<any>(this._parentregister, user)
  }

  RecoverPassword(user) {
    return this.http.post<any>(this._recoverpassword, user)
  }

}
