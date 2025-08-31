import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  imgUrl: Observable<string> = of('assets/img/banner.webp');
  isCategory = input<boolean>(false);

};
