import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.scss'],
})
export class ChooseLocationComponent implements OnInit {
  center = { lat: 35.758419, lng: 51.404115 };
  markerPosition = { lat: 35.758419, lng: 51.404115 };
  markerOptions = { draggable: true };
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() { }
  dismiss() {
    console.log(this.markerPosition);

    this.modalCtrl.dismiss(this.markerPosition

    );
  }

}
