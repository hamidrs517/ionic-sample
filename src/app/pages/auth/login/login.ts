import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { Subject } from 'rxjs';
import { Errors } from 'src/app/interfaces/errors';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject();
  authType: string = '';
  title: string = '';
  errors: Errors = { errors: {} };
  isSubmitting = false;
  loginForm: FormGroup;


  get email(): string {
    return this.loginForm.get('email').value;
  }

  get password(): string {
    return this.loginForm.get('password').value;
  }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {
    // this.route.url.subscribe(data => {
    //   // console.warn(data)
    //   // // Get the last piece of the URL (it's either 'login' or 'register')
    //   // this.authType = data[data.length - 1].path;
    //   // // // Set a title for the page accordingly
    //   // // this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    //   // // add form control for username if this is the register page
    //   // if (this.authType === 'register') {
    //   //   // this.authForm.addControl('username', new FormControl());
    //   //   this.onSignup()
    //   // }
    // });
    this.createForm()
  }

  onLogin() {
    console.warn(this.loginForm)

    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errors = { errors: {} };
      const credentials = this.loginForm.value;

      // for test
      this.authService.loggedIn.next(true)
      this.router.navigate(['/dashboard'])
    }

  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
