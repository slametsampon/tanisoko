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
      <footer
        class="w-full mt-12 border-t border-gray-300 dark:border-gray-700 bg-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-300 text-sm shadow-inner"
      >
        <div
          class="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div class="flex items-center gap-2">
            <span class="text-base">©</span>
            <span>
              ${new Date().getFullYear()} spa-template v${__APP_VERSION__} — All
              rights reserved.
            </span>
          </div>

          <div class="flex items-center gap-3">
            <a
              href="about"
              class="text-green-600 dark:text-green-400 hover:underline hover:text-green-700 dark:hover:text-green-300 transition"
              >About</a
            >
            <span class="text-gray-400">|</span>
            <a
              href="https://github.com/slametsampon/spa-template"
              target="_blank"
              rel="noopener"
              class="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition"
              >GitHub</a
            >
          </div>
        </div>
      </footer>
    `;
  }
}
