import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHoverBackgroundColor]'
})
export class HoverBackgroundColorDirective implements OnInit {
  @Input('appHoverBackgroundColor') hoverBackgroundColor: unknown;
  originalBackgroundColor: unknown;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.originalBackgroundColor =
      this.elementRef.nativeElement.style.backgroundColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.hoverBackgroundColor
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      this.originalBackgroundColor
    );
  }
}
