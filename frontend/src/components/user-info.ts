// frontend/src/components/user-info.ts
import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { consume } from '@lit/context';

import { userContext } from '../context/user-context';
import type { AuthUser } from '../services/auth-service';

@customElement('user-info')
export class UserInfo extends LitElement {
  @consume({ context: userContext, subscribe: true })
  private user: AuthUser | null = null;

  @state() private open = false;

  createRenderRoot() {
    return this;
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('click', this._onOutsideClick, true);
    window.addEventListener('keydown', this._onKeydown, true);
  }

  disconnectedCallback(): void {
    window.removeEventListener('click', this._onOutsideClick, true);
    window.removeEventListener('keydown', this._onKeydown, true);
    super.disconnectedCallback();
  }

  private _toggle = (e?: Event) => {
    e?.stopPropagation();
    this.open = !this.open;
  };

  private _onOutsideClick = (e: Event) => {
    if (!this.open) return;
    const path = e.composedPath();
    if (!path.includes(this)) this.open = false;
  };

  private _onKeydown = (e: KeyboardEvent) => {
    if (!this.open) return;
    if (e.key === 'Escape') this.open = false;
  };

  private _onProfile = () => {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('profile-click', { bubbles: true, composed: true })
    );
  };

  private _onLogout = () => {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('logout-click', { bubbles: true, composed: true })
    );
  };

  private _onLogin = () => {
    this.open = false;
    this.dispatchEvent(
      new CustomEvent('login-click', { bubbles: true, composed: true })
    );
  };

  render() {
    const isLoggedIn = !!this.user;
    const username = this.user?.username ?? 'Guest';
    const avatarUrl = this.user?.avatarUrl ?? '';

    const avatar = avatarUrl
      ? html`<img
          src="${avatarUrl}"
          alt="Avatar"
          class="w-8 h-8 rounded-full border"
        />`
      : html`<div
          class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm"
        >
          ?
        </div>`;

    return html`
      <div class="relative">
        <!-- Trigger -->
        <button
          class="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          @click=${this._toggle}
          aria-haspopup="menu"
          aria-expanded=${this.open ? 'true' : 'false'}
        >
          ${avatar}
          <span class="text-sm font-medium truncate max-w-[10rem]"
            >${username}</span
          >
          <svg
            class="w-4 h-4 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Dropdown -->
        ${this.open
          ? html`
              <div
                class="absolute right-0 mt-2 w-44 rounded-lg border bg-white shadow-lg overflow-hidden z-[100]"
                role="menu"
              >
                ${isLoggedIn
                  ? html`
                      <button
                        class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        @click=${this._onProfile}
                        role="menuitem"
                      >
                        <span>Detail Profil</span>
                      </button>
                      <button
                        class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        @click=${this._onLogout}
                        role="menuitem"
                      >
                        <span>Logout</span>
                      </button>
                    `
                  : html`
                      <button
                        class="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                        @click=${this._onLogin}
                        role="menuitem"
                      >
                        <span>Login</span>
                      </button>
                    `}
              </div>
            `
          : nothing}
      </div>
    `;
  }
}
