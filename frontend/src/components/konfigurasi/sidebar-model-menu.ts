// frontend/src/components/konfigurasi/sidebar-model-menu.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { serviceMap } from 'src/services/service-map';

@customElement('sidebar-model-menu')
export class SidebarModelMenu extends LitElement {
  @property({ type: String }) currentModel: string | null = null;
  @property({ type: Boolean }) isMobile = false; // <-- NEW

  createRenderRoot() {
    return this;
  }

  render() {
    const baseClass = this.isMobile
      ? 'block border px-4 py-2 w-full z-50' // Mobile visible
      : 'hidden md:block border-r-2 px-4 py-6 max-w-[180px] z-50'; // Desktop only

    return html`
      <div class="${baseClass}">
        <nav class="space-y-2">${this.renderMenuItems()}</nav>
      </div>
    `;
  }

  private renderMenuItems() {
    return Object.keys(serviceMap).map(
      (key) => html`
        <button
          class="block w-full text-left p-2 rounded hover:bg-green-100 capitalize ${this
            .currentModel === key
            ? 'bg-green-200 font-semibold'
            : ''}"
          @click=${() => this.handleNavClick(key)}
        >
          🧩 ${key.replace(/_/g, ' ')}
        </button>
      `
    );
  }

  private handleNavClick(model: string) {
    this.dispatchEvent(
      new CustomEvent('model-select', {
        detail: { model },
        bubbles: true,
        composed: true,
      })
    );
  }
}
