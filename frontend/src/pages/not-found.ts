import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-not-found')
export class PageNotFound extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`<div class="text-red-600">404 - Halaman tidak ditemukan</div>`;
  }
}
