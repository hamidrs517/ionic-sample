import { Component, NgZone, OnInit } from '@angular/core';
import { CallbackID, Capacitor, Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.page.html',
  styleUrls: ['./geo-location.page.scss'],
})
export class GeoLocationPage implements OnInit {
  coordinate: any;
  watchCoordinate: any;
  watchId: CallbackID;
  constructor(private zone: NgZone) {

  }
  ngOnInit(): void {

  }
  async requestPermissions() {
    Geolocation.requestPermissions().then(res => {
      console.log('Perm request result: ', JSON.stringify(res));

    }).catch(err => {
      console.error('Perm request result error: ', JSON.stringify(err));
    });
  }
  getCurrentCoordinate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('Plugin geolocation not available');
      return;
    }
    Geolocation.getCurrentPosition().then(data => {
      this.coordinate = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        accuracy: data.coords.accuracy
      };
    }).catch(err => {
      console.error(err);
    });
  }

  watchPosition() {
    try {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        console.log('Watch', JSON.stringify(position));
        this.zone.run(() => {
          this.watchCoordinate = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  async clearWatch() {
    if (this.watchId != null) {
      await Geolocation.clearWatch({ id: this.watchId });
    }
  }

}
