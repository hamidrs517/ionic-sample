import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';


import { Subject } from 'rxjs';
import { Errors } from 'src/app/interfaces/errors';
import { AuthService } from 'src/app/services/auth.service';
const { Storage } = Plugins


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
      // this.errors = { errors: {} };
      // const credentials = this.loginForm.value;
      this.authService.login(this.mobile).subscribe(async res => {
        if (res) {
          await Storage.set({ key: "mobile", value: this.mobile.toString() })
          this.router.navigate(['/verify'])

        } else {
          console.error("verify error", res)

        }
      },
        error => {
          console.error("verify error")

        })

    }

  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
    });
  }
}
