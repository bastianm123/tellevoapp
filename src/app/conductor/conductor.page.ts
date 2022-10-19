import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';


@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements AfterViewInit {

  anim: Animation;
  @ViewChild('square',{static: false}) square: ElementRef;
  isPlaying= false;
  constructor(private animationCtrl: AnimationController) {}
  nombre = localStorage.getItem("nombre");
  ngAfterViewInit() {
    this.anim = this.animationCtrl.create('myanim');
    this.anim
    .addElement(this.square.nativeElement)
    .duration(4000)
    .easing('ease-out')
    .iterations(Infinity)
    .fromTo('transform','translateX(0px)','translateX(300px)')
    .fromTo('opacity',1,0.2)
  }
  ionViewDidEnter(){
    this.anim.play();
  }
  borrarData(){
    localStorage.clear();
  }
}
