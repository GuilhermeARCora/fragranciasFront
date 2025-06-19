import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-links',
  imports: [MatIconModule,MatToolbarModule, MatListModule, CommonModule,MatRippleModule, RouterLink],
  templateUrl: './sidenav-links.component.html',
  styleUrl: './sidenav-links.component.scss'
})
export class SidenavLinksComponent {

    isMenuOpen = signal(false);

    menuVisible = signal(false);
    menuClass = signal<'slide-in' | 'slide-out'>('slide-in');

    openMenu() {
      this.menuClass.set('slide-in');
      this.menuVisible.set(true);
    };

    closeMenu() {
      this.menuClass.set('slide-out');
      setTimeout(() => this.menuVisible.set(false), 300);
    };

};
