import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('page-about')
export class AboutPage extends LitElement {
  createRenderRoot() {
    return this; // gunakan light DOM agar Tailwind CSS global bekerja
  }

  render() {
    return html`
      <section class="p-6 md:p-10 max-w-5xl mx-auto">
        <h1 class="text-3xl font-bold text-center text-green-700 mb-6">
          Tentang TaniVerse
        </h1>

        <p class="text-base text-gray-700 leading-relaxed mb-4">
          <span class="font-semibold text-green-600">TaniVerse</span> adalah
          sistem pertanian presisi berbasis IoT yang dirancang untuk membantu
          petani dan pengelola lahan dalam memantau dan mengontrol kondisi
          lingkungan secara real-time. Dengan teknologi edge-computing dan
          komunikasi dua arah, sistem ini mendukung keberlanjutan dan efisiensi
          di sektor pertanian.
        </p>

        <p class="text-base text-gray-700 leading-relaxed mb-4">
          Kami berkomitmen untuk menghadirkan solusi yang dapat diandalkan,
          transparan, dan berbasis teknologi terbuka. Setiap bagian sistem ini
          dikembangkan melalui pendekatan modular dan riset teknologi terbaru.
        </p>

        <h2 class="text-xl font-semibold text-green-700 mt-8 mb-4">
          Sumber Daya & Teknologi
        </h2>

        <p class="text-base text-gray-700 leading-relaxed mb-2">
          Seluruh stack
          <span class="font-semibold text-green-600">TaniVerse</span> dibangun
          menggunakan teknologi open-source berbasis
          <span class="font-semibold">TypeScript</span> dan
          <span class="font-semibold">JavaScript</span> dari sisi frontend
          hingga backend.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">Frontend</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>Framework: <span class="font-medium">LitElement</span></li>
              <li>
                Styling: <span class="font-medium">Tailwind CSS (inline)</span>
              </li>
              <li>Build Tool: <span class="font-medium">esbuild</span></li>
              <li>
                Component Style:
                <span class="font-medium"
                  >Component-Driven Development (CDD)</span
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">Backend</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>
                Platform: <span class="font-medium">Node.js + TypeScript</span>
              </li>
              <li>Framework: <span class="font-medium">Fastify</span></li>
              <li>
                API: <span class="font-medium">RESTful</span> &
                <span class="font-medium">MQTT bridge</span>
              </li>
              <li>
                Database: <span class="font-medium">SQLite</span> (local,
                embedded)
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">IoT Node</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>Device: <span class="font-medium">ESP32</span></li>
              <li>Firmware: <span class="font-medium">Arduino C++</span></li>
              <li>
                Protocol:
                <span class="font-medium">MQTT</span> (Publish/Subscribe)
              </li>
              <li>Transport: <span class="font-medium">WiFi</span></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Tools & DevOps
            </h3>
            <ul class="list-disc list-inside text-gray-700">
              <li>Hosting: <span class="font-medium">Raspberry Pi 4</span></li>
              <li>MQTT Broker: <span class="font-medium">Mosquitto</span></li>
              <li>Repository: <span class="font-medium">GitHub</span></li>
              <li>
                IDE: <span class="font-medium">Visual Studio Code</span> +
                Arduino CE
              </li>
            </ul>
          </div>
        </div>

        <h2 class="text-xl font-semibold text-green-700 mt-10 mb-4">
          Arsitektur Sistem IoT TaniVerse
        </h2>

        <p class="text-base text-gray-700 leading-relaxed mb-4">
          Untuk mendukung keberlanjutan dan skalabilitas, sistem TaniVerse
          dibangun dengan pendekatan
          <span class="font-semibold text-green-600"
            >Separation of Concern (SoC)</span
          >
          yang membagi tanggung jawab sistem menjadi tiga lapisan utama:
          firmware node IoT, komunikasi data, dan antarmuka pengguna (HMI).
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Firmware Node (ESP32)
            </h3>
            <ul class="list-disc list-inside text-gray-700 text-sm">
              <li>Bahasa: C++ (Object-Oriented)</li>
              <li>Platform: Arduino IDE + Arduino CE</li>
              <li>Komunikasi: MQTT (Pub/Sub), HTTP AJAX (opsional)</li>
              <li>Storage: SPIFFS / LittleFS</li>
              <li>Web Server lokal untuk konfigurasi & status</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Server & Komunikasi
            </h3>
            <ul class="list-disc list-inside text-gray-700 text-sm">
              <li>
                <span class="font-medium">Raspberry Pi 4</span> berperan sebagai
                pusat sistem
              </li>
              <li>
                Menjalankan
                <span class="font-medium">Mosquitto MQTT Broker</span>
              </li>
              <li>Hosting Web UI (HMI) berbasis LitElement</li>
              <li>Bridge komunikasi: MQTT ↔ WebSocket untuk frontend</li>
              <li>Mengelola koneksi semua node ESP melalui jaringan lokal</li>
              <li>Dapat berfungsi sebagai edge server (offline & online)</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-green-600 mb-2">
              Antarmuka Pengguna (HMI)
            </h3>
            <ul class="list-disc list-inside text-gray-700 text-sm">
              <li>Framework: LitElement (Web Components)</li>
              <li>Styling: Tailwind CSS</li>
              <li>Koneksi: MQTT over WebSocket ke Raspberry Pi</li>
              <li>Build Tool: esbuild (bundling & minify)</li>
              <li>Deployment: GitHub Pages / Raspberry Pi</li>
            </ul>
          </div>
        </div>

        <p class="text-base text-gray-700 leading-relaxed mt-4">
          Pendekatan ini memastikan bahwa sistem TaniVerse dapat dikembangkan
          secara modular dan efisien. Raspberry Pi berfungsi sebagai pusat
          komputasi ringan dan komunikasi, memungkinkan kontrol penuh terhadap
          seluruh ekosistem IoT pertanian dari satu perangkat edge server.
        </p>

        <h2 class="text-xl font-semibold text-green-700 mt-10 mb-4">Penutup</h2>

        <p class="text-base text-gray-700 leading-relaxed mb-2">
          Terima kasih telah bergabung dengan kami dalam perjalanan menuju
          pertanian masa depan yang lebih cerdas, efisien, dan berkelanjutan.
          Mari bersama-sama membangun ekosistem teknologi pertanian Indonesia
          yang tangguh dan adaptif.
        </p>
      </section>
    `;
  }
}
