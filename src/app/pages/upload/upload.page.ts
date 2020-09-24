import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
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
  // url: string = `${environment.api_url}/upload`
  url: string = `http://e19d0b7e9654.ngrok.io/api/upload`
  percent = "0";
  value = 0
  unsubscriber: Subscription
  httpEventType: HttpEventType
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

    this.unsubscriber = this.http.post(url, formData, {
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
          this.httpEventType = HttpEventType.Sent
          break;
        case HttpEventType.ResponseHeader:
          this.httpEventType = HttpEventType.ResponseHeader
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          // this.progress = Math.round(event.loaded / event.total * 100);
          this.percent = Math.round(event.loaded / event.total * 100) + "%";
          this.value = event.loaded / event.total
          console.log(`Uploaded! ${this.percent}%`);
          console.log(`value! ${this.value}%`);
          this.httpEventType = HttpEventType.UploadProgress
          break;
        case HttpEventType.Response:
          this.checkResult(event.body)
          console.log('File successfully created!', JSON.stringify(event.body));
          this.httpEventType = HttpEventType.Response
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

  cancel() {
    this.unsubscriber.unsubscribe()
    this.value = 0
    this.percent = '0'
    this.httpEventType = undefined
    this.toastService.setToast("عملیات متوقف شد")
  }
}
