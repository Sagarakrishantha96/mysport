import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayerId() {
    let _url = environment.baseURL+"getplayerId";
    return this.http.get<any>(_url);
  }

  getPlayerTeams(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerteams";
    return this.http.get<any>(_url, { params });
  }

  getProfile(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerprofile";
    return this.http.get<any>(_url, { params });
  }

  getPlayerAttendance(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerattendance";
    return this.http.get<any>(_url, { params });
  }

  getPlayerCode(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayercode";
    return this.http.get<any>(_url, { params });
  }

  getPlayerAchiev(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerachiev";
    return this.http.get<any>(_url, { params });
  }

  getPlayerStrengths(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerstrengths";
    return this.http.get<any>(_url, { params });
  }

  getPlayerWeaknesses(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerweaknesses";
    return this.http.get<any>(_url, { params });
  }

  getPlayerFixtures(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerfixtures";
    return this.http.get<any>(_url, { params });
  }

  getPlayerFixturesOngoing(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerfixturesongoing";
    return this.http.get<any>(_url, { params });
  }

  getPlayerFixturesFinished(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerfixturesfinished";
    return this.http.get<any>(_url, { params });
  }

  getPlayerParents(userId) {
    let params = new HttpParams()
      .set('userId', userId)
    let _url = environment.baseURL+"getplayerparents";
    return this.http.get<any>(_url, { params });
  }

  changeProfile(user, userId) {
    let _url = environment.baseURL+"changeprofileplayer";
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

  addAchievPlayer(user, userId) {
    let _url = environment.baseURL+"addachievplayer";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  addStrengthPlayer(user, userId) {
    let _url = environment.baseURL+"addstrengthplayer";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  addWeaknessesPlayer(user, userId) {
    let _url = environment.baseURL+"addweaknessesplayer";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  ChangeAvailability(user, userId,fixtureId,tournamentTeamId) {
    let _url = environment.baseURL+"changeavailability";
    let params = new HttpParams()
      .set('userId', userId)
      .set('fixtureId', fixtureId)
      .set('tournamentTeamId', tournamentTeamId)
    return this.http.post<any>(_url, user, { params })
  }

  ConfirmAvailability(user, userId,fixtureId,tournamentTeamId) {
    let _url = environment.baseURL+"confirmavailability";
    let params = new HttpParams()
      .set('userId', userId)
      .set('fixtureId', fixtureId)
      .set('tournamentTeamId', tournamentTeamId)
    return this.http.post<any>(_url, user, { params })
  }

  deletePlayerAchieve(playerAchieveId){
    let _url = environment.baseURL+"deleteplayerachieve/";
    return this.http.delete<any>(_url + playerAchieveId )
  }

  deletePlayerStrength(strengthId){
    let _url = environment.baseURL+"deleteplayerstrength/";
    return this.http.delete<any>(_url + strengthId )
  }

  deletePlayerWeakness(weaknessesId){
    let _url = environment.baseURL+"deleteplayerweakness/";
    return this.http.delete<any>(_url + weaknessesId )
  }

  deletePlayer(userId){
    let _url = environment.baseURL+"deleteplayer/";
    return this.http.delete<any>(_url + userId )
  }
}
