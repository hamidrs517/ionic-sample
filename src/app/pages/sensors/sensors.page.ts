import { Component, OnInit, ViewChild } from '@angular/core';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
import { IonToggle } from '@ionic/angular';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.page.html',
  styleUrls: ['./sensors.page.scss'],
})
export class SensorsPage implements OnInit {
  typeSensor = {
    "PROXIMITY": false,
    "ACCELEROMETER": false,
    "GRAVITY": false,
    "GYROSCOPE": false,
    "GYROSCOPE_UNCALIBRATED": false,
    "LINEAR_ACCELERATION": false,
    "ROTATION_VECTOR": false,
    "STEP_COUNTER": false,
    "GAME_ROTATION_VECTOR": false,
    "GEOMAGNETIC_ROTATION_VECTOR": false,
    "MAGNETIC_FIELD": false,
    "MAGNETIC_FIELD_UNCALIBRATED": false,
    "ORIENTATION": false,
    "AMBIENT_TEMPERATURE": false,
    "LIGHT": false,
    "PRESSURE": false,
    "RELATIVE_HUMIDITY": false,
    "TEMPERATURE": false,
  }
  pepperoni

  constructor(private sensors: Sensors) { }

  ngOnInit() {
    // this.sensors.enableSensor(TYPE_SENSOR.LIGHT);
  }

  async change(isActive, key, sensorToggle: IonToggle) {
    console.log(isActive, key, sensorToggle.value)



    let sensor = null
    if (isActive) {
      sensor = await this.sensors.enableSensor(key);
      console.log("sensor enabled", sensor)

      let test = await this.sensors.getState()
      console.log("getState", test)
    }
    // else {
    // sensor.disableSensor();
    // }
  }

}