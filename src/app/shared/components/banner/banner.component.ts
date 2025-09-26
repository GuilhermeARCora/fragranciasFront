import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BannerService } from '../../../core/services/banner/banner.service';
@Component({
  selector: 'app-banner',
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{

  bannerService = inject(BannerService);
  @Input({required:true}) name!: string;

  imgUrlSm!:string;
  imgUrlMd!:string;
  imgUrlLg!:string;

  ngOnInit(): void {
    this.setImages(this.name);
  };

  setImages(name: string): void {
    this.imgUrlSm = this.bannerService.getBanner(name, 'sm', 'webp'); // 330px altura, 400px largura
    this.imgUrlMd = this.bannerService.getBanner(name, 'md', 'webp'); // 600px altura, 800px largura
    this.imgUrlLg = this.bannerService.getBanner(name, 'lg', 'webp'); // 300px altura, 1200px largura
  };


};
