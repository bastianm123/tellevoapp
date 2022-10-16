import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ServicesService } from '../services/services.service';
import { Alumno } from '../ialumnos';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correcto : boolean;
  data: any;
  alumnos: Alumno[]=[];
  alumno: Alumno;
  users: any;
  user = {
    usuario: "",
    password: ""
  }
  field: string = "";
  constructor(private router: Router, public toastController: ToastController, private loadingCtrl: LoadingController, private http: HttpClient, private api: ServicesService) {
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Ingresando...',
      duration: 2000,
    });

    loading.present();
  }
  ngOnInit() {
  }

  ingresar() {
    if (this.validateModel(this.user)) {
      this.logForm()
      console.log(this.alumno)
      if(this.correcto == true){
        this.presentToast("Bienvenido " + this.user.usuario)
        this.correcto=false;
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user
        }
      };
      this.showLoading()
      setTimeout(() => {
        console.log('sleep');
        this.router.navigate(['/home'], navigationExtras);
      }, 1900);

      }
    } else {
      this.presentToast("Falta ingresar: " + this.field, 4500);
    }
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
  async presentToast(msg: string, duracion?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duracion ? duracion : 2000
    });
    toast.present()
  }
  
  logForm() {
    this.api.getUsuarios().subscribe(resp => {
      this.alumnos.push(...resp.alumnos);
      const existe = this.alumnos.find(a => a.username === this.user.usuario && a.password === this.user.password);
      if (existe) {
        this.alumno= existe;
        this.correcto=true;
      }
      else{
        this.correcto=false;
      }
    });
  }
}
