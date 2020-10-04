import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.scss'],
})
export class ChooseLocationComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    
    // this.modalCtrl.dismiss({
    //   'dismissed': true
    // });
  }

}
