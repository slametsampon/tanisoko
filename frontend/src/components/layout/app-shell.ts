// frontend/src/components/layout/app-shell.ts
import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { provide } from '@lit/context';

import './app-header.js';
import './app-footer.js';
import './app-main.js';

import { AuthService } from '../../services/auth-service.js';
import { themeContext, Theme } from '../../context/theme-context.js';
import { userContext } from '../../context/user-context.js';
import type { AuthUser } from '../../services/auth-service.js';

import {
  mqttContext,
  type MqttContextValue,
  createMqttContext,
} from '../../context/mqtt-context.js';

@customElement('app-shell')
export class AppShell extends LitElement {
  createRenderRoot() {
    return this;
  }

  private readonly basePath =
    window.location.hostname === '127.0.0.1' ? '/' : '/taniverse/';

  @state() private currentPath = window.location.pathname;
  @state() private theme: Theme = 'light';

  @provide({ context: themeContext })
  private providedTheme: Theme = 'light';

  @provide({ context: userContext })
  private currentUser: AuthUser | null = AuthService.getUserWithToken();

  @state()
  @provide({ context: mqttContext })
  private mqttContextValue: MqttContextValue = createMqttContext();

  @query('app-main') private appMainEl!: HTMLElement & {
    navigate: (path: string) => void;
  };

  connectedCallback() {
    super.connectedCallback();

    // Theme
    const saved = localStorage.getItem('theme') as Theme | null;
    this.theme =
      saved ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    this.providedTheme = this.theme;
    this._applyTheme();

    // Event listeners
    window.addEventListener('popstate', this._onPopState);
    window.addEventListener('auth:changed', this._onAuthChanged);
    window.addEventListener('mqtt:context-updated', this._onMqttContextUpdated);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
    window.removeEventListener('auth:changed', this._onAuthChanged);
    window.removeEventListener(
      'mqtt:context-updated',
      this._onMqttContextUpdated
    );
    super.disconnectedCallback();
  }

  private _onMqttContextUpdated = (e: Event) => {
    const detail = (e as CustomEvent<MqttContextValue>).detail;
    console.info('[app-shell] 🔄 mqttContextValue updated via event:', detail);
    this.mqttContextValue = detail;
  };

  private _toggleTheme = () => {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.providedTheme = this.theme;
    this._applyTheme();
  };

  private _applyTheme() {
    const isDark = this.theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
    document.body.classList.remove(
      'bg-white',
      'bg-gray-100',
      'text-black',
      'text-white',
      'dark:bg-gray-950'
    );
    document.body.classList.add(
      isDark ? 'bg-gray-950' : 'bg-white',
      isDark ? 'text-white' : 'text-black'
    );
    localStorage.setItem('theme', this.theme);
  }

  private _onPopState = () => {
    this.currentPath = window.location.pathname;
  };

  private _onNavigateTo = (e: CustomEvent<{ path: string }>) => {
    this.appMainEl?.navigate(e.detail.path);
  };

  private _onNavChanged = (e: CustomEvent<{ path: string }>) => {
    const rawPath = e.detail.path.replace(/^\/+/, '');
    const target = `/${rawPath}`;
    this.appMainEl?.navigate(target);
  };

  private _onLoginClick = () => {
    this.appMainEl?.navigate('/login');
  };

  private _onLogoutClick = () => {
    AuthService.logout();
    window.dispatchEvent(new Event('auth:changed'));
    this.appMainEl?.navigate('/');
  };

  private _onProfileClick = () => {
    this.appMainEl?.navigate('/dashboard');
  };

  private _onAuthChanged = () => {
    this.currentUser = AuthService.getUserWithToken();
    this.requestUpdate();
  };

  render() {
    return html`
      <app-header
        .currentPath=${this.currentPath}
        .username=${this.currentUser?.username ?? 'Guest'}
        .avatarUrl=${this.currentUser?.avatarUrl ?? ''}
        .isLoggedIn=${!!this.currentUser}
        @nav-changed=${this._onNavChanged}
        @login-click=${this._onLoginClick}
        @logout-click=${this._onLogoutClick}
        @profile-click=${this._onProfileClick}
        @toggle-theme=${this._toggleTheme}
      ></app-header>

      <app-main
        .basePath=${this.basePath}
        @route-changed=${(ev: CustomEvent<{ path: string }>) => {
          this.currentPath = ev.detail.path;
        }}
        @navigate-to=${this._onNavigateTo}
        @auth-changed=${this._onAuthChanged}
      ></app-main>

      <app-footer></app-footer>
    `;
  }
}
