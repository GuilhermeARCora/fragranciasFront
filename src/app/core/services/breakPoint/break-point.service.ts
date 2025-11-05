import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakPointService {

  private breakpointObserver = inject(BreakpointObserver);

  // Mobile (até 959px)
  isSmall$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
    map(r => r.matches),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // Mobile (até 959px)
  isHandset$ = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small]).pipe(
    map(r => r.matches),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // Tablet (960px – 1279px)
  isTablet$ = this.breakpointObserver.observe([Breakpoints.Medium]).pipe(
    map(r => r.matches),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // Desktop (1280px+)
  isDesktop$ = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge]).pipe(
    map(r => r.matches),
    shareReplay({ bufferSize: 1, refCount: true })
  );

};
