import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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


  get code(): string {
    return this.verifyForm.get('code').value;
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

  onVerify() {
    console.warn("onVerify", this.verifyForm)

    if (this.verifyForm.valid) {
      this.isSubmitting = true;
      // this.errors = { errors: {} };
      const credentials = this.verifyForm.value;

      // for test
      this.authService.loggedIn.next(true)
      this.router.navigate(['/account'])
    }

  }

  private createForm() {
    this.verifyForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });
  }

}
