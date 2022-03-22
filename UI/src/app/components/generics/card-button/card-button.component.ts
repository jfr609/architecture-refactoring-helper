import { Component, Input, OnInit } from '@angular/core';
import {
  convertColorToRGBA,
  evaluateBrightnessBasedOnRGBA
} from '../../../utils/utils';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent implements OnInit {
  @Input() title = '';

  @Input() icon = '';
  @Input() color: 'primary' | 'accent' | 'warn' | 'brown' | string = 'accent';

  backgroundColor = '';
  textColor = '';
  acceptedColors: string[] = ['primary', 'accent', 'warn', 'brown'];

  ngOnInit(): void {
    if (
      this.acceptedColors.some(
        (acceptedColor: string) => acceptedColor === this.color
      )
    ) {
      this.backgroundColor = `var(--color-${this.color})`;
    } else {
      this.backgroundColor = this.color;
    }

    this.evaluateTextColor();
    console.log(this.textColor);
  }

  // Changed the color of the button text based on the background color contrast to white or black
  evaluateTextColor(): void {
    const temp_elem = document.body.appendChild(
      document.createElement('backgroundcolorholder')
    );
    temp_elem.style.color = this.backgroundColor;
    if (temp_elem.style.color === '') {
      this.textColor = 'black';
      return;
    }

    const backgroundColor = getComputedStyle(temp_elem).color;
    const rgba: number[] | undefined = convertColorToRGBA(backgroundColor);
    document.body.removeChild(temp_elem);

    if (rgba === undefined || rgba.length < 3) {
      this.textColor = 'black';
      return;
    }

    const brightness = evaluateBrightnessBasedOnRGBA(rgba);
    this.textColor = brightness > 125 ? 'black' : 'white';
  }
}
