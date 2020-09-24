import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  file
  token = localStorage.getItem('token')
  title = ''
  url: string = `${environment.api_url}/upload`
  percent = "0";
  value = 0

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {
  }


  ngOnInit() {

  }

  resetData() {
    this.fileInput.nativeElement.value = ""
    this.file = undefined
    this.title = ''
    this.percent = '0'
    this.value = 0
  }

  upload() {

    this.uploadFile(this.url, [], this.file)
  }

  fileChangeEvent(event: any) {
    this.file = event.target.files[0];
  }


  uploadFile(url: string, params: Array<string>, files: Array<File>) {
    // const img = files[0];
    const formData = new FormData();
    formData.append('file', this.file);
    // formData.append('title', this.title);
    const accessToken = this.token

    return this.http.post(url, formData, {
      headers: new HttpHeaders({
        // 'Authorization': `Bearer ${accessToken}`
      }),
      observe: 'events',
      reportProgress: true
    }).subscribe((event: HttpEvent<any>) => {
      console.warn("event", JSON.stringify(event))
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          // this.progress = Math.round(event.loaded / event.total * 100);
          this.percent = Math.round(event.loaded / event.total * 100) + "%";
          this.value = Math.round(event.loaded / event.total * 100)
          console.log(`Uploaded! ${this.percent}%`);
          break;
        case HttpEventType.Response:
          this.checkResult(event.body)
          console.log('File successfully created!', JSON.stringify(event.body));
        case HttpEventType.UploadProgress:
      }
    },
      err => {
        console.log("upload error:", JSON.stringify(err))
        this.value = 0
        this.percent = '0'
        this.toastService.errorToast()
      });
  }

  checkResult(res) {
    if (res && res.path) {

      this.toastService.successToast()

    } else {
      this.value = 0
      this.percent = '0'
      this.toastService.errorToast()
    }
  }

}
