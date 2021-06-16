import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient) { }

  getCoachTeams(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getcoachteams";
    return this.http.get<any>(_url, { params });
  }

  getCoachProfile(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getcoachprofile";
    return this.http.get<any>(_url, { params });
  }

  changeCoachProfile(user, userId) {
    let _url = environment.baseURL+"changeprofilecoach";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  changePassword(user, userId) {
    let _url= environment.baseURL+"changePassword";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  deleteCoach(userId){
    let _url = environment.baseURL+"deletecoach/";
    return this.http.delete<any>(_url + userId )
  }
}
