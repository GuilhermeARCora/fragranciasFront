import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {

  title = inject(Title);
  meta = inject(Meta);

  updateTags(metaData: {
    title?: string;
    description?: string;
    image?: string;
    keywords?: string;
    url?: string;
  }) {
    const { title, description, image, keywords, url } = metaData;

    this.title.setTitle(title || 'Fragrâncias Decor');

    // 🔹 Meta tags básicas
    this.meta.updateTag({ name: 'description', content: description || '' });
    this.meta.updateTag({ name: 'keywords', content: keywords || '' });

    // 🔹 Open Graph (Facebook / WhatsApp)
    this.meta.updateTag({ property: 'og:title', content: title || '' });
    this.meta.updateTag({ property: 'og:description', content: description || '' });
    this.meta.updateTag({ property: 'og:image', content: image || '' });
    this.meta.updateTag({ property: 'og:url', content: url || window.location.href });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Fragrâncias Decor' });

    // 🔹 Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title || '' });
    this.meta.updateTag({ name: 'twitter:description', content: description || '' });
    this.meta.updateTag({ name: 'twitter:image', content: image || '' });
  }
}
