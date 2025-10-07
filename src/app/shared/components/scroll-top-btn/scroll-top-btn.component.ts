import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-scroll-top-btn',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './scroll-top-btn.component.html',
  styleUrl: './scroll-top-btn.component.scss'
})
export class ScrollTopBtnComponent {

  isVisible = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isVisible = window.scrollY > 300;
  };

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

};
