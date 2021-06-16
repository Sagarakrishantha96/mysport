import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../player.service';
import {Router} from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit {

  public Teams=[];

  constructor(private _playernService: PlayerService, private router : Router) { }

  ngOnInit(): void {

    this._playernService.getTeams()
    .subscribe((data)=>{
      this.Teams=data;
    },
    err =>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.router.navigate(['/home'])
        }
      }
    }
    );

  }

}
