import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HomepageService } from '../_services/homepage.service'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../mystyles/templatemo-finance-business.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private _home: HomepageService) { }

  public Institutes = [];
  public Players = [];
  public Teams = [];
  public Coaches = [];

  ngOnInit(): void {
    this._home.getInstituteCount()
      .subscribe((data) => {
        this.Institutes = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

    this._home.getPlayerCount()
      .subscribe((data) => {
        this.Players = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

    this._home.getTeamCount()
      .subscribe((data) => {
        this.Teams = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );

    this._home.getCoachCount()
      .subscribe((data) => {
        this.Coaches = data;
      },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
            }
          }
        }
      );
  }

  sendmail = this.fb.group({
    FullName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    message: ['', [Validators.required]]
  })

  ReviewSubmit() {
    this._home.SendReview(this.sendmail.value)
      .subscribe(
        response => {
          this.ngOnInit();
          alert('Email successfully send')
          this.sendmail.reset();
        },
        error => {
          console.error('Error!', error)
        }
      )
  }

}
