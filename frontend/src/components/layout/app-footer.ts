// frontend/src/components/layout/app-footer.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// @ts-ignore
declare const __APP_VERSION__: string;

@customElement('app-footer')
export class AppFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <footer>
        <div class="container">
          <div>
            © ${new Date().getFullYear()} TaniSoko v${__APP_VERSION__}. All
            rights reserved.
          </div>
          <div>
            <a href="https://github.com/slametsampon/tanisoko" target="_blank"
              >GitHub</a
            >
            <a href="about">About</a>
          </div>
        </div>
      </footer>
    `;
  }
}
