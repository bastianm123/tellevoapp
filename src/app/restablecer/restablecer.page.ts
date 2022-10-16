import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  email={
    email:""
  }
  field:string="";
  isCaptchaValid = false;
  constructor(
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  get siteKey(){
    return environment.recaptcha.siteKey;
  }

  captchaResolved(ev){
    console.log("Captcha resolved", ev);
    this.isCaptchaValid = true;
  }
  correcto(){
    if(this.validateModel(this.email)){
    this.presentAlert1()
    let navigationExtras: NavigationExtras = {
      state: {
        email: this.email
      }
    };
    this.router.navigate(['/login'] , navigationExtras );
    }else{
      this.presentToast("Falta ingresar: "+ this.field, 4500);
    }
  }
  async presentToast(msg: string,duracion?: number){
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present()
  }
  async presentAlert1(){
    const alert = await this.alertController.create({
      message: "Te enviaremos un correo de confirmacion",
      buttons: ["Ok"]
    });
    await alert.present()
    let result = await alert.onDidDismiss()
    console.log(result);
  }

  validateModel(model:any){
    for (var[key,value] of Object.entries(model)){
      if(value == ""){
        this.field = key;
        return false;
      }
    }
    return true;
  }
}
