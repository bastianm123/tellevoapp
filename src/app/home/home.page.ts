import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alumnos=[];
  constructor(
    public alertController: AlertController,
    private loadingCtrl: LoadingController,
    private api: ServicesService
  ){}
  user:any;
  async presentToast1(){
    const alert = await this.alertController.create({
      message: "Tu viaje a sido publicado",
      buttons: ["Ok"]
    });
    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  }
  ionViewWillEnter(){
    this.getUsers();
  }
  
  getUser(userId){
    this.api.getUser(userId).subscribe((data)=>{
      console.log(data)
      this.alumnos=data;
    });
  }
  getUsers(){
    this.api.getUsers().subscribe((data)=>{
      this.alumnos=data;
    });
  }
}
