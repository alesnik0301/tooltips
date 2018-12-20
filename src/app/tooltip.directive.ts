import {Input,
  Directive,
  ViewContainerRef,
  ComponentRef,
  TemplateRef,
  ContentChild,
  ElementRef,
  OnInit,
  ComponentFactoryResolver} from '@angular/core';

import {PositionService} from './position.service';
import {Tooltip} from './tooltip/tooltip.component';
import {TooltipOptions} from './interfaces/';


import * as $ from 'jquery';

const defaultTooltipOptions: TooltipOptions = {
  position: 'top'
};

@Directive({
  selector: '[tooltip]'
})

export class TooltipDirective implements OnInit {
  @Input('tooltip') private tooltipOptions: any;
  @ContentChild('tooltipTemplate') private tooltipTemplate: TemplateRef<Object>;

  private tooltip: ComponentRef<Tooltip>;
  private tooltipId: string;

  constructor(private viewContainer: ViewContainerRef,
              public elementRef: ElementRef,
              private componentResolver: ComponentFactoryResolver,
              private position: PositionService) {
    console.log('constructor_TooltipDirective');
  }

  private get options(): TooltipOptions {
    return this.tooltipOptions || defaultTooltipOptions;
  }

  ngOnInit() {
    const element = $(this.elementRef.nativeElement);

      element.on('mouseover', () => {
          this.showTooltip();
      });

      element.on('mouseout', () => {
          this.hideTooltip();
      });
  }

  private showTooltip() {
      const ComponentFactory = this.componentResolver.resolveComponentFactory(Tooltip);
      this.tooltip = this.viewContainer.createComponent(ComponentFactory);
      console.log('this.tooltip', this.tooltip);
      this.tooltip.instance['content'] = this.getTooltipContent();
      this.tooltip.instance['parentEl'] = this.elementRef;
      this.tooltip.instance['tooltipOptions'] = this.options;
  }

  private getTooltipContent () {
    let content;

    if (this.tooltipTemplate) {
      content = this.tooltipTemplate;
    } else {
      content = this.elementRef.nativeElement.innerText;
    }

    return content;
  }

  private hideTooltip() {
    this.tooltip.destroy();
    this.tooltip = undefined;
  }
}
