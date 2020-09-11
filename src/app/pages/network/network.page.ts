import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Network as ngxNetwork } from '@ionic-native/network/ngx';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { Plugins, NetworkStatus } from '@capacitor/core';
const { Network } = Plugins;

@Component({
  selector: 'app-network',
  templateUrl: './network.page.html',
  styleUrls: ['./network.page.scss'],

})
export class NetworkPage implements OnInit, OnDestroy {
  private destroy: Subject<void> = new Subject<void>();
  isDisconnect: boolean = false
  isConnect: boolean = false
  networkStatus: NetworkStatus = {} as NetworkStatus
  constructor(
    public network: ngxNetwork,
    private changeDetectorRef: ChangeDetectorRef,
    private platform: Platform,
    private ngZone: NgZone
  ) { }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {

    this.onChange()
    Network.addListener("networkStatusChange", (res) => {
      // this.ngZone.run(() => {
      //   // This code will run in Angular's execution context
      //   console.info("networkStatusChange", res)
      //   this.networkStatus = { ...res }

      // });
    })

    // watch network for a disconnection
    this.network.onDisconnect().pipe(
      takeUntil(this.destroy)
    ).subscribe((res) => {
      console.log('network was disconnected :-(', JSON.stringify(res));
      this.isDisconnect = true
      this.isConnect = false

      this.changeDetectorRef.detectChanges()
    });

    // stop disconnect watch
    // disconnectSubscription.unsubscribe();


    // watch network for a connection
    this.network.onConnect().pipe(
      takeUntil(this.destroy)
    ).subscribe((res) => {
      console.log('network connected!', JSON.stringify(res));
      this.isConnect = true
      this.isDisconnect = false

      this.changeDetectorRef.detectChanges()

      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // stop connect watch
    // connectSubscription.unsubscribe();

    this.network.onChange().pipe(
      takeUntil(this.destroy)
    ).subscribe((res) => {
      console.log('onChange', JSON.stringify(res));
      this.onChange()
      // this.changeDetectorRef.detectChanges()

    });

  }

  onChange() {
    // this.networkStatus = { ... await Network.getStatus() }
    Network.getStatus().then((res: NetworkStatus) => {
      console.log('NetworkStatus', JSON.stringify(res));

      this.networkStatus = { ...res }
      this.changeDetectorRef.detectChanges()

    })
  }
}
