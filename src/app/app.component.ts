import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MenuController, ToastController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
// import { Storage } from '@ionic/storage';
const { SplashScreen, Storage } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'تب ها',
      url: '/dashboard',
      icon: 'calendar',
      loggedIn: true,
    },
    {
      title: 'تابلو',
      url: '/board',
      icon: 'laptop',
      loggedIn: true,
    },
    {
      title: 'refresher',
      url: '/refresher',
      icon: 'help-circle',
      loggedIn: true,
    },
    {
      title: 'network',
      url: '/network',
      icon: 'earth',
      loggedIn: true,
    },
    {
      title: 'platform',
      url: '/platform',
      icon: 'file-tray',
      loggedIn: false,
    },
    {
      title: 'file-system',
      url: '/file-system',
      icon: 'file-tray',
      loggedIn: false,
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'people',
      loggedIn: true,
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map',
      loggedIn: true,
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle',
      loggedIn: true,
    }
  ];
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
  ) {
    this.initializeApp();
  }

  ngOnInit() {
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
}
