import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnChanges} from '@angular/core';
import {PositionService} from './../position.service';
import {TooltipOptions} from './../interfaces/';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})

export class Tooltip implements AfterViewInit, OnChanges {
  @Input() private content: any;
  @Input() private parentEl: ElementRef;
  @Input() private tooltipOptions: TooltipOptions;

  constructor (
    private positionService: PositionService,
    public elementRef: ElementRef) {
    console.log('constructor_Tooltip');
  }

get isTooltipContentTemplate() {
  return typeof this.content === 'object' ? true : false;
}

  private position() {
    const nativeElementRef = this.elementRef.nativeElement;

    nativeElementRef.classList.add(this.tooltipOptions.position);

    const position = this.positionService.positionElements(
      this.parentEl.nativeElement,
      nativeElementRef,
      this.tooltipOptions.position
    );

    nativeElementRef.style.top = position.top + 'px';
    nativeElementRef.style.left = position.left + 'px';
    nativeElementRef.style.display = 'block';
  }

  ngAfterViewInit(): void {
    this.position();
  }

  ngOnChanges() {
    this.position();
  }
}
