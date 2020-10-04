import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  gender: boolean = true
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    // private route: ActivatedRoute,
    private accountService: AccountService,
  ) { }
  user: User
  accountForm: FormGroup;
  accountId = localStorage.getItem('id') ? localStorage.getItem('id') : 1
  ngOnInit(): void {
    // this.loadData()
  }

  async loadData() {
    await this.getAccount()
    await this.createForm()
  }

  private createForm() {
    this.accountForm = this.formBuilder.group({
      age: [this.user.age, [Validators.required]],
      name: [this.user.name, [Validators.required]],
      family: [this.user.family, [Validators.required]],
      hasBloodPressure: [this.user.hasBloodPressure, [Validators.required]],
      hasDiabet: [this.user.hasDiabet],
      hasHeartDisease: [this.user.hasHeartDisease],
      hasRespiratoryDisease: [this.user.hasRespiratoryDisease],
      mobile: [this.user.mobile, [Validators.required]],
      province: [this.user.province, [Validators.required]],
      weight: [this.user.weight, [Validators.required]],
      gender: [this.user.gender, [Validators.required]],

    });
  }

  async getAccount() {
    try {
      this.user = (await this.accountService.getAccount(Number(this.accountId)).toPromise()) as User
    } catch (error) {
      console.log('error caught in getAccount')
      console.error(error);
      return throwError(error);    //Rethrow it back to component
    }
    // pipe(
    //   catchError((err) => {
    //     console.log('error caught in getAccount')
    //     console.error(err);
    //     return throwError(err);    //Rethrow it back to component
    //   })
    // ).subscribe((res: User) => {
    //   this.user = res
    // })

  }

  submit() {
    let user = {
      ...this.accountForm.value, gender: this.gender
    } as User
    this.accountService.updateAccount(user)
  }

  cityActionSheetOptions: any = {
    header: 'شهر',
    subHeader: 'شهر مورد نظر را انتخاب کنید'
  };

  provinceActionSheetOptions: any = {
    header: 'استان',
    subHeader: 'استان مورد نظر را انتخاب کنید'
  };
}
