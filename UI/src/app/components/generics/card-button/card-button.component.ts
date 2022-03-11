import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent {
  @Input() title = '';

  @Input() icon: string = '';
  @Input() color: 'primary' | 'accent' | 'warn' | 'brown' = 'accent';

  // @Output() click: EventEmitter<void> = new EventEmitter<void>();

  getBackgroundColor(): string {
    return `var(--color-${this.color}-lighter)`;
  }

  getHoverBackgroundColor(): string {
    return `var(--color-${this.color}-50)`;
  }
}
