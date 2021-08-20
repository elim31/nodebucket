/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 19 Aug 2021
 * Title: signin.component.ts
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient){}

  /** To validate that empId is numbers in the form */

  ngOnInit(): void
  {
      this.form = this.fb.group({
    empId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  })
}

/** the login portion  to return a value from the employees api. If empId is correct to take user to homepage. Otherwise show error message. */
login(): void
{
  const empId = this.form.controls['empId'].value;

  this.http.get('/api/employees/' + empId).subscribe(res=> {
    if (res)
    {
      this.cookieService.set('session_user', empId, 1);
      this.router.navigate(['/']);
    }
    else
    {
      this.error = 'The employeeId you entered is not valid, please try again.';
    }

   })
  }

}
