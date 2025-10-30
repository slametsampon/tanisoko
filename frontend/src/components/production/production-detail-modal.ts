// frontend/src/components/production/production-detail-modal.ts

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ProductionUnit, ProductionCycle } from '@/models';

@customElement('production-detail-modal')
export class ProductionDetailModal extends LitElement {
  @property({ type: Object }) unit!: ProductionUnit;
  @property({ type: Object }) cycle!: ProductionCycle;

  @query('dialog') dialogEl!: HTMLDialogElement;

  createRenderRoot() {
    return this;
  }

  public open() {
    this.dialogEl?.showModal();
  }

  public close() {
    this.dialogEl?.close();
  }

  private getDomainIcon(domain: string) {
    switch (domain) {
      case 'hydroponic':
        return '🌱';
      case 'aquaculture':
        return '🐟';
      case 'poultry':
        return '🐔';
      default:
        return '❓';
    }
  }

  render() {
    return html`
      <dialog
        class="rounded-lg p-6 w-full max-w-md border border-gray-300 shadow-lg space-y-4"
      >
        <h2 class="text-xl font-semibold text-gray-800">
          ${this.getDomainIcon(this.cycle.domain)} ${this.unit.name}
        </h2>

        <div class="text-sm text-gray-600">
          <div><strong>Domain:</strong> ${this.cycle.domain}</div>
          <div>
            <strong>Tanggal:</strong> ${this.cycle.start_date} →
            ${this.cycle.end_date}
          </div>
          <div><strong>Catatan:</strong> ${this.cycle.notes}</div>
        </div>

        <div class="text-sm text-gray-600">
          <div><strong>Tipe Unit:</strong> ${this.unit.type}</div>
          <div><strong>Kapasitas:</strong> ${this.unit.capacity}</div>
          <div>
            <strong>Dimensi:</strong> ${this.unit.dimensions_length} ×
            ${this.unit.dimensions_width} × ${this.unit.dimensions_height}
          </div>
        </div>

        <div class="text-right">
          <button
            @click=${this.close}
            class="mt-4 text-sm px-4 py-1 border rounded hover:bg-gray-100"
          >
            Tutup
          </button>
        </div>
      </dialog>
    `;
  }
}
