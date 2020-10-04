import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  profileRoute = 'Questions'
  constructor(private configService: ConfigService, private http: HttpClient) { }

  getDailyQuestions() {
    return this.http.get(`${this.configService.root}/${this.profileRoute}`)
  }
  

  
  
}
