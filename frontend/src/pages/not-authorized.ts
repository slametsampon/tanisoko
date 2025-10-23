import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AuthService } from '../services/auth-service';

@customElement('page-not-authorized')
export class PageNotAuthorized extends LitElement {
  createRenderRoot() {
    return this;
  } // pakai Tailwind global

  connectedCallback() {
    super.connectedCallback();
    // Jika belum login, arahkan ke login (dengan next)
    if (!AuthService.isLoggedIn()) {
      sessionStorage.setItem('next_path', location.pathname + location.search);
      location.href = '/login';
    }
  }

  private onHome = () => {
    location.href = '/';
  };

  private onSwitchAccount = () => {
    AuthService.logout();
    sessionStorage.setItem('next_path', '/'); // setelah login, balik ke home
    location.href = '/login';
  };

  render() {
    // Kalau render ini jalan, berarti user sudah login tapi role tidak cukup
    return html`
      <!-- Background -->
      <section
        class="relative min-h-[80vh] flex items-center justify-center overflow-hidden
               bg-gradient-to-br from-emerald-50 via-white to-sky-50
               dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <!-- Dekorasi blob -->
        <div
          class="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full
                    bg-emerald-300/30 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full
                    bg-sky-300/30 blur-3xl"
        ></div>

        <!-- Card -->
        <div
          class="relative z-10 max-w-md w-full mx-4
                 rounded-3xl border border-white/40 bg-white/70
                 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.35)]
                 dark:bg-white/10 dark:border-white/10"
        >
          <!-- Header -->
          <div class="px-7 pt-7 text-center">
            <div
              class="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-2xl
                     bg-gradient-to-br from-emerald-500 to-sky-500 text-white
                     shadow-lg shadow-emerald-500/30 animate-[pop_300ms_ease-out]"
              style="
                --tw-scale-x: 1;
                --tw-scale-y: 1;
              "
            >
              <!-- lock icon -->
              <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10V8a5 5 0 1 1 10 0v2"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="white"
                  stroke-width="2"
                />
                <circle cx="12" cy="15" r="1.8" fill="white" />
              </svg>
            </div>

            <h1
              class="text-2xl md:text-3xl font-extrabold
                     bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent
                     dark:from-emerald-400 dark:to-sky-400"
            >
              403 — Akses Ditolak
            </h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Kamu sudah login, tapi belum punya izin untuk membuka halaman ini.
              😥
            </p>
          </div>

          <!-- Tips / Info -->
          <div class="px-7 mt-4">
            <div
              class="rounded-2xl border border-emerald-200/60 bg-emerald-50/70
                     text-emerald-800 text-sm px-4 py-3
                     dark:bg-emerald-400/10 dark:border-emerald-300/20 dark:text-emerald-200"
            >
              Coba minta akses <span class="font-semibold">admin</span> ke
              halaman ini, atau gunakan akun lain yang punya role yang sesuai.
            </div>
          </div>

          <!-- Actions -->
          <div class="px-7 py-6 flex flex-col sm:flex-row gap-3">
            <button
              @click=${this.onHome}
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2
                     rounded-xl px-4 py-2.5 text-sm font-semibold
                     bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]
                     transition-colors"
            >
              <span>🏠 Kembali ke Beranda</span>
            </button>

            <button
              @click=${this.onSwitchAccount}
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2
                     rounded-xl px-4 py-2.5 text-sm font-semibold
                     bg-white text-slate-800 border border-slate-200
                     hover:bg-slate-50 active:scale-[0.99]
                     dark:bg-transparent dark:border-white/20 dark:text-slate-100"
            >
              <span>🔁 Ganti Akun</span>
            </button>
          </div>

          <!-- Footnote -->
          <div class="px-7 pb-6">
            <p
              class="text-[11px] text-slate-500 text-center dark:text-slate-400"
            >
              Butuh bantuan? Hubungi admin. ✨
            </p>
          </div>
        </div>
      </section>
    `;
  }
}
