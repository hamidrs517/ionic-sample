import { PlaceHealthDetailsComponent } from './../../shared-components/place-health-details/place-health-details.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Place } from 'src/app/interfaces/place';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {
  center = { lat: 35.758419, lng: 51.404115 };
  markerPosition = { lat: 35.758419, lng: 51.404115 };
  markerOptions = { draggable: false };

  place: Place = {
    id: 1,
    title: 'بانک ملی شعبه چهارباغ',
    adderss: '',
    tel: '',
    placeHistory: [
      {
        id: 1, mask: 98, airConditioning: 70, glove: 40, sanitizer: 68, socialDistanding: 85,
        _userName: 'علی',
        comment: 'متاسفانه مواد ضدعفونی به مقدار کافی وجود نداشت.',
      },
      {
        id: 1, mask: 98, airConditioning: 10, glove: 40, sanitizer: 68, socialDistanding: 85,
        _userName: 'حسین',
        comment: 'وضعیت استفاده از ماسک بسیار عالی بود و همه افراد از ماسک استفاده می کردند.'
      },
      { id: 1, mask: 98, airConditioning: 10, glove: 40, sanitizer: 68, socialDistanding: 85,
      _userName:'سارا',
      comment:'تهویه هوا واقعا بد بود.'
      },
    ]
  }

  segValue = "health";
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }
  async showUserScores() {

    const popover = await this.popoverController.create({
      component: PlaceHealthDetailsComponent,
      translucent: true
    });
    await popover.present();
  }


  getMaskAverage() {
    let tmp = 0;
    if (this.place?.placeHistory) {
      for (let i = 0; i < this.place.placeHistory?.length; i++) {
        tmp += this.place.placeHistory[i].mask;
      }
      tmp /= this.place.placeHistory.length;
      return tmp;
    }
  }

  getGloveAverage() {
    let tmp = 0;
    if (this.place?.placeHistory) {
      for (let i = 0; i < this.place.placeHistory?.length; i++) {
        tmp += this.place.placeHistory[i].glove;
      }
      tmp /= this.place.placeHistory.length;
      return tmp;
    }
  }

  getSanitizerAverage() {
    let tmp = 0;
    if (this.place?.placeHistory) {
      for (let i = 0; i < this.place.placeHistory?.length; i++) {
        tmp += this.place.placeHistory[i].sanitizer;
      }
      tmp /= this.place.placeHistory.length;
      return tmp;
    }
  }

  getAirConditioningAverage() {
    let tmp = 0;
    if (this.place?.placeHistory) {
      for (let i = 0; i < this.place.placeHistory?.length; i++) {
        tmp += this.place.placeHistory[i].airConditioning;
      }
      tmp /= this.place.placeHistory.length;
      return tmp;
    }
  }

  getSocialDistandingAverage() {
    let tmp = 0;
    if (this.place?.placeHistory) {
      for (let i = 0; i < this.place.placeHistory?.length; i++) {
        tmp += this.place.placeHistory[i].socialDistanding;
      }
      tmp /= this.place.placeHistory.length;
      return tmp;
    }
  }

  getColorBasedOnAverage(avg: number) {
    if (avg >= 80) {
      return 'success';
    }
    else if (avg >= 50) {
      return 'warning'
    }
    else {
      return 'danger'
    }

  }

  getHistoriesWithComment() {
    return this.place.placeHistory?.filter(x => x.comment);
  }
}
