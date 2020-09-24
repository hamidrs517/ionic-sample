import { Component, NgZone, OnInit } from '@angular/core';
import { CallbackID, Capacitor, Plugins } from '@capacitor/core';
const { Geolocation, LocalNotifications } = Plugins;

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.page.html',
  styleUrls: ['./geo-location.page.scss'],
})
export class GeoLocationPage implements OnInit {
  coordinate: any;
  watchCoordinate: any;
  watchId: CallbackID;
  notificationAlreadyReceived = false;
  originalCoords: {
    latitude: number,
    longitude: number
  } = {} as {
    latitude: number,
    longitude: number
  };
  DISTANCE_TO_MOVE = 0.001069;
  constructor(private zone: NgZone) {

  }

  ngOnInit(): void {
    this.getCurrentCoordinate(true)
  }

  async requestPermissions() {
    Geolocation.requestPermissions().then(res => {
      console.log('Perm request result: ', JSON.stringify(res));

    }).catch(err => {
      console.error('Perm request result error: ', JSON.stringify(err));
    });
  }
  getCurrentCoordinate(setToOrigin?: boolean) {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      console.log('Plugin geolocation not available');
      return;
    }
    Geolocation.getCurrentPosition().then(data => {
      console.warn("getCurrentPosition:", JSON.stringify(data))
      this.coordinate = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
        accuracy: data.coords.accuracy
      };

      if (setToOrigin) {
        this.originalCoords['latitude'] = data.coords.latitude
        this.originalCoords['longitude'] = data.coords.longitude
        console.log('setToOrigin', JSON.stringify(this.originalCoords));

      }
    }).catch(err => {
      console.error("getCurrentPosition failed:", err);
    });

    return this.coordinate
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
          this.handleMovement(this.watchCoordinate);

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

  handleMovement = coords => {
    const distanceMoved = this.getDistanceFromLatLonInKm(
      this.originalCoords.latitude,
      this.originalCoords.longitude,
      coords.latitude,
      coords.longitude
    );
    console.warn("handleMovement distanceMoved:", distanceMoved)

    if (
      distanceMoved > this.DISTANCE_TO_MOVE
      // &&
      // this.notificationAlreadyReceived === false
    ) {
      this.showNotification(distanceMoved);
    }
  };

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  async showNotification(distanceMoved?: number) {
    // LocalNotifications.schedule({
    //   text: 'distanceMoved:' + (distanceMoved ? distanceMoved : "ZERO")
    // });
    const notifs = await LocalNotifications.schedule({
      notifications: [
        {
          title: "distanceMoved",
          body: 'distanceMoved:' + (distanceMoved ? distanceMoved : "ZERO"),
          id: 1,
          // schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    console.log('scheduled notifications', notifs);
  }
}
