import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PhotoLibrary, AlbumItem, LibraryItem } from '@ionic-native/photo-library/ngx';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { CdvphotolibraryPipe } from 'src/app/pipes/cdvphotolibrary.pipe';
import { Image } from 'src/app/interfaces/image';

const { Camera, Filesystem, Storage, Photos } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private photoLibrary: PhotoLibrary, private cdvphotolibraryPipe: CdvphotolibraryPipe,
    private sanitizer: DomSanitizer, private platform: Platform, private fileChooser: FileChooser,
    private cd: ChangeDetectorRef) { }
  pics = []
  imgs: Image[] = []
  isItemAvailable = false
  searchedItems: Image[] = []
  albums: AlbumItem[] = []

  ngOnInit(): void {
    // this.loadAlbums()
    this.fetchPhotos()
  }


  loadAllPhotos() {
    this.photoLibrary.requestAuthorization().then(() => {

      this.photoLibrary.getLibrary((success) => {

        success['library'].map((libraryItem: LibraryItem) => {
          console.log(libraryItem.id);          // ID of the photo
          console.log("photoURL", libraryItem.photoURL);    // Cross-platform access to photo
          console.log("thumbnailURL", this.sanitizer.bypassSecurityTrustUrl(libraryItem.thumbnailURL));// Cross-platform access to thumbnail
          console.log("thumbnailURL", this.sanitizer.bypassSecurityTrustResourceUrl(libraryItem.thumbnailURL));// Cross-platform access to thumbnail
          console.log("fileName", libraryItem.fileName);
          let array = libraryItem.id.split(';')
          this.pics.push({
            url: array[1],
            albumIds: libraryItem.albumIds
          })

        })
      })
        ,
      {
        itemsInChunk: 50, // Loading large library takes time, so output can be chunked so that result callback will be called on
        chunkTimeSec: 0.5, // each X items, or after Y secons passes. You can start displaying photos immediately.
        useOriginalFileNames: false, // default, true will be much slower on iOS
        maxItems: 50, // limit the number of items to return
      }

    })
  }

  async loadAlbums() {
    this.photoLibrary.getAlbums().then(res => {
      this.albums = res
      res.forEach(al => {
        console.warn("getAlbums", al.title)
      })
    })

  }

  // filterLibrary() {
  //   this.albums.forEach(album=>{
  //     this.imgs.filter(res => res.albumIds.includes(album.id) )
  //   })
  // }


  getLibraryOfAlbum(id) {
    // return this.imgs.filter(res => res.albumIds.includes(id))
  }

  fetchPhotos() {
    this.imgs = []

    this.platform.ready().then(() => {
      this.photoLibrary.requestAuthorization().then(() => {
        this.photoLibrary.getLibrary().subscribe({
          next: (chunk) => {
            // this.pics = this.pics.concat(chunk);
            //this.library = this.library.slice(0, 9); // To take top 10 images
            // console.log(this.pics[0].thumbnailURL)

            this.cd.detectChanges();

            chunk['library'].map((libraryItem: LibraryItem) => {
              // console.log("albumIds", libraryItem.albumIds);    // Cross-platform access to photo
              // console.log("photoURL", libraryItem.photoURL);    // Cross-platform access to photo
              // console.log("thumbnailURL", this.sanitizer.bypassSecurityTrustUrl(libraryItem.thumbnailURL));// Cross-platform access to thumbnail
              // console.log("thumbnailURL", this.sanitizer.bypassSecurityTrustResourceUrl(libraryItem.thumbnailURL));// Cross-platform access to thumbnail
              // console.log("fileName", libraryItem.fileName);
              let array = libraryItem.id.split(';')
              this.imgs.push({
                url: Capacitor.convertFileSrc(`file://${array[1]}`),
                albumIds: libraryItem.albumIds,
                title: libraryItem.fileName,
                creationDate: libraryItem.creationDate
              })
              this.cd.detectChanges();

            })
          },
          error: err => { console.log(err); },
          complete: () => {
            // Library completely loaded
          }
        });
      })
    }).catch(err => console.log('permissions weren\'t granted'));
  }

  search(event) {
    // Reset items back to all of the items
    this.fetchPhotos();

    // set val to the value of the searchbar
    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.searchedItems = this.imgs.filter((item: Image) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.imgs = this.searchedItems
    } else {
      this.isItemAvailable = false;
      this.imgs = []
      this.fetchPhotos();

    }
  }

}