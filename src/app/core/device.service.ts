import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {

  isMobile: () => boolean;
  isMobileLandscape: () => boolean;
  isTablet: () => boolean;
  isTabletLandscape: () => boolean;
  isDesktop: () => boolean;

  isMobile$: Observable<boolean>;
  isMobileLandscape$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isTabletLandscape$: Observable<boolean>;
  isDesktop$: Observable<boolean>;

  private deviceConf = {
    isMobile: 'HandsetPortrait',
    isMobileLandscape: 'HandsetLandscape',
    isTablet: 'TabletPortrait',
    isTabletLandscape: 'TabletLandscape',
    isDesktop: 'Web',
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {

    Object.keys(this.deviceConf).map((deviceType) => {
      const breakpoint = Breakpoints[this.deviceConf[deviceType]];
      this[deviceType] = () => {
        return this.breakpointObserver.isMatched(breakpoint);
      };
      this[deviceType + '$'] = this.breakpointObserver
          .observe([breakpoint])
          .pipe(map(result => result.matches));
    });
  }

}
