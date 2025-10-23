// frontend/src/pages/login.ts

import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { AuthService } from 'src/services/auth-service';

@customElement('page-login')
export class PageLogin extends LitElement {
  @state() private username = '';
  @state() private password = '';
  @state() private loading = false;
  @state() private error = '';
  @state() private showPwd = false;
  @state() private remember = true;
  @state() private showRegister = false;
  @state() private regUsername = '';
  @state() private regPwd1 = '';
  @state() private regPwd2 = '';
  @state() private regRole = 'guest';
  @state() private regError = '';

  static styles = css`
    :host {
      display: block;
    }
  `;

  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    this.username = 'admin';
    this.password = 'admin123';
  }

  private async onSubmit(e: Event) {
    e.preventDefault();
    if (this.loading) return;
    this.error = '';
    this.loading = true;
    try {
      // ✅ AuthService.login akan trigger 'auth:changed'
      await AuthService.login(this.username.trim(), this.password);

      const next = sessionStorage.getItem('next_path') || '/';
      if (this.remember) {
        localStorage.setItem('last_username', this.username.trim());
      } else {
        localStorage.removeItem('last_username');
      }
      sessionStorage.removeItem('next_path');

      this.dispatchEvent(
        new CustomEvent('navigate-to', {
          detail: { path: next },
          bubbles: true,
          composed: true,
        })
      );
    } catch (err: any) {
      this.error = err?.message ?? 'Login gagal.';
    } finally {
      this.loading = false;
    }
  }

  private togglePwd = () => (this.showPwd = !this.showPwd);

  private async registerUser() {
    this.regError = '';

    if (!this.regUsername || !this.regPwd1 || !this.regPwd2) {
      this.regError = 'Semua field harus diisi.';
      return;
    }

    if (this.regPwd1 !== this.regPwd2) {
      this.regError = 'Password tidak cocok.';
      return;
    }

    try {
      await AuthService.register({
        username: this.regUsername.trim(),
        password: this.regPwd1,
        role: this.regRole as any,
        avatarUrl: `https://i.pravatar.cc/100?u=${this.regUsername.trim()}`,
      });

      this.showRegister = false;
      this.username = this.regUsername;
      this.password = this.regPwd1;
    } catch (err: any) {
      this.regError = err.message;
    }
  }

  private cancelRegister() {
    this.showRegister = false;
    this.regUsername = '';
    this.regPwd1 = '';
    this.regPwd2 = '';
    this.regRole = 'guest';
    this.regError = '';
  }

  render() {
    return html`
      <!-- Background -->
      <section
        class="relative min-h-[90vh] flex items-center justify-center overflow-hidden
               bg-gradient-to-br from-emerald-50 via-white to-sky-50
               dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <!-- dekorasi blob -->
        <div
          class="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl"
        ></div>
        <div
          class="pointer-events-none absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl"
        ></div>

        <!-- Card -->
        <div
          class="relative z-10 w-full max-w-md mx-4
                 rounded-3xl border border-white/40 bg-white/70 backdrop-blur-xl
                 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.35)]
                 dark:bg-white/10 dark:border-white/10"
        >
          <!-- Header -->
          <div class="px-8 pt-8 text-center">
            <div
              class="mx-auto mb-4 grid place-items-center h-16 w-16 rounded-2xl
                     bg-gradient-to-br from-emerald-500 to-sky-500 text-white shadow-lg shadow-emerald-500/30"
            >
              <!-- user icon -->
              <svg class="h-8 w-8" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2" />
                <path
                  d="M4 19c1.8-3 5-5 8-5s6.2 2 8 5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <h1
              class="text-2xl md:text-3xl font-extrabold
                       bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent
                       dark:from-emerald-400 dark:to-sky-400"
            >
              Selamat Datang Kembali 👋
            </h1>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Masuk untuk lanjut. Make it vibes, stay productive ✨
            </p>
          </div>

          <!-- Form -->
          <form class="px-8 pt-6 pb-8" @submit=${this.onSubmit} novalidate>
            ${this.error
              ? html`
                  <div
                    class="mb-4 text-sm text-red-700 bg-red-50/90 border border-red-200 rounded-xl px-4 py-3
                       dark:bg-red-400/10 dark:border-red-300/20 dark:text-red-200"
                  >
                    ${this.error}
                  </div>
                `
              : null}

            <!-- Username -->
            <label
              class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >Username</label
            >
            <div class="relative mb-4">
              <input
                class="w-full px-3 py-2.5 pr-10 rounded-xl border border-slate-200/80 bg-white/80
                       focus:outline-none focus:ring-2 focus:ring-emerald-400
                       dark:bg-white/10 dark:border-white/10 dark:text-slate-100"
                placeholder="yourname"
                autocomplete="username"
                .value=${this.username}
                @input=${(e: any) => (this.username = e.target.value)}
              />
              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <!-- at icon -->
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4a8 8 0 108 8"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                  />
                  <path
                    d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                </svg>
              </span>
            </div>

            <!-- Password -->
            <label
              class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200"
              >Password</label
            >
            <div class="relative mb-2">
              <input
                class="w-full px-3 py-2.5 pr-12 rounded-xl border border-slate-200/80 bg-white/80
                       focus:outline-none focus:ring-2 focus:ring-emerald-400
                       dark:bg-white/10 dark:border-white/10 dark:text-slate-100"
                placeholder="••••••••"
                .type=${this.showPwd ? 'text' : 'password'}
                autocomplete="current-password"
                .value=${this.password}
                @input=${(e: any) => (this.password = e.target.value)}
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-slate-400 hover:text-slate-600
                       dark:hover:text-slate-200"
                @click=${this.togglePwd}
                aria-label="Toggle password"
                tabindex="-1"
              >
                ${this.showPwd
                  ? html`
                      <!-- eye-off -->
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 3l18 18"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-1.24"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                        <path
                          d="M9.88 5.09A9.76 9.76 0 0112 5c5 0 9 4 10 7-0.37 1.04-1.06 2.19-2.07 3.25M6.64 6.64C4.16 8.1 2.61 10.1 2 12c0.37 1.04 1.06 2.19 2.07 3.25A13.1 13.1 0 0012 19c1.14 0 2.25-.16 3.31-.47"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          fill="none"
                        />
                      </svg>
                    `
                  : html`
                      <!-- eye -->
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                          stroke="currentColor"
                          stroke-width="2"
                          fill="none"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          stroke-width="2"
                        />
                      </svg>
                    `}
              </button>
            </div>

            <!-- Row: remember & forgot -->
            <div class="mb-5 flex items-center justify-between text-sm">
              <label
                class="inline-flex items-center gap-2 select-none text-slate-600 dark:text-slate-300"
              >
                <input
                  type="checkbox"
                  class="rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-400"
                  .checked=${this.remember}
                  @change=${(e: any) => (this.remember = !!e.target.checked)}
                />
                Ingat saya
              </label>
              <a
                class="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                href="#"
                @click=${(e: Event) => e.preventDefault()}
              >
                Lupa password?
              </a>
            </div>

            <!-- Submit -->
            <button
              class="w-full inline-flex items-center justify-center gap-2
                     py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700
                     disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]
                     transition"
              ?disabled=${this.loading || !this.username || !this.password}
              type="submit"
            >
              ${this.loading
                ? html`
                    <svg
                      class="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="white"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>Memproses…</span>
                  `
                : html`<span>Masuk</span>`}
            </button>

            <!-- Divider -->
            <div class="flex items-center gap-3 my-6">
              <div class="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
              <span class="text-[11px] uppercase tracking-wider text-slate-400"
                >atau</span
              >
              <div class="h-px flex-1 bg-slate-200 dark:bg-white/10"></div>
            </div>

            <!-- Register button -->
            <button
              type="button"
              class="w-full inline-flex items-center justify-center gap-2
                     py-2.5 rounded-xl border border-blue-600 bg-white hover:bg-slate-100
                     text-slate-700 dark:text-slate-100 dark:bg-transparent dark:border-white/20"
              @click=${() => (this.showRegister = true)}
            >
              🧪 Belum punya akun? Daftar di sini
            </button>
          </form>

          <!-- Footer -->
          <div class="px-8 pb-8">
            <p
              class="text-[11px] text-center text-slate-500 dark:text-slate-400"
            >
              Dengan masuk, kamu setuju pada ketentuan & privasi kami.
            </p>
          </div>
        </div>
        ${this.showRegister
          ? html`
              <div
                class="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
              >
                <div
                  class="bg-white dark:bg-slate-800 p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700"
                >
                  <h2
                    class="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100"
                  >
                    Registrasi Pengguna
                  </h2>

                  ${this.regError
                    ? html`<div class="text-sm text-red-500 mb-2">
                        ${this.regError}
                      </div>`
                    : null}

                  <div class="space-y-4">
                    <input
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      placeholder="Username"
                      .value=${this.regUsername}
                      @input=${(e: any) => (this.regUsername = e.target.value)}
                    />
                    <input
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      type="password"
                      placeholder="Password"
                      .value=${this.regPwd1}
                      @input=${(e: any) => (this.regPwd1 = e.target.value)}
                    />
                    <input
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      type="password"
                      placeholder="Ulangi Password"
                      .value=${this.regPwd2}
                      @input=${(e: any) => (this.regPwd2 = e.target.value)}
                    />
                    <select
                      class="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                      .value=${this.regRole}
                      @change=${(e: any) => (this.regRole = e.target.value)}
                    >
                      <option value="guest">Guest</option>
                      <option value="operator">Operator</option>
                      <option value="engineer">Engineer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div class="mt-6 flex justify-end gap-3">
                    <button
                      @click=${this.cancelRegister}
                      class="px-4 py-2 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      Batal
                    </button>
                    <button
                      @click=${this.registerUser}
                      class="px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            `
          : null}
      </section>
    `;
  }
}
