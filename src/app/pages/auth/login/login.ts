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


  get mobile(): string {
    return this.loginForm.get('mobile').value;
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
    this.createForm()
  }

  onLogin() {
    console.warn(this.loginForm)

    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errors = { errors: {} };
      const credentials = this.loginForm.value;
      let success = true;
      if (success) {
        this.router.navigate(['/verify'])

      } else {
        console.error("verify error")
      }
    }

  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
    });
  }
}
