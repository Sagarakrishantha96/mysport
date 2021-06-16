import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getTeams() {
    let _url = environment.baseURL + "teams";
    return this.http.get<any>(_url);
  }

  getTeamPlayers(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "teamplayers";
    return this.http.get<any>(_url, { params });
  }

  getTeamDetails(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "teamdetails";
    return this.http.get<any>(_url, { params });
  }

  getTeamAchieve(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "teamachieve";
    return this.http.get<any>(_url, { params });
  }

  getUpcomingSession(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "getupcomingsession";
    return this.http.get<any>(_url, { params });
  }

  getFinishedSession(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "getfinishedsession";
    return this.http.get<any>(_url, { params });
  }

  getSessionPlayers(sessionId) {
    let params = new HttpParams()
      .set('sessionId', sessionId)
    let _url = environment.baseURL + "getsessionplayers";
    return this.http.get<any>(_url, { params });
  }

  getTeamTourUpcoming(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "getteamtourupcoming";
    return this.http.get<any>(_url, { params });
  }

  getTeamTourOngoing(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "getteamtourongoing";
    return this.http.get<any>(_url, { params });
  }

  getTeamTourFinished(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "getteamtourfinished";
    return this.http.get<any>(_url, { params });
  }

  getaddplayers(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    let _url = environment.baseURL + "addplayerview";
    return this.http.get<any>(_url, { params });
  }

  getCoaches() {
    let _url = environment.baseURL + "coaches";
    return this.http.get<any>(_url);
  }

  getPlayers() {
    let _url = environment.baseURL + "players";
    return this.http.get<any>(_url);
  }

  getInstituteTeamCount() {
    let _url = environment.baseURL + "getinstituteteamcount";
    return this.http.get<any>(_url);
  }

  getInstituteCoachCount() {
    let _url = environment.baseURL + "getinstitutecoachcount";
    return this.http.get<any>(_url);
  }

  getInstitutePlayerCount() {
    let _url = environment.baseURL + "getinstituteplayercount";
    return this.http.get<any>(_url);
  }

  getSports() {
    let _url = environment.baseURL + "sports";
    return this.http.get<any>(_url);
  }

  getStructure() {
    let _url = environment.baseURL + "structure";
    return this.http.get<any>(_url);
  }

  getInstitutes() {
    let _url = environment.baseURL + "institutes";
    return this.http.get<any>(_url);
  }

  getCreatedTournament() {
    let _url = environment.baseURL + "getcreatedtournament";
    return this.http.get<any>(_url);
  }

  getStartedTournament() {
    let _url = environment.baseURL + "getstartedtournament";
    return this.http.get<any>(_url);
  }

  getFinishedTournament() {
    let _url = environment.baseURL + "getfinishedtournament";
    return this.http.get<any>(_url);
  }

  getSelectededTournament(tournamentId) {

    let params = new HttpParams()
      .set('tournamentId', tournamentId)

    let _url = environment.baseURL + "getselectedtournament";
    return this.http.get<any>(_url, { params });
  }

  getFixtureFirstTeam(tournamentId, strutureId) {

    let params = new HttpParams()
      .set('tournamentId', tournamentId)
      .set('strutureId', strutureId)

    let _url = environment.baseURL + "getfixturefirstteam";
    return this.http.get<any>(_url, { params });
  }

  getUpcomingFixture(tournementId) {

    let params = new HttpParams()
      .set('tournementId', tournementId)

    let _url = environment.baseURL + "getupcomingfixture";
    return this.http.get<any>(_url, { params });
  }

  getOngoingFixture(tournementId) {

    let params = new HttpParams()
      .set('tournementId', tournementId)

    let _url = environment.baseURL + "getongoingfixture";
    return this.http.get<any>(_url, { params });
  }

  getFinishedFixture(tournementId) {

    let params = new HttpParams()
      .set('tournementId', tournementId)

    let _url = environment.baseURL + "getfinishedfixture";
    return this.http.get<any>(_url, { params });
  }

  UpcomingFixtureDetails(fixtureId) {

    let params = new HttpParams()
      .set('fixtureId', fixtureId)

    let _url = environment.baseURL + "upcomingfixturedetails";
    return this.http.get<any>(_url, { params });
  }

  getFixtureTeamPlayers(fixtureId, tournamentTeamId) {

    let params = new HttpParams()
      .set('fixtureId', fixtureId)
      .set('tournamentTeamId', tournamentTeamId)

    let _url = environment.baseURL + "getfixtureteamplayers";
    return this.http.get<any>(_url, { params });
  }

  getAddFixturePlayers(fixtureId) {
    let params = new HttpParams()
      .set('fixtureId', fixtureId)

    let _url = environment.baseURL + "getaddfixtureplayers";
    return this.http.get<any>(_url, { params });
  }

  getRemoveFixturePlayers(fixtureId) {
    let params = new HttpParams()
      .set('fixtureId', fixtureId)

    let _url = environment.baseURL + "getremovefixtureplayers";
    return this.http.get<any>(_url, { params });
  }

  getTotal(fixtureId, tournamentTeamId) {
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
      .set('tournamentTeamId', tournamentTeamId)

    let _url = environment.baseURL + "getTotal";
    return this.http.get<any>(_url, { params });
  }

  getWickets(fixtureId, tournamentTeamId) {
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
      .set('tournamentTeamId', tournamentTeamId)

    let _url = environment.baseURL + "getWickets";
    return this.http.get<any>(_url, { params });
  }

  getSummery(tournamentId) {
    let params = new HttpParams()
      .set('tournamentId', tournamentId)

    let _url = environment.baseURL + "getsummery";
    return this.http.get<any>(_url, { params });
  }

  getInstituteInfo(instituteId) {
    let params = new HttpParams()
      .set('instituteId', instituteId)

    let _url = environment.baseURL + "getinstituteinfo";
    return this.http.get<any>(_url, { params });
  }

  getPointTable(tournamentId) {
    let params = new HttpParams()
      .set('tournamentId', tournamentId)

    let _url = environment.baseURL + "getpointtable";
    return this.http.get<any>(_url, { params });
  }

  getTourStructures(tournamentId) {
    let params = new HttpParams()
      .set('tournamentId', tournamentId)

    let _url = environment.baseURL + "gettourstructures";
    return this.http.get<any>(_url, { params });
  }

  getaddedinstitutes(tournamentId) {
    let params = new HttpParams()
      .set('tournamentId', tournamentId)
    let _url = environment.baseURL + "getaddedinstitutes";
    return this.http.get<any>(_url, { params });
  }

  getNewTour() {
    let _url = environment.baseURL + "getnewtournament";
    return this.http.get<any>(_url);
  }

  getInstituteProfile() {
    let _url = environment.baseURL + "getinstituteprofile";
    return this.http.get<any>(_url);
  }

  getInstituteId(userEmail) {
    let params = new HttpParams()
      .set('userEmail', userEmail)
    let _url = environment.baseURL + "getinstituteid";
    return this.http.get<any>(_url, { params });
  }

  getUserInfo(userId, RoleId) {
    let params = new HttpParams()
      .set('userId', userId)
      .set('RoleId', RoleId)

    let _url = environment.baseURL + "getuserinfo";
    return this.http.get<any>(_url, { params });
  }

  getmessages(teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)

    let _url = environment.baseURL + "getmessages";
    return this.http.get<any>(_url, { params });
  }

  getStructures(tournementId) {
    let params = new HttpParams()
      .set('tournementId', tournementId)

    let _url = environment.baseURL + "getstructures";
    return this.http.get<any>(_url, { params });
  }

  getAdminProfile(userId) {
    let params = new HttpParams()
      .set('userId', userId)

    let _url = environment.baseURL + "getadminprofile";
    return this.http.get<any>(_url, { params });
  }

  private _teamregister = environment.baseURL + "teamregister";
  private addAchievement = environment.baseURL + "addachieve";
  private addplayer = environment.baseURL + "addplayer";
  private removeplayer = environment.baseURL + "removeplayer";
  private createtournament = environment.baseURL + "createtournament";
  private Starttournament = environment.baseURL + "starttournament";
  private Postponetournament = environment.baseURL + "postponetournament";
  private Finishtournament = environment.baseURL + "finishtournament";
  private createFixture = environment.baseURL + "registerfixture";
  private addFixturePlayer = environment.baseURL + "addfixtureplayer";
  private removeFixturePlayer = environment.baseURL + "removefixtureplayer";
  private startfixture = environment.baseURL + "startfixture";
  private _coachregister = environment.baseURL + "coachregister";
  private _createplayer = environment.baseURL + "createplayer";

  registerteam(user) {
    return this.http.post<any>(this._teamregister, user)
  }

  editTeam(user,teamid) {
    let _url = environment.baseURL + "editteam";
    let params = new HttpParams()
      .set('teamid', teamid)
    return this.http.post<any>(_url, user, { params })
  }

  AddSession(user,teamid) {
    let _url = environment.baseURL + "addsession";
    let params = new HttpParams()
      .set('teamid', teamid)
    return this.http.post<any>(_url, user, { params })
  }

  AddSessionDescript(user,teamid,sessionId) {
    let _url = environment.baseURL + "addsessiondescrip";
    let params = new HttpParams()
      .set('teamid', teamid)
      .set('sessionId', sessionId)
    return this.http.post<any>(_url, user, { params })
  }

  FinishSession(user,sessionId) {
    let _url = environment.baseURL + "finishsession";
    let params = new HttpParams()
      .set('sessionId', sessionId)
    return this.http.post<any>(_url, user, { params })
  }

  AddSessionPlayers(user,sessionId,userId) {
    let _url = environment.baseURL + "addsessionplayers";
    let params = new HttpParams()
      .set('sessionId', sessionId)
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  SetParticipated(user,sessionPlayerId) {
    let _url = environment.baseURL + "setparticipated";
    let params = new HttpParams()
      .set('sessionPlayerId', sessionPlayerId)
    return this.http.post<any>(_url, user, { params })
  }

  SetNotParticipated(user,sessionPlayerId) {
    let _url = environment.baseURL + "setnotparticipated";
    let params = new HttpParams()
      .set('sessionPlayerId', sessionPlayerId)
    return this.http.post<any>(_url, user, { params })
  }

  addAchieve(user, teamId) {
    let params = new HttpParams()
      .set('teamId', teamId)
    return this.http.post<any>(this.addAchievement, user, { params })
  }

  deleteAchieve(achieveId) {
    let _url = environment.baseURL + "deleteachieve/";
    return this.http.delete<any>(_url + achieveId )
  }

  addplayerteam(user, teamId, playerId) {
    let params = new HttpParams()
      .set('teamId', teamId)
      .set('playerId', playerId)
    return this.http.post<any>(this.addplayer, user, { params })
  }

  removeplayerteam(user, teamId, playerId) {
    let params = new HttpParams()
      .set('teamId', teamId)
      .set('playerId', playerId)
    return this.http.post<any>(this.removeplayer, user, { params })
  }

  addtournament(user) {
    return this.http.post<any>(this.createtournament, user)
  }

  removeinstitute(instituteId,tournamentId) {
    let _url = environment.baseURL + "removeinstitute/";
    return this.http.delete<any>(_url + instituteId+"/"+tournamentId )
  }

  starttournament(tournementId) {
    let params = new HttpParams()
      .set('tournementId', tournementId)
    return this.http.post<any>(this.Starttournament, tournementId, { params })
  }

  finishtournament(tournementId) {
    let params = new HttpParams()
      .set('tournementId', tournementId)
    return this.http.post<any>(this.Finishtournament, tournementId, { params })
  }

  postponetournament(tournementId) {
    let params = new HttpParams()
      .set('tournementId', tournementId)
    return this.http.post<any>(this.Postponetournament, tournementId, { params })
  }

  registerFixture(user, tournementId) {
    let params = new HttpParams()
      .set('tournementId', tournementId)
    return this.http.post<any>(this.createFixture, user, { params })
  }

  editFixture(user, fixtureId) {
    let _url = environment.baseURL + "editfixture";
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
    return this.http.post<any>(_url, user, { params })
  }

  editProfile(user, userId) {
    let _url = environment.baseURL + "editadminprofile";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

  addPlayerFixture(user, fixtureId, userId) {
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
      .set('userId', userId)
    return this.http.post<any>(this.addFixturePlayer, user, { params })
  }

  removePlayerFixture(user, fixtureId, userId) {
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
      .set('userId', userId)
    return this.http.post<any>(this.removeFixturePlayer, user, { params })
  }

  startFixture(user, fixtureId) {
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
    return this.http.post<any>(this.startfixture, user, { params })
  }

  PostponeFixture(user, fixtureId) {
    let _url1 = environment.baseURL + "postponefixture";
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
    return this.http.post<any>(_url1, user, { params })
  }

  deleteFixture(fixtureId) {
    let _url = environment.baseURL + "deletefixture/";
    return this.http.delete<any>(_url + fixtureId )
  }

  finishFixture(user, fixtureId, wonteam, wonscore, lossteam, lossscore) {
    let _url = environment.baseURL + "finishfixture";
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
      .set('wonteam', wonteam)
      .set('wonscore', wonscore)
      .set('lossteam', lossteam)
      .set('lossscore', lossscore)
    return this.http.post<any>(_url, user, { params })
  }

  changePlayerScore(user, fixtureId, currentUserId, tournamentTeamId) {
    let _url = environment.baseURL + "addplayerscore";
    let params = new HttpParams()
      .set('fixtureId', fixtureId)
      .set('currentUserId', currentUserId)
      .set('tournamentTeamId', tournamentTeamId)
    return this.http.post<any>(_url, user, { params })
  }

  updateExtra(user, extras, fixtureId, tournamentTeamId) {
    let _url = environment.baseURL + "updateextra";
    let params = new HttpParams()
      .set('extras', extras)
      .set('fixtureId', fixtureId)
      .set('tournamentTeamId', tournamentTeamId)
    return this.http.post<any>(_url, user, { params })
  }

  updateDescript(user, description, fixtureId, tournamentTeamId) {
    let _url = environment.baseURL + "updatedescript";
    let params = new HttpParams()
      .set('description', description)
      .set('fixtureId', fixtureId)
      .set('tournamentTeamId', tournamentTeamId)
    return this.http.post<any>(_url, user, { params })
  }

  JoinTournament(user, tournementId) {
    let _url = environment.baseURL + "jointournament";
    let params = new HttpParams()
      .set('tournementId', tournementId)
    return this.http.post<any>(_url, user, { params })
  }

  saveMessage(user) {
    let _url = environment.baseURL + "savemessage";
    return this.http.post<any>(_url, user)
  }

  coachregister(user) {
    return this.http.post<any>(this._coachregister, user)
  }

  createplayer(user) {
    return this.http.post<any>(this._createplayer, user)
  }

  changePassword(user, userId) {
    let _url= environment.baseURL+"changePassword";
    let params = new HttpParams()
      .set('userId', userId)
    return this.http.post<any>(_url, user, { params })
  }

}
