// frontend/src/components/konfigurasi/sidebar-menu-mobile.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { serviceMap } from 'src/services/service-map';

@customElement('sidebar-menu-mobile')
export class SidebarMenuMobile extends LitElement {
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

  render() {
    return html`
      <div class="block md:hidden px-2 py-2 w-full">
        <nav class="space-y-2">
          ${Object.keys(serviceMap).map(
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
          )}
        </nav>
      </div>
    `;
  }
}
