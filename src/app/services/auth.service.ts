import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { ConfigService } from './config.service';
const { Storage } = Plugins

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authRoute = "profiles"
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  user: BehaviorSubject<User> = new BehaviorSubject<User>({} as User)
  constructor(private configService: ConfigService, private http: HttpClient) { }

  login(mobile) {
    return this.http.post(`${this.configService.root}/${this.authRoute}/register?mobile=${mobile}`, {})
  }
  verify(code, mobile) {
    return this.http.post(`${this.configService.root}/${this.authRoute}/register?mobile=${mobile}&code=${code}`, {})
  }

  async getUser() {
    let userString = (await Storage.get({ key: 'user' })).value
    if (userString) {
      return JSON.parse(userString)
    } else {
      return {} as User
    }
  }
}
