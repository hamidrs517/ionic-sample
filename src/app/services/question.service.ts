import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../interfaces/question';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  profileRoute = 'Questions'
  constructor(private configService: ConfigService, private http: HttpClient) { }

  getDailyQuestions() {
    // return this.http.get(`${this.configService.root}/${this.profileRoute}`)
    let qst: Question[] = [
      {
        id: 1,
        title: 'آیا شما دارای علائم ابتلا شامل تب و لرز ، سرفه ، خستگی مفرط ، سختی تنفس ، تنفس تند ، گلو درد و یا اسهال می باشید ؟'
      },
      {
        id: 2,
        title: 'آیا در خانواده تحت تکفل شما فردی دارای علائم ابتلا شامل تب ، لرز ، سرفه خشک ، گلو درد و یا از دست دادن حس بویایی یا چشایی میباشد ؟'
      },
      {
        id: 3,
        title: 'آیا فرد تحت درمان سرپایی ، بستری یا ترخیص شده از بیمارستان به علت بیماری کرونا در خانواده و یا نزدیکان شما وجود دارد ؟'
      },
      {
        id: 4,
        title: 'آیا خود شما به دلیل ابتلا به بیماری کرونا ویروس تحت درمان بوده اید ؟'
      }
    ];
    return qst;
  }




}
