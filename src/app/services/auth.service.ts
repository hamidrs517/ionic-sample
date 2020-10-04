import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authRoute = "profiles"
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(private configService: ConfigService, private http: HttpClient) { }

  login(mobile) {
    return this.http.post(`${this.configService.root}/${this.authRoute}/register?mobile=${mobile}`, {})
  }
}
