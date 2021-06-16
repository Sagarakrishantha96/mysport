import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { RegistrationService } from '../../registration.service'
import { Router } from '@angular/router'
import { AuthService } from './../../auth.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {

  constructor(private _auth: AuthService, private fbParent: FormBuilder, private _registrationService: RegistrationService, private router: Router) { }

  get firstNameParent() {
    return this.parentRegistration.get('firstNameParent');
  }
  get secondNameParent() {
    return this.parentRegistration.get('secondNameParent');
  }
  get teleNoParent() {
    return this.parentRegistration.get('teleNoParent');
  }

  register = {
    "userEmail": sessionStorage.getItem('email'),
    "userType": localStorage.getItem('userType')
  }

  ngOnInit(): void {
  }

  parentRegistration = this.fbParent.group({
    firstNameParent: ['', [Validators.required, Validators.minLength(3)]],
    secondNameParent: ['', [Validators.required, Validators.minLength(3)]],
    parentSelect: ['', [Validators.required]],
    AddressParent: ['', [Validators.required]],
    teleNoParent: ['', [Validators.required, Validators.pattern('(07)[0-9]{8}')]]
  })

  parentSubmit() {
    this._auth.registerUser(this.register)
      .subscribe(
        response => {
          this._auth.ParentRegister(this.parentRegistration.value)
            .subscribe(
              response => {
                console.log('success', response)
                localStorage.removeItem('userType')
                sessionStorage.removeItem('email')
                this.router.navigate(['/parentprofile']);
              },
              error => console.error('Error!', error)
            );
        },
        error => {
          console.error('Error!', error)
        }
      );
  }

}
