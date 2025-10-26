// frontend/src/components/layout/app-main.ts

import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { AuthService, PERMS, type Role } from '../../services/auth-service';
import '../../pages/home';

@customElement('app-main')
export class AppMain extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) basePath: string = '/';
  @state() private currentPath = window.location.pathname;

  @query('#outlet') private outletEl!: HTMLElement;
  private router!: Router;

  firstUpdated() {
    this.router = new Router(this.outletEl, { baseUrl: this.basePath });

    const requireLogin = (ctx: any, commands: any) => {
      if (!AuthService.isLoggedIn()) {
        sessionStorage.setItem('next_path', ctx.pathname + (ctx.search || ''));
        return commands.redirect('/login');
      }
      return undefined;
    };

    const requireRoleAtLeast = (role: Role) => (ctx: any, commands: any) => {
      const g = requireLogin(ctx, commands);
      if (g) return g;
      if (!AuthService.hasRoleAtLeast(role))
        return commands.redirect('/not-authorized');
      return undefined;
    };

    const requirePerm = (perm: string) => (ctx: any, commands: any) => {
      const g = requireLogin(ctx, commands);
      if (g) return g;
      if (!AuthService.can(perm as any))
        return commands.redirect('/not-authorized');
      return undefined;
    };

    this.router.setRoutes([
      {
        path: '/login',
        component: 'page-login',
        action: async () => {
          await import('../../pages/login');
        },
      },
      {
        path: '/about',
        component: 'page-about',
        action: async () => {
          await import('../../pages/about');
        },
      },
      {
        path: '/not-authorized',
        component: 'page-not-authorized',
        action: async () => {
          await import('../../pages/not-authorized');
        },
      },
      {
        path: '/konfigurasi/:model',
        component: 'page-konfigurasi-model',
        action: async (ctx) => {
          console.log('[router] Route matched:', ctx.pathname);
          console.log('[router] Params:', ctx.params);
          await import('../../pages/konfigurasi/model-page');
        },
      },
      {
        path: '/konfigurasi',
        component: 'page-konfigurasi',
        action: async () => {
          await import('../../pages/konfigurasi');
        },
      },
      {
        path: '/',
        component: 'page-home',
      },
      {
        path: '(.*)',
        component: 'page-not-found',
        action: async () => {
          await import('../../pages/not-found');
        },
      },
    ]);

    window.addEventListener('popstate', this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
    super.disconnectedCallback();
  }

  private _onPopState = () => {
    this.currentPath = window.location.pathname;
    this.dispatchEvent(
      new CustomEvent('route-changed', {
        detail: { path: this.currentPath },
        bubbles: true,
        composed: true,
      })
    );
  };

  public navigate = (path: string) => {
    const full =
      this.basePath === '/'
        ? path
        : `${this.basePath}${path.replace(/^\/+/, '')}`;
    Router.go(full);
  };

  render() {
    return html`
      <main
        class="max-w-7xl mx-auto py-3 pb-16 p-layout min-h-screen bg-background dark:bg-darkbg"
      >
        <div id="outlet" class="p-4"></div>
      </main>
    `;
  }
}
