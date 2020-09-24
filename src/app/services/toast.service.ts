import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'مو فقیت آمیز',
      message: 'عملیات با موفقیت انجام شد',
      position: 'bottom',
      buttons: [
        // {
        //   side: 'start',
        //   icon: 'star',
        //   text: 'Favorite',
        //   handler: () => {
        //     console.log('Favorite clicked');
        //   }
        // }, 
        {
          side: 'end',
          icon: 'star',
          text: 'بستن',
          role: 'cancel',
          cssClass: ['success-opration'],
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  async successToast() {
    const toast = await this.toastController.create({
      message: 'عملیات با موفقیت انجام شد',
      duration: 2000
    });
    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'عملیات با خطا رو به رو شد',
      duration: 2000
    });
    toast.present();
  }

  async setToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
