import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Tooltip } from './tooltip/components/tooltip.component';
import { TooltipDirective } from './tooltip/directives/tooltip.directive';
import { PositionService } from './tooltip/services/position.service';
import {TooltipModule} from './tooltip';

@NgModule({
  declarations: [
    AppComponent,
    Tooltip,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    TooltipModule
  ],

  entryComponents: [
    Tooltip
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
