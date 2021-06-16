import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import {AdminService} from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-createtournament',
  templateUrl: './createtournament.component.html',
  styleUrls: ['./createtournament.component.scss']
})
export class CreatetournamentComponent implements OnInit {

  constructor(private fbPlayer1: FormBuilder, private router: Router,
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

  CreateTournament = this.fbPlayer1.group({
    TournamentName: ['', [Validators.required]],
    Sport: ['', [Validators.required]],
    under15male: [''],
    under15female: [''],
    under17male: [''],
    under17female: [''],
    under19male: [''],
    under19female: [''],
  })
  
  TournamentSubmit() {
    this._adminservice.addtournament(this.CreateTournament.value)
      .subscribe(
        response=> {
          console.log('success',response);
          this.router.navigate(['/tournament']);
        },
        error => console.error('Error!', error)
      );
  }

  isFill(){
    if(this.CreateTournament.value.under15male=='' && this.CreateTournament.value.under15female=='' && this.CreateTournament.value.under17male==''
    && this.CreateTournament.value.under17female=='' && this.CreateTournament.value.under19male=='' && this.CreateTournament.value.under19female==''){
      return true
    }
  }

}
