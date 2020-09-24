import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Plugins, AppState } from '@capacitor/core';
import { MenuController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { APP_PAGES } from './app-pages';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

// import { Storage } from '@ionic/storage';
const { App, SplashScreen, Storage, AppState, BackgroundTask, Permissions } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {
  notificationAlreadyReceived = false;
  originalCoords;
  DISTANCE_TO_MOVE = 0.001069;


  appPages = APP_PAGES

  loggedIn = false;
  dark = false;
  platformName: string
  constructor(
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private statusBar: StatusBar,
    // private storage: Storage,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public backgroundMode: BackgroundMode,
    public localNotifications: LocalNotifications,
    public geolocation: Geolocation,
    // private androidPermissions: AndroidPermissions

  ) {
    this.initializeApp();
  }

  async appStateFunctions() {
    // Listen for serious plugin errors
    // App.addListener('pluginError', (info: any) => {
    //   console.error('There was a serious error with a plugin', err, info);
    // });

    let ret = await App.canOpenUrl({ url: 'com.getcapacitor.myapp' });
    console.log('Can open url: ', JSON.stringify(ret.value));

    let res = await App.openUrl({ url: 'com.getcapacitor.myapp://page?id=ionicframework' });
    console.log('Open url response: ', JSON.stringify(res));

    let launchUrl = await App.getLaunchUrl();
    if (launchUrl && launchUrl.url) {
      console.log('App opened with URL: ', JSON.stringify(launchUrl));
    }
    console.log('Launch url: ', JSON.stringify(launchUrl));

    App.addListener('appUrlOpen', (data: any) => {
      console.log('App opened with URL: ', JSON.stringify(data));
    });

    App.addListener('appRestoredResult', (data: any) => {
      console.log('Restored state:', JSON.stringify(data));
    });

    App.addListener('appStateChange', (state) => {
      // state.isActive contains the active state
      console.log('App state changed. Is active?', state.isActive);
      if (!state.isActive) {
        // The app has become inactive. We should check if we have some work left to do, and, if so,
        // execute a background task that will allow us to finish that work before the OS
        // suspends or terminates our app:

        //less than 3 min
        let taskId = BackgroundTask.beforeExit(async () => {
          // In this function We might finish an upload, let a network request
          // finish, persist some data, or perform some other task

          // Example of long task
          var start = new Date().getTime();
          for (var i = 0; i < 30; i++) {
            console.warn("i:", i)
            if ((new Date().getTime() - start) > 5000) {
              break;
            }
          }
          // Must call in order to end our task otherwise
          // we risk our app being terminated, and possibly
          // being labeled as impacting battery life
          BackgroundTask.finish({
            taskId
          });
        });
      }
    })
  }

  ngOnInit() {
    this.appStateFunctions()
    this.checkLoginStatus();
    // this.listenForLoginEvents();

    // this.swUpdate.available.subscribe(async res => {
    //   const toast = await this.toastCtrl.create({
    //     message: 'Update available!',
    //     position: 'bottom',
    //     buttons: [
    //       {
    //         role: 'cancel',
    //         text: 'Reload'
    //       }
    //     ]
    //   });

    //   await toast.present();

    //   toast
    //     .onDidDismiss()
    //     .then(() => this.swUpdate.activateUpdate())
    //     .then(() => window.location.reload());
    // });
  }

  initializeApp() {
    this.platform.ready().then((readySource) => {

      /////////////////////////////////background mode//////////////////////////////////////////
      this.backgroundMode.on('activate').subscribe(() => {
        console.log('backgroundMode activated');
        let watch = this.geolocation.watchPosition();
        watch.subscribe((data) => {
          // data can be a set of coordinates, or an error (if an error occurred).
          console.log("watchPosition:", JSON.stringify(data))
        });
        // setInterval(this.trackPosition, 5000);
        // this.trackPosition()

        if (this.notificationAlreadyReceived === false) {
          this.showNotification();
        }
      });

      this.backgroundMode.enable();

      ////////////////////////////////geolocation///////////////////////////////////////////
      this.geolocation.getCurrentPosition()
        .then(position => {
          this.originalCoords = position.coords;
        })
        .catch((error) => {
          this.localNotifications.schedule({
            id: 1,
            text: JSON.stringify(error),
            // sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
            data: { error: error }
          });
          console.log('getCurrentPosition error', JSON.stringify(error));
        })
      ///////////////////////////////////////////////////////////////////////////

      if (this.platform.is('android')) {
        this.platformName = 'android'
      } else if (this.platform.is('ios')) {
        this.platformName = 'ios'
      }
      this.statusBar.styleDefault();
      SplashScreen.hide();
    });
  }

  checkLoginStatus() {
    // for test
    this.authService.loggedIn.subscribe(isloggedIn => {
      this.loggedIn = isloggedIn
    })
    if (this.loggedIn) {
      console.warn("loggedIn", this.loggedIn)
    } else {
      this.router.navigateByUrl('/login');
    }
    // return this.userService.isLoggedIn().then(loggedIn => {
    //   return this.updateLoggedInStatus(loggedIn);
    // });

    // this.userService.populate()
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  // listenForLoginEvents() {
  //   window.addEventListener('user:login', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:signup', () => {
  //     this.updateLoggedInStatus(true);
  //   });

  //   window.addEventListener('user:logout', () => {
  //     this.updateLoggedInStatus(false);
  //   });
  // }

  logout() {
    this.authService.loggedIn.next(false)
    return this.router.navigateByUrl('/login');

  }

  openTutorial() {
    this.menu.enable(false);
    // Storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  showNotification(distanceMoved?: number) {
    this.localNotifications.schedule({
      text: 'distanceMoved:' + (distanceMoved ? distanceMoved : "ZERO")
    });

    this.notificationAlreadyReceived = true;
  }


  trackPosition = () => {
    let options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 3600 };
    // this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION
    // )
    this.geolocation
      .getCurrentPosition(options)
      .then(position => {
        console.warn("position in trackPosition", JSON.stringify(position))
        this.handleMovement(position.coords);
      })
      .catch(error => {
        console.log("trackPosition error", JSON.stringify(error));
      });
  };

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
}
