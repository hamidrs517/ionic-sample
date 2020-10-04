import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  profileRoute = 'profiles'
  constructor(private configService: ConfigService, private http: HttpClient) { }

  getAccount(accountId: number) {
    return this.http.get(`${this.configService.root}/${this.profileRoute}/${accountId}`)
  }

  updateAccount(user: User) {
    return this.http.post(`${this.configService.root}/${this.profileRoute}/${user.id}`, user)
  }
}
