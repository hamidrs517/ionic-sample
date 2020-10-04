import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
const { Storage } = Plugins

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  private destroy: Subject<void> = new Subject();
  authType: string = '';
  title: string = '';
  isSubmitting = false;
  verifyForm: FormGroup;
  mobile: string

  get code(): string {
    return this.verifyForm.get('code').value;
  }

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    private authService: AuthService,
  ) {

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.getMobile()
    this.createForm()
  }

  async getMobile() {
    this.mobile = (await Storage.get({ key: 'mobile' })).value
  }

  onVerify() {
    console.warn("onVerify", this.verifyForm)

    if (this.verifyForm.valid) {
      this.isSubmitting = true;
      // this.errors = { errors: {} };
      const credentials = this.verifyForm.value;

      this.authService.login(this.mobile).subscribe(async (res: User) => {
        if (res) {
          this.authService.user.next(res)
          Storage.set({
            key: 'user',
            value: JSON.stringify(res)
          })
          this.authService.loggedIn.next(true)
          this.router.navigate(['/account'])

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
    this.verifyForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
  }

}
