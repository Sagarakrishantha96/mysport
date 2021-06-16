import { Component, OnInit, NgZone } from '@angular/core';
import { AdminService } from '../../../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../../auth.service';
import { SelectedtourComponent } from '../../selectedtour/selectedtour.component'
import { Location } from '@angular/common'

@Component({
  selector: 'app-createfixture',
  templateUrl: './createfixture.component.html',
  styleUrls: ['./createfixture.component.scss']
})
export class CreatefixtureComponent implements OnInit {

  constructor(private router: Router, private fbAdmin: FormBuilder, private _adminservice: AdminService,
    private _auth: AuthService, private tournament: SelectedtourComponent, private route: ActivatedRoute, private zone: NgZone,private location: Location) { }

  public Structures = [];
  public FirstTeams = [];

  tournamentId: number
  private sub: any;

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.tournamentId = +params['tournamentId'];
    })

    this._adminservice.getStructure()
      .subscribe((data) => {
        this.Structures = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._adminservice.getFixtureFirstTeam(this.tournamentId, this.CreateFixture.value.FixtureStructure)
      .subscribe((data) => {
        this.zone.run(() => {
          this.FirstTeams = data;
        })

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

  CreateFixture = this.fbAdmin.group({
    fixtureVenue: ['', [Validators.required]],
    fixtureDate: ['', [Validators.required]],
    fixtureTime: ['', [Validators.required]],
    FirstTeam: ['', [Validators.required]],
    SecondTeam: ['', [Validators.required]],
    FixtureStructure: ['', [Validators.required]],
    FixtureType:['', [Validators.required]]
  });

  FixtureSubmit() {
    this._adminservice.registerFixture(this.CreateFixture.value,this.tournamentId)
      .subscribe(
        response => {
          console.log('success', response),
          this.location.back()
        },
        error => console.error('Error!', error)
      );
  }

  back(){
    this.location.back();
  }

}
