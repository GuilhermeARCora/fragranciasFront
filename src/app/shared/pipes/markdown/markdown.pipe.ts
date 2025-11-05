import { inject, Pipe } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer } from '@angular/platform-browser';
import type { PipeTransform } from '@angular/core';
import type { SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {

  sanitizer = inject(DomSanitizer);

  transform(markdown: string): SafeHtml {
    if (!markdown) return '';

    const result = marked.parse(markdown, { breaks: true, gfm: true });
    const html = typeof result === 'string' ? result : '';

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
