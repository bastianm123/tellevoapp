import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nombre = localStorage.getItem("nombre");
  user = {
    usuario: "",
    password: ""
  }
  constructor(
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private api: ServicesService
  ){}
  async presentToast1(){
    const alert = await this.alertController.create({
      message: "Tu viaje a sido publicado",
      buttons: ["Ok"]
    });
    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  }
  borrarData(){
    localStorage.clear();
  }

}
