import { Component, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { File, FileEntry, IFile } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Photo } from 'src/app/interfaces/photos';
import { PhotoService } from 'src/app/services/photo.service';
const { Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  providers: [
    FileChooser,
    File,
    FilePath
  ]
})
export class Tab4Page {
  private PHOTO_STORAGE: string = "photos";

  photos: Photo[] = []
  isItemAvailable = false
  searchedItems: Photo[] = []

  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private fileChooser: FileChooser,
    private file: File,
    private filePath: FilePath,
    private cdf: ChangeDetectorRef,

  ) { }

  ngOnInit() {
    this.reloadPhotos()
  }

  chooseFile() {
    // let url = this.photoService.choosePhoto()
    // this.photos.push(url)
  }

  async reloadPhotos() {
    const photos = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photos.value) || [];
  }

  chooseFile2() {
    this.fileChooser.open({ mime: "image/jpeg" })
      .then(uri => {
        console.log(uri);

        this.filePath.resolveNativePath(uri).then(filePath => {
          console.log("res", filePath); // file://
          let convertedFileSrc = Capacitor.convertFileSrc(filePath) // http://
          // this.photos.push(convertedFileSrc);

          this.file.resolveLocalFilesystemUrl(filePath).then(fileInfo => {
            let files = fileInfo as FileEntry;
            let photo = {} as Photo;
            files.file((success: IFile) => {
              photo = { ...success, src: convertedFileSrc }
              console.log(JSON.stringify(photo))
              this.photos.push(photo);
              Storage.set({
                key: this.PHOTO_STORAGE,
                value: JSON.stringify(this.photos)
              });
              this.cdf.detectChanges()
            });
          })

        })

      })
      .catch(e => console.log(e));
  }

  async presentActionSheet(index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
          this.photos.splice(index, 1);
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  search(event) {
    // Reset items back to all of the items
    // this.reloadPhotos();

    // set val to the value of the searchbar
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.searchedItems = this.photos.filter((item: Photo) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.photos = [...this.searchedItems]
      console.warn("results", JSON.stringify(this.photos))
      console.warn("count", this.photos.length)

      // this.cdf.detectChanges()
    } else {
      this.isItemAvailable = false;
      this.photos = []
      this.reloadPhotos();

    }
  }

  public async showActionSheet(photo, position) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Delete Photo',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            // this.photoService.deletePicture(photo, position);
          }
        },
        // {
        //   text: 'Choose photo',
        //   role: 'destructive',
        //   icon: 'folder',
        //   handler: () => {
        //     this.photoService.choosePhoto();
        //   }
        // }
        , {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          }
        }]
    });
    await actionSheet.present();
  }
}
