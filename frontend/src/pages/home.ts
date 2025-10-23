// frontend/src/pages/home.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../components/cards/feature-card.js';

@customElement('page-home')
export class PageHome extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <section class="p-6 space-y-6">
        <div>
          <h1 class="text-2xl font-bold text-green-800 mb-2">
            🌿 Selamat Datang di TaniVerse
          </h1>
          <p class="text-gray-700">
            TaniVerse adalah platform monitoring dan kontrol berbasis IoT untuk
            sistem pertanian cerdas di berbagai sektor.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <feature-card
            title="Hidroponik"
            icon="🌱"
            color="green"
            description="Pantau suhu, pH, dan nutrisi secara real-time untuk mendukung pertumbuhan tanaman optimal tanpa tanah."
          ></feature-card>

          <feature-card
            title="Akuakultur"
            icon="🐟"
            color="blue"
            description="Monitor kualitas air, aerator, dan kondisi kolam untuk memastikan kesehatan ikan dan efisiensi budidaya."
          ></feature-card>

          <feature-card
            title="Peternakan"
            icon="🐔"
            color="yellow"
            description="Kendalikan suhu kandang, ventilasi, dan pencahayaan agar ternak tumbuh sehat dan produktif."
          ></feature-card>
        </div>

        <footer class="text-sm text-gray-500 mt-6">
          Gunakan menu navigasi di atas untuk menjelajahi dashboard
          masing-masing sektor.
        </footer>
      </section>
    `;
  }
}
