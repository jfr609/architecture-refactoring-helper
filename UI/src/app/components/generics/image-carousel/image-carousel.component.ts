import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  animations: [
    trigger('scrollAnimations', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('300ms ease-out', style({ opacity: '1' }))
      ]),
      transition(':leave', [
        style({ opacity: '1' }),
        animate('300ms ease-out', style({ opacity: '0' }))
      ])
    ])
  ]
})
export class ImageCarouselComponent implements OnInit, OnDestroy {
  @Input() images: string[] = [];
  @Input() width = '600px';

  private imageChangeInterval = 5000;
  private nextImageSub: Subscription = new Subscription();
  private progressBarSub: Subscription = new Subscription();
  progressbarValue = 0;

  carouselIndex = 0;

  ngOnInit(): void {
    this.nextImageSub = interval(this.imageChangeInterval).subscribe(() => {
      this.onClickRight();
      this.progressbarValue = 0;
    });

    this.progressBarSub = interval(this.imageChangeInterval / 10).subscribe(
      () => {
        this.progressbarValue += 10;
      }
    );
  }

  ngOnDestroy() {
    this.nextImageSub.unsubscribe();
    this.progressBarSub.unsubscribe();
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
