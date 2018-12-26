import {
  Injectable,
  ElementRef
} from "@angular/core";

import {PositionDescription, TooltipPosition} from '../interfaces/index';

@Injectable()
export class PositionService {

  public positionElements(
    hostEl: any,
    targetEl: any,
    positionStr: string = "top"): TooltipPosition {
    const bufferDistance = 10;
    const position = this.breakPositionString(positionStr)

    let shiftWidth: {[key:string]: any} = {
      center: function () {
        return hostEl.offsetLeft + (hostEl.offsetWidth / 2) - (targetEl.offsetWidth / 2);
      },
      left: function () {
        return hostEl.offsetLeft - targetEl.offsetWidth - bufferDistance;
      },
      right: function () {
        return hostEl.offsetLeft + hostEl.offsetWidth + bufferDistance;
      }
    };

    let shiftHeight:{[key:string]: any} = {
      center: function ():number {
        return hostEl.offsetTop + (hostEl.offsetHeight / 2) - (targetEl.offsetHeight / 2);
      },
      top: function ():number {
        return hostEl.offsetTop - targetEl.offsetHeight - bufferDistance;
      },
      bottom: function ():number {
        return hostEl.offsetTop + hostEl.offsetHeight + bufferDistance;
      }
    };

    return {
      top: shiftHeight[position.vertical](),
      left: shiftWidth[position.horizontal]()
    };
  }

  private breakPositionString(positionStr: string): PositionDescription {

    if (positionStr === 'top' || positionStr === 'bottom') {
      return {
        horizontal: 'center',
        vertical: positionStr
      };
    }
    else if (positionStr === 'left' || positionStr === 'right') {
      return {
        horizontal: positionStr,
        vertical: 'center'
      };
    }
    return {
      horizontal: 'center',
      vertical: 'center'
    };
  }
}
