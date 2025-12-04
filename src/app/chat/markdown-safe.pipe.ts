import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'mdsafe' })
export class MdSafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeHtml {
    if (!value) return '';

    // Escape HTML first
    let s = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // **bold**
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // *italic* (single-asterisk only)
    s = s.replace(/(^|[^\*])\*(?!\*)(.+?)\*(?!\*)/g, (_m, pre, inner) => `${pre}<em>${inner}</em>`);

    // Lists + line breaks
    const lines = s.split(/\r?\n/);
    let html = '';
    let inList = false;
    for (const line of lines) {
      const m = line.match(/^\s*[-•]\s+(.*)/);
      if (m) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${m[1]}</li>`;
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        html += line + '<br>';
      }
    }
    if (inList) html += '</ul>';

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
