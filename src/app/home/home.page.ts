import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  field: string = "";
  viaje = {
    origen:"",
    destino:"",
    precio:"",
  }
  nombre = localStorage.getItem("nombre");
  user = {
    usuario: "",
    password: ""
  }
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private api: ServicesService
  ){}
  enviarViaje(){
    if(this.validateModel(this.viaje)){
      this.presentToast1()
    }
    else {
      this.presentToast("Falta ingresar: " + this.field, 4500);
    }
  }
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present()
  }
  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }
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
