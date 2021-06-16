import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../auth.service'
import {AdminService} from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createteam',
  templateUrl: './createteam.component.html',
  styleUrls: ['./createteam.component.scss']
})
export class CreateteamComponent implements OnInit {

  constructor(private _auth: AuthService, private fbPlayer1: FormBuilder, private router: Router,
     private route: ActivatedRoute,private _adminservice: AdminService) { }

  public Coaches=[];
  public Sports=[];
  public Structures=[];

  ngOnInit(): void {
    this._adminservice.getCoaches()
    .subscribe((data)=>{
      this.Coaches=data;
    },
    err =>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.router.navigate(['/home'])
        }
      }
    }
    );

    this._adminservice.getSports()
    .subscribe((data)=>{
      this.Sports=data;
    },
    err =>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          this.router.navigate(['/home'])
        }
      }
    }
    );

    this._adminservice.getStructure()
    .subscribe((data)=>{
      this.Structures=data;
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

  CreateTeam = this.fbPlayer1.group({
    TeamName: ['', [Validators.required]],
    TeamStructure: ['', [Validators.required]],
    Sport: ['', [Validators.required]],
    Coach: ['', [Validators.required]]
  })

  TeamSubmit() {
    this._adminservice.registerteam(this.CreateTeam.value)
      .subscribe(
        response => {
          this.router.navigate(['/adminpanel']);
        },
        error => {
          console.error('Error!', error)
        }
      )
  }
}
