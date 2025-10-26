// frontend/src/pages/konfigurasi.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { serviceMap } from '../services/service-map';
import { modelDefinitions } from 'src/config/model-definitions';
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
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this.syncModelFromPath);
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

  private handleNavClick(model: ModelKey) {
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

  private renderMenuItems() {
    return (Object.keys(serviceMap) as ModelKey[]).map(
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
      <section class="md:flex min-h-screen">
        <!-- Sidebar -->
        <div class="hidden md:block border-r-2 px-4 py-6 max-w-[180px]">
          <nav class="space-y-2">${this.renderMenuItems()}</nav>
        </div>

        <!-- Konten -->
        <div class="flex-1 p-4 bg-gray-50 min-h-screen relative">
          <!-- Hamburger -->
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
                    <nav class="p-2 space-y-1">${this.renderMenuItems()}</nav>
                  </div>
                `
              : null}
          </div>

          <main class="bg-white rounded-xl shadow p-4">
            ${this.currentModel
              ? html`
                  <page-konfigurasi-model
                    .model=${this.currentModel}
                  ></page-konfigurasi-model>
                `
              : html`
                  <h2 class="text-xl font-semibold mb-2">📁 Konfigurasi</h2>
                  <p class="text-gray-600">
                    Pilih entitas konfigurasi dari menu.
                  </p>
                `}
          </main>
        </div>
      </section>
    `;
  }
}
