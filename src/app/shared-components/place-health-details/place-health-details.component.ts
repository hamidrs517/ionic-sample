import { Component, OnInit } from '@angular/core';
import { PlaceHistory } from 'src/app/interfaces/place-history';

@Component({
  selector: 'app-place-health-details',
  templateUrl: './place-health-details.component.html',
  styleUrls: ['./place-health-details.component.scss'],
})
export class PlaceHealthDetailsComponent implements OnInit {

  history: PlaceHistory = {
    id: 1, mask: 86, sanitizer: 78, airConditioning: 88, socialDistanding: 60
  };

  constructor() { }

  ngOnInit() { }

  getAverage() {
    let tmp = 0;
    tmp += (this.history.mask + this.history.sanitizer + this.history.airConditioning + this.history.socialDistanding);
    return tmp / 4;
  }

}
