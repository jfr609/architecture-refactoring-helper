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
  @Input() showContent = true;
  @Input() smallCard = false;

  @Input() icon = '';
  @Input() color:
    | 'primary'
    | 'accent'
    | 'warn'
    | 'brown'
    | 'phase-1'
    | 'phase-2'
    | 'phase-3a'
    | 'phase-3b'
    | string = 'accent';

  backgroundColor = '';
  borderColor = '';
  textColor = '';
  backgroundColorBrightness = 0;
  acceptedThemeColors: string[] = ['primary', 'accent', 'warn', 'brown'];
  acceptedPresetColors: string[] = [
    'phase-1',
    'phase-2',
    'phase-3a',
    'phase-3b'
  ];

  ngOnInit(): void {
    this.setColors();
  }

  setColors(): void {
    if (
      this.acceptedThemeColors.some((color: string) => color === this.color)
    ) {
      this.backgroundColor = `var(--color-${this.color})`;
      this.borderColor = `var(--color-${this.color})`;
    } else if (
      this.acceptedPresetColors.some((color: string) => color === this.color)
    ) {
      this.backgroundColor = `var(--color-${this.color})`;
      this.borderColor = `var(--color-${this.color}-border)`;
    } else {
      this.backgroundColor = this.color;
      this.borderColor = this.color;
    }

    this.evaluateTextColor();
  }

  /**
   * Changes the color of the button text based on the background color brightness to white or black
   */
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

    this.backgroundColorBrightness = evaluateBrightnessBasedOnRGBA(rgba);
    this.textColor = this.backgroundColorBrightness > 125 ? 'black' : 'white';
  }
}
