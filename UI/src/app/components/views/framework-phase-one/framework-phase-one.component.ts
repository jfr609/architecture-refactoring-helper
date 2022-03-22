import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-framework-phase-one',
  templateUrl: './framework-phase-one.component.html',
  styleUrls: ['./framework-phase-one.component.scss']
})
export class FrameworkPhaseOneComponent implements OnInit {
  imageList = [
    'assets/Phase1-UI1.jpg',
    'assets/Phase1-UI2.jpg',
    'assets/Phase1-UI3.jpg',
    'assets/Phase1-UI4.jpg',
    'assets/Phase1-UI5.jpg'
  ];

  constructor() {}

  ngOnInit(): void {}
}
