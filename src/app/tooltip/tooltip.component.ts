import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnChanges} from '@angular/core';
import {PositionService} from './../position.service';
import {TooltipOptions} from './../interfaces/';

import * as $ from "jquery";

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
    $(this.elementRef.nativeElement).addClass([
      this.tooltipOptions.position]);

    const position = this.positionService.positionElements(
      this.parentEl.nativeElement,
      this.elementRef.nativeElement,
      this.tooltipOptions.position
    );

    $(this.elementRef.nativeElement).css(
      {
        top: position.top + 'px',
        left: position.left + "px",
        display: "block",
      }
    );
  }

  ngAfterViewInit(): void {
    this.position();
  }

  ngOnChanges() {
    this.position();
  }
}
