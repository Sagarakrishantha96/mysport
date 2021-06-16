import { Component, OnInit } from '@angular/core';
import { CoachService } from '../../_services/coach.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'
import { ViewChild } from '@angular/core';
import { PasswordValidator } from '../../shared/password.validator';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-coachprofile',
  templateUrl: './coachprofile.component.html',
  styleUrls: ['./coachprofile.component.scss']
})
export class CoachprofileComponent implements OnInit {

  constructor(private location: Location, private _authService: AuthService, private fbAdmin: FormBuilder, private fb2: FormBuilder, private _coachservice: CoachService, private router: Router, private route: ActivatedRoute, private fbPlayer1: FormBuilder) { }

  userId: number
  private sub: any;

  public CoachTeams = [];
  public CoachProfile = [];

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['coachId'];
    })

    this._coachservice.getCoachTeams(this.userId)
      .subscribe((data) => {
        this.CoachTeams = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(['/home'])
            }
          }
        }
      );

    this._coachservice.getCoachProfile(this.userId)
      .subscribe((data) => {
        this.CoachProfile = data;
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

  @ViewChild('myModalClose1') modalClose1;

  close() {
    this.modalClose1.nativeElement.click();
  }

  @ViewChild('myModalClose3') modalClose3;

  close1() {
    this.modalClose3.nativeElement.click();
  }

  get password() {
    return this.registrationForm.get('password');
  }

  registrationForm = this.fb2.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.maxLength, Validators.pattern('[a-zA-Z1-9]*')]],
    confirmPassword: ['']
  }, { validator: PasswordValidator });

  onSubmit() {
    this._coachservice.changePassword(this.registrationForm.value, this.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success');
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

  get firstNameCoach() {
    return this.CoachRegistration.get('firstNameCoach');
  }
  get lastNameCoach() {
    return this.CoachRegistration.get('lastNameCoach');
  }
  get teleNoCoach() {
    return this.CoachRegistration.get('teleNoCoach');
  }

  CoachRegistration = this.fbAdmin.group({
    firstNameCoach: ['', [Validators.minLength(3)]],
    lastNameCoach: ['', [Validators.minLength(3)]],
    addressAdmin: [''],
    teleNoCoach: ['', [Validators.pattern('(07)[0-9]{8}')]]
  });

  coachSubmit() {
    this._coachservice.changeCoachProfile(this.CoachRegistration.value, this.userId)
      .subscribe(
        response => {
          this.ngOnInit();
          console.log('success', response)
        },
        error => console.error('Error!', error)
      );
  }

  deleteCoach() {
    if (confirm('Befor deleting coach make sure to assign new coach to deleting coach teams\nAre you sure to delete Coach?') == true) {
      this._coachservice.deleteCoach(this.userId)
        .subscribe(
          response => {
            this.location.back()
          },
          error => {
            console.error('Error!', error)
          }
        )

    }
  }

  checkcricket(sport) {
    if (sport == 'Cricket') {
      return true
    } else {
      false
    }
  }

  checkfootballe(sport) {
    if (sport == 'Football') {
      return true
    } else {
      false
    }
  }

  checkrugby(sport) {
    if (sport == 'Rugby') {
      return true
    } else {
      false
    }
  }

}
