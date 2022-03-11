import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent {
  @Input() title = '';

  @Input() icon = '';
  @Input() color: 'primary' | 'accent' | 'warn' | 'brown' = 'accent';

  getBackgroundColor(): string {
    return `var(--color-${this.color}-lighter)`;
  }

  getHoverBackgroundColor(): string {
    return `var(--color-${this.color}-50)`;
  }
}
