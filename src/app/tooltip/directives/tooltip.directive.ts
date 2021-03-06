import {Input,
  Directive,
  ViewContainerRef,
  ComponentRef,
  TemplateRef,
  ContentChild,
  ElementRef,
  OnInit,
  ComponentFactoryResolver, HostListener} from '@angular/core';

import {PositionService} from '../services/position.service';
import {Tooltip} from '../components/tooltip.component';
import {TooltipOptions} from '../interfaces/index';

const defaultTooltipOptions: TooltipOptions = {
  position: 'top'
};

@Directive({
  selector: '[tooltip]'
})

export class TooltipDirective implements OnInit {
  @Input('tooltip') private tooltipOptions: any;
  @ContentChild('tooltipTemplate') private tooltipTemplate: TemplateRef<Object>;
  @HostListener('mouseover') onMouseOver() {this.showTooltip()};
  @HostListener('mouseout') onMouseOut() {this.hideTooltip()};

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
  }

  private showTooltip() {
      const ComponentFactory = this.componentResolver.resolveComponentFactory(Tooltip);
      // ViewContainerRef
      // ApplicationRef
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
