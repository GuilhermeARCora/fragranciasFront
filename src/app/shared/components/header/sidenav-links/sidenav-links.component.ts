import { Component, HostListener, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidenav-links',
  imports: [MatSidenavModule,MatIconModule,MatToolbarModule, MatListModule, CommonModule],
  templateUrl: './sidenav-links.component.html',
  styleUrl: './sidenav-links.component.scss'
})
export class SidenavLinksComponent {

    isMenuOpen = signal(false);

    clickEvent(event:MouseEvent){
      this.isMenuOpen.update(v => !v);
      event.stopPropagation();
    };

    @HostListener('document:keydown.escape', ['$event'])
     onEscapeKey(event: KeyboardEvent) {
      if (this.isMenuOpen()) {
        this.isMenuOpen.update(v => !v);
        event.stopPropagation();
      };
    };

};
