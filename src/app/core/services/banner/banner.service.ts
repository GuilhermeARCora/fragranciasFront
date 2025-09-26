import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  readonly basePath = '/assets/banners/';

  getBanner(name: string, size:string, format:string): string{
    // Example: banner-lg.webp, banner-md.jpg, banner-sm.webp
    return `${this.basePath}${name}-${size}.${format}`;
  };

};
