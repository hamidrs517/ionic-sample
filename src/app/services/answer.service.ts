import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class AnswerService {


    profileRoute = 'Answers'
    constructor(private configService: ConfigService, private http: HttpClient) { }

    getLast14DaysAnswers() {
        let userId
        return this.http.get(`${this.configService.root}/${this.profileRoute}/${userId}`)
    }




}
