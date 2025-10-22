// components/layout/app-header.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { consume } from '@lit/context';

import './app-nav';
import '../user-info';
import { themeContext, Theme } from '../../context/theme-context';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) currentPath: string = window.location.pathname;
  @property({ type: String }) username = 'Guest';
  @property({ type: String }) avatarUrl = '';
  @property({ type: Boolean }) isLoggedIn = false;

  @consume({ context: themeContext, subscribe: true })
  theme!: Theme;

  createRenderRoot() {
    return this;
  }

  private _onNavChanged(e: CustomEvent) {
    this.dispatchEvent(
      new CustomEvent('nav-changed', {
        detail: e.detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private _forward(type: 'login-click' | 'logout-click' | 'profile-click') {
    this.dispatchEvent(
      new CustomEvent(type, { bubbles: true, composed: true })
    );
  }

  private _onToggleTheme() {
    this.dispatchEvent(
      new CustomEvent('toggle-theme', { bubbles: true, composed: true })
    );
  }

  render() {
    return html`
      <header
        class="w-full sticky top-0 z-50
             bg-white text-black
             transition-colors duration-300
             dark:bg-gray-900 dark:text-white
             shadow-sm backdrop-blur border-b"
      >
        <div class="mx-auto px-4 flex items-center justify-between gap-4 py-2">
          <app-nav
            class="flex-grow"
            .currentPath=${this.currentPath}
            @nav-changed=${this._onNavChanged}
          ></app-nav>

          <div class="flex items-center gap-3">
            <user-info
              .username=${this.username}
              .avatarUrl=${this.avatarUrl}
              .isLoggedIn=${this.isLoggedIn}
              @login-click=${() => this._forward('login-click')}
              @logout-click=${() => this._forward('logout-click')}
              @profile-click=${() => this._forward('profile-click')}
            ></user-info>

            <!-- Tombol toggle dark mode -->
            <button
              @click=${this._onToggleTheme}
              class="px-2 py-1 rounded text-sm text-white bg-accent hover:bg-opacity-80"
              title="Toggle Theme"
            >
              ${this.theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>
    `;
  }
}
