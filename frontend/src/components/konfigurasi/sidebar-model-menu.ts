// frontend/src/components/konfigurasi/sidebar-model-menu.ts

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { serviceMap } from 'src/services/service-map';

@customElement('sidebar-model-menu')
export class SidebarModelMenu extends LitElement {
  @property({ type: String }) currentModel: string | null = null;

  createRenderRoot() {
    return this;
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

  render() {
    return html`
      <!-- Sidebar -->
      <div class="hidden md:block border-r-2 px-4 py-6 max-w-[180px]">
        <nav class="space-y-2">${this.renderMenuItems()}</nav>
      </div>
    `;
  }
}
