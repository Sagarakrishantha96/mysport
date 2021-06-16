import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService implements OnInit{

  _url2 = 'http://localhost:3000/coachRegi';
  _url3 = 'http://localhost:3000/parentRegi';
  _url4 = 'http://localhost:3000/playereRegi1';
  _url5 = 'http://localhost:3000/playereRegi2';

  private _checkuserUrl = "http://localhost:3000/api/checkuser";

  constructor( private _http: HttpClient) { }


  coachregister(userData){
    return this._http.post<any>(this._url2, userData);
  }

  parentregister(userData){
    return this._http.post<any>(this._url3, userData);
  }

  playerregister1(userData){
    return this._http.post<any>(this._url4, userData);
  }

  playerregister2(userData){
    return this._http.post<any>(this._url5, userData);
  }

  chechuser(user){
    return this._http.post<any>(this._checkuserUrl,user);
  }

  ngOnInit():void{}

}
