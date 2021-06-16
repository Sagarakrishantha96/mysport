import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Route,Router  } from '@angular/router';
@Component({
  selector: 'app-confirmemail',
  templateUrl: './confirmemail.component.html',
  styleUrls: ['./confirmemail.component.scss']
})
export class ConfirmemailComponent implements OnInit {

  sub: any;
  email: string;

  constructor(private route: ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);

        this.email = params.email;
        console.log(this.email);
        sessionStorage.setItem('email', this.email)
        this.router.navigate(['/select']);
      }
    );
  }

}
