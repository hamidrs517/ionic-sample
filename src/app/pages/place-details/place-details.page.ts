import { PlaceHealthDetailsComponent } from './../../shared-components/place-health-details/place-health-details.component';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.page.html',
  styleUrls: ['./place-details.page.scss'],
})
export class PlaceDetailsPage implements OnInit {

  segValue = "health";
  constructor(public popoverController: PopoverController) { }

  ngOnInit() {
  }
  async showUserScores() {
    console.log("ffff");

    const popover = await this.popoverController.create({
      component: PlaceHealthDetailsComponent,
      translucent: true
    });
    await popover.present();
  }

}
