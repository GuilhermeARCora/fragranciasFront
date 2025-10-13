import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent implements OnInit {

  @Input() imgUrl: string = ('');
  @Input() titleCategory: string = ('Teste')
  @Input() thick:boolean = false;
  @Input() tall:boolean = false;

  router = inject(Router);

  route: string = '';

  ngOnInit(): void {
    this.defineRoute();
  };

  defineRoute(): void{

    let lastSlash = this.imgUrl.lastIndexOf('/');
    let dot = this.imgUrl.indexOf('.');

    let categoria = this.imgUrl.slice(lastSlash+1, dot);

    this.route = `/categoria/${categoria}`;
  };

};
