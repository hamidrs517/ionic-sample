import { Component, OnInit } from '@angular/core';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.page.html',
  styleUrls: ['./refresher.page.scss'],
  providers: [NetworkInterface]
})
export class RefresherPage implements OnInit {

  constructor(private networkInterface: NetworkInterface) {
    this.networkInterface.getWiFiIPAddress()
      .then(address => console.info(`IP: ${address.ip}, Subnet: ${address.subnet}`))
      .catch(error => console.error(`Unable to get IP: ${error}`));

    this.networkInterface.getCarrierIPAddress()
      .then(address => console.info(`IP: ${address.ip}, Subnet: ${address.subnet}`))
      .catch(error => console.error(`Unable to get IP: ${error}`));

    const url = 'www.github.com';
    this.networkInterface.getHttpProxyInformation(url)
      .then(proxy => console.info(`Type: ${proxy.type}, Host: ${proxy.host}, Port: ${proxy.port}`))
      .catch(error => console.error(`Unable to get proxy info: ${error}`));
  }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
