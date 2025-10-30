// frontend/src/components/production/production-card.ts

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ProductionCycle, ProductionUnit } from '@/models';

@customElement('production-card')
export class ProductionCard extends LitElement {
  @property({ type: Object }) cycle!: ProductionCycle;
  @property({ type: Object }) unit!: ProductionUnit | undefined;

  createRenderRoot() {
    return this;
  }

  private isEndingSoon(endDate: string): boolean {
    const now = new Date();
    const end = new Date(endDate);
    const diff = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 5;
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
    const domainIcon = this.getDomainIcon(this.cycle.domain);
    const highlight = this.isEndingSoon(this.cycle.end_date);

    return html`
      <div
        class="p-4 rounded-lg border ${highlight
          ? 'border-yellow-400 bg-yellow-50'
          : 'border-gray-200 bg-white'} shadow space-y-1 cursor-pointer"
      >
        <div
          class="flex items-center gap-2 text-lg font-semibold text-gray-800"
        >
          ${domainIcon} ${this.unit?.name || 'Unit tidak ditemukan'}
        </div>
        <div class="text-sm text-gray-500">
          ${this.unit?.type?.toUpperCase()} – Kapasitas
          ${this.unit?.capacity ?? '-'}
        </div>
        <div class="text-sm text-gray-500">
          🗓 ${this.cycle.start_date} → ${this.cycle.end_date}
        </div>
        <div>
          <span
            class="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded"
          >
            ${this.cycle.domain}
          </span>
        </div>
        <div class="text-sm text-gray-700">📋 ${this.cycle.notes}</div>
      </div>
    `;
  }
}
