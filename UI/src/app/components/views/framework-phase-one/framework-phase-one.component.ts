import { Component } from '@angular/core';

@Component({
  selector: 'app-framework-phase-one',
  templateUrl: './framework-phase-one.component.html',
  styleUrls: ['./framework-phase-one.component.scss']
})
export class FrameworkPhaseOneComponent {
  readonly imageList = [
    'assets/Phase1-UI1.jpg',
    'assets/Phase1-UI2.jpg',
    'assets/Phase1-UI3.jpg',
    'assets/Phase1-UI4.jpg',
    'assets/Phase1-UI5.jpg'
  ];

  showInfoBool: boolean = false;

  showInfo() {
    this.showInfoBool = !this.showInfoBool;
  }

  progress(){
  }
}
