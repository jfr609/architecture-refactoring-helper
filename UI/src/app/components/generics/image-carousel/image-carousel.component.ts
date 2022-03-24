import { AfterViewInit, Component, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { wait } from '../../../utils/utils';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  animations: [
    trigger('changeImage', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-out', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('300ms ease-out', style({ opacity: '0' }))
      ])
    ]),
    trigger('loading', [
      state(
        'start',
        style({
          width: '0%'
        })
      ),
      state(
        'end',
        style({
          width: '100%'
        })
      ),
      transition('start => end', [animate(5000)]),
      transition('end => start', [animate(250)])
    ])
  ]
})
export class ImageCarouselComponent implements AfterViewInit {
  @Input() images: string[] = [];
  @Input() width = '600px';

  private readonly imageChangeInterval = 5000;
  private readonly updateInterval = 100;
  progress = 0;
  carouselIndex = 0;

  ngAfterViewInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    const interval = setInterval(async () => {
      if (this.progress < this.imageChangeInterval) {
        this.progress += this.updateInterval;
      } else {
        this.onClickRight();
        clearInterval(interval);
        this.progress = 0;
        await wait(250);
        this.startTimer();
      }
    }, this.updateInterval);
  }

  onClickLeft() {
    if (this.carouselIndex > 0) {
      this.carouselIndex--;
    } else {
      this.carouselIndex = this.images.length - 1;
    }
  }

  onClickRight() {
    if (this.carouselIndex < this.images.length - 1) {
      this.carouselIndex++;
    } else {
      this.carouselIndex = 0;
    }
  }
}
