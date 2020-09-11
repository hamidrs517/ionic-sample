import { Component } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  constructor(private fileChooser: FileChooser) { }
  test() {
    this.fileChooser.open({ mime: "image/jpeg" })
      .then(uri => console.log(uri))
      .catch(e => console.log(e));
  }

}
