import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding, FileReadOptions } from '@capacitor/core';
import { ToastService } from './toast.service';

const { Filesystem } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor(private toastService: ToastService) { }
  async fileWrite(title: string, txtBody: string, directory?: FilesystemDirectory) {
    try {
      const result = await Filesystem.writeFile({
        // path: 'secrets/text.txt',
        path: `secrets/${title}.txt`,
        data: txtBody,
        directory: directory ? directory : FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8,
        recursive: true,//create directory if does not exists
      })
      console.log('Wrote file', JSON.stringify(result));
      //{"uri":"file:///storage/emulated/0/Documents/secrets/test.txt"}
      // this.toastService.successToast()
      this.toastService.presentToastWithOptions()
    } catch (e) {
      this.toastService.errorToast()
      console.error('Unable to write file', e);
    }
  }

  async fileRead(path: string, directory?: FilesystemDirectory, encoding?: FilesystemEncoding) {
    // path: 'secrets/text.txt',
    // directory: FilesystemDirectory.Documents,
    // encoding: FilesystemEncoding.UTF8

    let options = {} as FileReadOptions
    if (directory) {
      options.directory = directory
    }
    if (encoding) {
      options.encoding = encoding
    }
    options.path = path
    try {
      let contents = await Filesystem.readFile(options);
      console.log(contents);
    } catch (error) {
      console.error("unable to fileRead :", error)
    }
  }

  async readFilePath(path: string) {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    try {
      let data = await Filesystem.readFile({
        // path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt'
        path: path // file://
      })
      console.log("readFilePath", JSON.stringify(data))

    } catch (e) {
      console.error(e)
    }
  }

  async fileAppend() {
    await Filesystem.appendFile({
      path: 'secrets/text.txt',
      data: "MORE TESTS",
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
  }

  async fileDelete() {
    await Filesystem.deleteFile({
      path: 'secrets/text.txt',
      directory: FilesystemDirectory.Documents
    });
  }

  async mkdir() {
    try {
      let ret = await Filesystem.mkdir({
        path: 'secrets',
        directory: FilesystemDirectory.Documents,
        recursive: false // like mkdir -p
      });
    } catch (e) {
      console.error('Unable to make directory', e);
    }
  }

  async rmdir() {
    try {
      let ret = await Filesystem.rmdir({
        path: 'secrets',
        directory: FilesystemDirectory.Documents,
        recursive: false,
      });
    } catch (e) {
      console.error('Unable to remove directory', e);
    }
  }

  async readdir(path: string) {
    try {
      let ret = await Filesystem.readdir({
        // path: 'secrets',
        path: path,
        directory: FilesystemDirectory.Documents
      });
      console.log("readdir", JSON.stringify(ret))
    } catch (e) {
      console.error('Unable to read dir', e);
    }
  }

  async stat(path: string) {
    try {
      let ret = await Filesystem.stat({
        // path: 'secrets/text.txt',
        path: path,
        directory: FilesystemDirectory.Documents
      });
      console.log("stat", JSON.stringify(ret))

    } catch (e) {
      console.error('Unable to stat file', e);
    }
  }

  async rename() {
    try {
      // This example moves the file within the same 'directory'
      let ret = await Filesystem.rename({
        from: 'text.txt',
        to: 'text2.txt',
        directory: FilesystemDirectory.Documents
      });
    } catch (e) {
      console.error('Unable to rename file', e);
    }
  }

  async copy() {
    try {
      // This example copies a file within the documents directory
      let ret = await Filesystem.copy({
        from: 'text.txt',
        to: 'text2.txt',
        directory: FilesystemDirectory.Documents
      });
    } catch (e) {
      console.error('Unable to copy file', e);
    }
  }
}
