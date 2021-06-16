import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { AdminService } from '../../../admin.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-finishedtour',
  templateUrl: './finishedtour.component.html',
  styleUrls: ['./finishedtour.component.scss']
})
export class FinishedtourComponent implements OnInit {

  tournamentId: number;
  private sub: any;

  constructor(private location: Location,private route: ActivatedRoute, private _adminservice: AdminService, private router: Router) { }

  public Tournament = [];
  public FinishedFixtures = [];
  public Summery = [];
  public PointTable = [];
  public Structures = [];
  public InstituteInfo = [];

  wininstitute: string
  serachFixture
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

        if (this.Summery[0]?.point > this.Summery[1]?.point) {
          this.wininstitute = this.Summery[0]?.instituteName
        } else {
          this.wininstitute = this.Summery[1]?.instituteName
        }

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
        this.selectedstructure=this.Structures[0].strutureId[0]
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
