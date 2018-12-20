import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Tooltip } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { PositionService } from './position.service';

@NgModule({
  declarations: [
    AppComponent,
    Tooltip,
    TooltipDirective
  ],
  imports: [
    BrowserModule
  ],

  entryComponents: [
    Tooltip
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
