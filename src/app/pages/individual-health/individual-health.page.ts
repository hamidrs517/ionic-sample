import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Question } from 'src/app/interfaces/question';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionService } from 'src/app/services/question.service';
@Component({
  selector: 'app-individual-health',
  templateUrl: './individual-health.page.html',
  styleUrls: ['./individual-health.page.scss'],
})
export class IndividualHealthPage implements OnInit {

  constructor(
    private qstService: QuestionService,
    private ansService:AnswerService
    ) {

  }

  last14DaysAnswers = []
  dailyQuestions:Question[] = []


  chart: Chart;

  ngOnInit() {
    this.init();
    this.qstService.getDailyQuestions().subscribe(res => {
      this.dailyQuestions = res as Question[]
      
      this.ansService.getLast14DaysAnswers().subscribe(res=>{
        this.last14DaysAnswers=res as any[];
      });

    })
  }

  addPoint() {
    if (this.chart) {
      this.chart.addPoint(Math.floor(Math.random() * 10));
    } else {
      alert('init chart, first!');
    }
  }

  addSerie() {
    this.chart.addSeries({
      type: 'line',
      name: 'Line ' + Math.floor(Math.random() * 10),
      data: [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    }, true, true);
  }

  removePoint() {
    this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
    this.chart.removeSeries(this.chart.ref.series.length - 1);
  }

  init() {
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Linechart'
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'line',
        name: 'Line 1',
        data: [1, 2, 3]
      }]
    });
    chart.addPoint(4);
    this.chart = chart;
    chart.addPoint(5);
    setTimeout(() => {
      chart.addPoint(6);
    }, 2000);

    chart.ref$.subscribe(console.log);
  }

}
