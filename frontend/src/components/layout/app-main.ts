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

    // ==== GUARD INLINE ====
    const requireLogin = (ctx: any, commands: any) => {
      if (!AuthService.isLoggedIn()) {
        sessionStorage.setItem('next_path', ctx.pathname + (ctx.search || ''));
        return commands.redirect('/login'); // tanpa query string → hindari error router
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
    // =======================

    this.router.setRoutes([
      {
        path: '/login',
        action: async () => {
          await import('../../pages/login');
        },
        component: 'page-login',
      },
      {
        path: '/dashboard', // minimal operator
        action: async (ctx, commands) => {
          const g = requireRoleAtLeast('operator')(ctx, commands);
          if (g) return g;
          await import('../../pages/dashboard');
        },
        component: 'page-dashboard',
      },
      {
        path: '/config', // minimal engineer (admin juga boleh)
        action: async (ctx, commands) => {
          const g = requireRoleAtLeast('engineer')(ctx, commands);
          if (g) return g;
          await import('../../pages/config');
        },
        component: 'page-config',
      },
      // {
      //   path: '/control', // perlu permission spesifik operate equipment
      //   action: async (ctx, commands) => {
      //     const g = requirePerm(PERMS.OPERATE_EQUIPMENT)(ctx, commands);
      //     if (g) return g;
      //     await import('../pages/control');
      //   },
      //   component: 'page-control',
      // },
      {
        path: '/about',
        action: async () => {
          await import('../../pages/about');
        },
        component: 'page-about',
      },
      {
        path: '/not-authorized',
        action: async () => {
          await import('../../pages/not-authorized');
        },
        component: 'page-not-authorized',
      },
      { path: '/', component: 'page-home' },
      {
        path: '/produksi/hidroponik',
        action: async (ctx, commands) => {
          const g = requireRoleAtLeast('operator')(ctx, commands);
          if (g) return g;
          await import('../../pages/produksi/hidroponik');
        },
        component: 'hidroponik-page',
      },
      {
        path: '/produksi/hortikultura',
        action: async (ctx, commands) => {
          const g = requireRoleAtLeast('operator')(ctx, commands);
          if (g) return g;
          await import('../../pages/produksi/hortikultura');
        },
        component: 'hortikultura-page',
      },
      {
        path: '/produksi/akuakultur',
        action: async (ctx, commands) => {
          const g = requireRoleAtLeast('operator')(ctx, commands);
          if (g) return g;
          await import('../../pages/produksi/akuakultur');
        },
        component: 'akuakultur-page',
      },
      {
        path: '/produksi/peternakan',
        action: async (ctx, commands) => {
          const g = requireRoleAtLeast('operator')(ctx, commands);
          if (g) return g;
          await import('../../pages/produksi/peternakan');
        },
        component: 'peternakan-page',
      },
      {
        path: '(.*)',
        action: async () => {
          await import('../../pages/not-found');
        },
        component: 'page-not-found',
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
        class="max-w-7xl mx-auto px-4 py-6 pb-16 p-layout min-h-screen bg-background dark:bg-darkbg"
      >
        <div id="outlet" class="p-4"></div>
      </main>
    `;
  }
}
