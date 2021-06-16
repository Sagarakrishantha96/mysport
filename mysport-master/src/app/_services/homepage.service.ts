import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private _sendreview = environment.baseURL+"sendreview";

  constructor(private http: HttpClient) { }

  SendReview(user) {
    return this.http.post<any>(this._sendreview, user)
  }

  getInstituteCount() {
    let _url = environment.baseURL + "totalinstitutes";
    return this.http.get<any>(_url);
  }

  getPlayerCount() {
    let _url = environment.baseURL + "totalplayers";
    return this.http.get<any>(_url);
  }

  getTeamCount() {
    let _url = environment.baseURL + "totalteams";
    return this.http.get<any>(_url);
  }

  getCoachCount() {
    let _url = environment.baseURL + "totalcoaches";
    return this.http.get<any>(_url);
  }


}
