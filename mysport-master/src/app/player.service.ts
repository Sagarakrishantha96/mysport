import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http:HttpClient) { }

  getParent(){
    let _url1="http://localhost:3000/parents";
    return this.http.get<any>(_url1);
  }

  getPlayer(){
    let _url2="http://localhost:3000/players";
    return this.http.get<any>(_url2);
  }

  getCoach(){
    let _url3="http://localhost:3000/coaches";
    return this.http.get<any>(_url3);
  }

  getTeams(){
    let _url4="http://localhost:3000/api/playerteams";
    return this.http.get<any>(_url4);
  }

  getUser(){
    let _userUrl="http://localhost:3000/api/user";
    return this.http.get<any>(_userUrl);
  }
}
