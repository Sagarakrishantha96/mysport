import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private http: HttpClient) { }

  getPlayers(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getparentplayers";
    return this.http.get<any>(_url, { params });
  }

  getParentProfile(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getparentprofile";
    return this.http.get<any>(_url, { params });
  }

  changeParentProfile(user, userId) {
    let _url = environment.baseURL+"changeprofileparent";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  changePassword(user, userId) {
    let _url = environment.baseURL+"changePassword";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  addPlayer(user,userId,usercode) {
    let _url = environment.baseURL+"addplayerparent";
    let params = new HttpParams()
      .set('userId', userId)
      .set('usercode', usercode)
    return this.http.post<any>(_url, user, { params })
  }
}
