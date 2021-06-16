import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AdminService } from '../../../admin.service';
import { Role } from '../../../_models/role';
import { AuthService } from '../../../auth.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-ongoingtour',
  templateUrl: './ongoingtour.component.html',
  styleUrls: ['./ongoingtour.component.scss']
})
export class OngoingtourComponent implements OnInit {

  tournamentId: number;
  private sub: any;

  constructor(private location: Location,private route: ActivatedRoute, private _adminservice: AdminService, private router: Router, private _authService: AuthService) { }

  public Tournament = [];
  public UpcomingFixtures = [];
  public StartedFixtures = [];
  public FinishedFixtures = [];
  public Summery = [];
  public PointTable = [];
  public Structures = [];
  public InstituteInfo = [];
  currentUser = this._authService.currentUserValue;

  serachFixture;
  selectedstructure

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

    this._adminservice.getOngoingFixture(this.tournamentId)
      .subscribe((data) => {
        this.StartedFixtures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getFinishedFixture(this.tournamentId)
      .subscribe((data) => {
        this.FinishedFixtures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getSummery(this.tournamentId)
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

    this._adminservice.getPointTable(this.tournamentId)
      .subscribe((data) => {
        this.PointTable = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getTourStructures(this.tournamentId)
      .subscribe((data) => {
        this.Structures = data;
        this.selectedstructure = this.Structures[0].strutureId[0]
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
