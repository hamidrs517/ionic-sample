import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';





@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // this.userService.signup(this.signup.username);
      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
}
