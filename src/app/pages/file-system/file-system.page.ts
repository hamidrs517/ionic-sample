import { Component, OnInit } from '@angular/core';
import { FileSystemService } from 'src/app/services/file-system.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-file-system',
  templateUrl: './file-system.page.html',
  styleUrls: ['./file-system.page.scss'],
})
export class FileSystemPage implements OnInit {
  txtArea: string = ''
  title: string = ''

  constructor(private fileSystemService: FileSystemService, public platform: Platform) { }

  ngOnInit() {
    !this.platform.is('hybrid')
  }

  fileWrite() {
    this.fileSystemService.fileWrite(this.title, this.txtArea)
  }

}
