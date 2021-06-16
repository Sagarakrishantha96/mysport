import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AdminService } from '../../../admin.service';
import { ViewChild } from '@angular/core';
import { Role } from '../../../_models/role';
import { AuthService } from '../../../auth.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-selectedtour',
  templateUrl: './selectedtour.component.html',
  styleUrls: ['./selectedtour.component.scss']
})
export class SelectedtourComponent implements OnInit {

  tournamentId: number;
  private sub: any;

  constructor(private location: Location,private route: ActivatedRoute, private _adminservice: AdminService, private router: Router, private _authService: AuthService) { }

  currentUser = this._authService.currentUserValue;
  public Tournament = [];
  public UpcomingFixtures = [];
  public Summery = [];
  public InstituteInfo = [];

  serachFixture;

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.tournamentId = +params['tournamentId'];
    })

    this._adminservice.getSelectededTournament(this.tournamentId)
      .subscribe((data) => {
        this.Tournament = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getUpcomingFixture(this.tournamentId)
      .subscribe((data) => {
        this.UpcomingFixtures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getaddedinstitutes(this.tournamentId)
      .subscribe((data) => {
        this.Summery = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

  }

  @ViewChild('myModalClose') modalClose;

  closeModel() {
    this.modalClose.nativeElement.click();
  }

  iscreatedadmin() {
    if (this.Tournament[0]?.userId == this.currentUser.userId) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    if (this.currentUser.RoleId == Role.Admin) {
      return true;
    } else {
      return false;
    }
  }

  removeinstitute(instituteId){
    this._adminservice.removeinstitute(instituteId,this.tournamentId)
      .subscribe(
        response => {
          this.ngOnInit();
        },
        error => console.error('Error!', error)
      );
  }
  
  @ViewChild('myModalClose2') modalClose2;

  getInfo(instituteId){
    this.modalClose2.nativeElement.click();

    this._adminservice.getInstituteInfo(instituteId)
      .subscribe((data) => {
        this.InstituteInfo = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );
  }

  back() {
    this.location.back()
  }

  checkquali(typeId){
    if(typeId=='quali' || typeId==null){
      return true
    }
  }

  checkquater(typeId){
    if(typeId=='Quarter'){
      return true
    }
  }

  checksemi(typeId){
    if(typeId=='Semi'){
      return true
    }
  }

  checkfinal(typeId){
    if(typeId=='Final'){
      return true
    }
  }

}
