import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  breakpointService = inject(BreakPointService);
};
