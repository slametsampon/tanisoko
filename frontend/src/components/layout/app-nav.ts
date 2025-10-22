// frontend/src/components/layout/app-nav.ts

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('app-nav')
export class AppNav extends LitElement {
  @property({ type: String }) currentPath = '/';
  @state() private menuOpen = false;
  @state() private produksiOpen = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleOutsideClick);
    super.disconnectedCallback();
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    // jika klik di luar komponen app-nav → tutup submenu
    if (!this.contains(target)) {
      this.produksiOpen = false;
    }
  };

  private isActive(path: string): string {
    return this.currentPath.endsWith(path)
      ? 'bg-green-300 text-green-900 rounded px-2 py-1'
      : 'hover:bg-green-200 rounded px-2 py-1';
  }

  private _navigate(e: Event) {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    const path = target.getAttribute('href');
    this.menuOpen = false; // close menu after click
    this.produksiOpen = false; // ⬅ tutup dropdown setelah klik
    if (path && path !== this.currentPath) {
      this.dispatchEvent(
        new CustomEvent('nav-changed', {
          detail: { path },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  render() {
    return html`
      <header class=" text-green-900 font-medium">
        <div
          class="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center"
        >
          <a href="/" @click=${this._navigate} class=${this.isActive('')}>
            <img
              src="./assets/logo-88x45.png"
              alt="Logo"
              class="rounded-xl h-[30px]"
            />
          </a>
          <!-- Hamburger for small screens -->
          <button
            @click=${this.toggleMenu}
            class="md:hidden text-2xl focus:outline-none"
          >
            ☰
          </button>
          <!-- Desktop Nav -->
          <nav class="hidden md:flex gap-4">${this.renderLinks()}</nav>
        </div>
        <!-- Mobile Nav -->
        ${this.menuOpen
          ? html`
              <nav class="flex flex-col md:hidden gap-2 px-4 pb-4">
                ${this.renderLinks()}
              </nav>
            `
          : ''}
      </header>
    `;
  }

  private renderLinks() {
    return html`
      <a
        href="/dashboard"
        @click=${this._navigate}
        class=${this.isActive('dashboard')}
        >📊 Dashboard</a
      >
      <a
        href="/config"
        @click=${this._navigate}
        class=${this.isActive('config')}
        >⚙️ Konfigurasi</a
      >
    `;
  }
}
