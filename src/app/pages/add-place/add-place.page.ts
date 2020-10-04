import { ChooseLocationComponent } from './../../shared-components/choose-location/choose-location.component';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.page.html',
  styleUrls: ['./add-place.page.scss'],
})
export class AddPlacePage implements OnInit {

  constructor(public modalCtrl: ModalController) {
    console.log("dddd");

  }

  ngOnInit() {
  }
  async openMap() {
    const modal = await this.modalCtrl.create({
      component: ChooseLocationComponent
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

}
