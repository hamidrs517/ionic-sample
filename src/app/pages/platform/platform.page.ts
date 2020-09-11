import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Platforms } from '@ionic/core';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.page.html',
  styleUrls: ['./platform.page.scss'],
})
export class PlatformPage implements OnInit {

  isRTL: boolean
  isLandscape: boolean
  isPortrait: boolean
  testUserAgent: boolean
  url: string
  readySource: string
  width: number
  height: number
  platformsArray: string[]
  pause: boolean
  resume: boolean
  resize: boolean
  constructor(private platform: Platform, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getStates()
    this.getReadySource()
    this.platformsArray = this.getPlatforms()

    this.platform.pause.subscribe(async () => {
      console.log('Pause event detected');
      this.pause = true
      this.resume = false
      this.changeDetectorRef.detectChanges()

    });

    this.platform.resume.subscribe(async () => {
      console.log('Resume event detected');
      this.pause = false
      this.resume = true
      this.changeDetectorRef.detectChanges()
    });

    this.platform.resize.subscribe(async () => {
      console.log('Resize event detected');
      // this.pause = true
      this.getStates()
      this.changeDetectorRef.detectChanges()

    });
  }

  getReadySource() {
    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      // Platform now ready, execute any required native code
      this.readySource = readySource
    });
  }

  getPlatforms() {
    console.log(this.platform.platforms());
    return this.platform.platforms()
  }

  isPlatform(platform: Platforms) {
    return this.platform.is(platform)
  }


  getStates() {
    this.isLandscape = this.platform.isLandscape()
    this.isPortrait = this.platform.isPortrait()
    this.isRTL = this.platform.isRTL
    // this.testUserAgent = this.platform.testUserAgent()
    this.url = this.platform.url()
    this.width = this.platform.width()
    this.height = this.platform.height()
  }
}
