// frontend/src/pages/konfigurasi_hmi.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { modelDefinitions } from 'src/config/model-definitions';

import 'src/components/konfigurasi/sidebar-model-menu';
import 'src/components/konfigurasi/dynamic-main-content';
import './konfigurasi/model-page';

type ModelKey = keyof typeof modelDefinitions;

@customElement('page-konfigurasi')
export class PageKonfigurasi extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state()
  private isMenuOpen = false;

  @state()
  private currentModel: ModelKey | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.syncModelFromPath();
    window.addEventListener('popstate', this.syncModelFromPath);
    window.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.syncModelFromPath);
    window.removeEventListener('click', this.handleOutsideClick);
    super.disconnectedCallback();
  }

  private syncModelFromPath = () => {
    const match = window.location.pathname.match(/\/konfigurasi\/([^\/]+)/);
    const key = match?.[1];
    if (key && key in modelDefinitions) {
      this.currentModel = key as ModelKey;
    } else {
      this.currentModel = null;
    }
  };

  private handleModelSelect(e: CustomEvent) {
    const model = e.detail.model;
    history.pushState({}, '', `/konfigurasi/${model}`);
    this.currentModel = model;
    this.isMenuOpen = false;
    this.requestUpdate();
  }

  private toggleMenu(e: Event) {
    e.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (
      this.isMenuOpen &&
      !(e.target as HTMLElement).closest('#dropdownMenu') &&
      !(e.target as HTMLElement).closest('#menuToggle')
    ) {
      this.isMenuOpen = false;
    }
  };

  render() {
    return html`
      <section
        class="md:flex min-h-screen"
        @model-select=${this.handleModelSelect}
      >
        <sidebar-model-menu
          .currentModel=${this.currentModel}
        ></sidebar-model-menu>

        <div class="flex-1 p-4 bg-gray-50 min-h-screen relative">
          <!-- Hamburger for mobile -->
          <div class="md:hidden relative inline-block mb-4">
            <button
              id="menuToggle"
              class="inline-flex items-center px-3 py-2 border rounded text-green-700 border-green-700 hover:bg-green-100"
              @click=${this.toggleMenu}
            >
              ☰ Menu
            </button>

            ${this.isMenuOpen
              ? html`
                  <div
                    id="dropdownMenu"
                    class="absolute top-full left-0 bg-white border shadow-lg rounded mt-2 w-48 z-50"
                  >
                    <sidebar-model-menu
                      .currentModel=${this.currentModel}
                    ></sidebar-model-menu>
                  </div>
                `
              : null}
          </div>

          <dynamic-main-content
            .model=${this.currentModel}
          ></dynamic-main-content>
        </div>
      </section>
    `;
  }
}
