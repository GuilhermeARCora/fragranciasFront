import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import type { OnInit } from '@angular/core';

@Component({
  selector: 'app-category-card',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent implements OnInit {

  @Input() imgUrl: string = ('');
  @Input() titleCategory: string = ('Teste');
  @Input() thick:boolean = false;
  @Input() tall:boolean = false;

  router = inject(Router);

  route: string = '';

  ngOnInit(): void {
    this.defineRoute();
  };

  defineRoute(): void{

    const lastSlash = this.imgUrl.lastIndexOf('/');
    const dot = this.imgUrl.indexOf('.');

    const categoria = this.imgUrl.slice(lastSlash+1, dot);

    this.route = `/categoria/${categoria}`;
  };

};
