import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, CameraPhoto, CameraSource } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  private platform: Platform;

  constructor(
    platform: Platform,
    private fileChooser: FileChooser,
    private filePath: FilePath,
  ) {
    this.platform = platform;
  }

  public async loadSaved() {
    // Retrieve cached photo array data
    const photos = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photos.value) || [];

    // If running on the web...
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: FilesystemDirectory.ExternalStorage
        });

        // Web platform only: Save the photo into the base64 field
        photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  /* Use the device camera to take a photo:
  // https://capacitor.ionicframework.com/docs/apis/camera
  
  // Store the photo data into permanent file storage:
  // https://capacitor.ionicframework.com/docs/apis/filesystem
  
  // Store a reference to all photo filepaths using Storage API:
  // https://capacitor.ionicframework.com/docs/apis/storage
  */
  public async addNewToGallery() {
    // Take a photo from gallery or camera
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // file-based data; provides best performance
      source: CameraSource.Prompt, // automatically take a new photo with the camera
      quality: 100,// highest quality (0 to 100)
      saveToGallery: true
    });
    console.warn("capturedPhoto", JSON.stringify(capturedPhoto))
    //  example capturedPhoto object
    //   {
    //     "format": "jpeg",
    //       "exif": {
    //                 "ApertureValue": "169/100",
    //                 "DateTime": "2020:09:12 14:14:44",
    //                 "ExposureTime": "0.08",
    //                 "Flash": "0",
    //                 "FocalLength": "3640/1000",
    //                 "ImageLength": "4160",
    //                 "ImageWidth": "3120",
    //                 "Make": "HUAWEI",
    //                 "Model": "JKM-LX1",
    //                 "Orientation": "0",
    //                 "WhiteBalance": "0"
    //     },
    //     "path": "file:///data/user/0/io.ionic.demo.pg.cap.ng/cache/JPEG_20200912_141439_3424474639232180273.jpg",
    //     "webPath": "http://192.168.137.1:8100/_capacitor_file_/data/user/0/io.ionic.demo.pg.cap.ng/cache/JPEG_20200912_141439_3424474639232180273.jpg"
    //   }
    const savedImageFile = await this.savePicture(capturedPhoto);

    // Add new photo to Photos array
    this.photos.unshift(savedImageFile);

    // Cache all photo data for future retrieval
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: this.platform.is('hybrid')
        ? JSON.stringify(this.photos)
        : JSON.stringify(this.photos.map(p => {
          // Don't save the base64 representation of the photo data, 
          // since it's already saved on the Filesystem
          const photoCopy = { ...p };
          delete photoCopy.base64;

          return photoCopy;
        }))
    });
  }

  // Save picture to file on device
  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.ExternalStorage
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's 
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }
  }

  // Read camera photo into base64 format based on the platform the app is running on
  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      console.log("is hybrid(Cordova or Capacitor)")
      const file = await Filesystem.readFile({
        path: cameraPhoto.path // file://
      });

      return file.data;
    }
    else {
      console.log("is not hybrid(Cordova or Capacitor)")
      console.log("cameraPhoto.webPath!", cameraPhoto.webPath!)

      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Delete picture by removing it from reference data and the filesystem
  public async deletePicture(photo: Photo, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

    // delete photo file from filesystem
    const filename = photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
    await Filesystem.deleteFile({
      path: filename,
      directory: FilesystemDirectory.ExternalStorage
    });
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  ///////////////////////////////////////////////////////////////////////////////////
  choosePhoto(): string {
    let url = null
    let uri = this.getNativeUri()
    console.error("resolveNativePath1", uri)

    if (uri) {
      console.error("resolveNativePath2", uri)
      return this.resolveNativePath(uri)
    } else {
      return null
    }

  }

  getNativeUri(): string | null {
    this.fileChooser.open({ mime: "image/jpeg" })
      .then(uri => {
        console.log("getNativeUri", uri);
        return uri

      })
      .catch(e => console.log(e));

    return null

  }

  resolveNativePath(nativeUri: string): string {
    this.filePath.resolveNativePath(nativeUri).then(res => {
      console.log("resolveNativePath", res);
      return Capacitor.convertFileSrc(res);
    })
    return null
  }
}

interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
