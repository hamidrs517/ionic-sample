import { Component, OnInit } from '@angular/core';
import { uniqueKey } from 'highcharts';

@Component({
  selector: 'app-set-place-point',
  templateUrl: './set-place-point.page.html',
  styleUrls: ['./set-place-point.page.scss'],
})
export class SetPlacePointPage implements OnInit {
  maskRate: number
  santRate: number
  distRate: number
  airRate: number
  constructor() { }

  ngOnInit() {
  }

  uuid() {
    // let uuid = uniqueKey();
    // return uuid
  }

  getRateOfMask(rate) {
    this.maskRate = rate
  }
  getRateOfSant(rate) {
    this.santRate = rate
  }
  getRateOfDist(rate) {
    this.distRate = rate
  }
  getRateOfAir(rate) {
    this.airRate = rate
  }

  submit() {
    let data = {
      airRate: this.airRate,
      maskRate: this.maskRate,
      santRate: this.santRate,
      distRate: this.distRate
    }

    console.warn("submit rate ", data)
  }

}
