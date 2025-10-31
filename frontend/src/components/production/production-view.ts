// frontend/src/components/production/production-view.ts

import { LitElement, html } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { production_unitService } from 'src/services/production_unit.service';
import { production_cycleService } from 'src/services/production_cycle.service';
import { ProductionUnit, ProductionCycle } from 'src/models';
import './production-card.ts';
import './production-detail-modal.ts';

@customElement('production-view')
export class ProductionView extends LitElement {
  @state() private units: ProductionUnit[] = [];
  @state() private cycles: ProductionCycle[] = [];
  @state() private selectedDomain: string = 'all';
  @state() private selectedCycle: ProductionCycle | null = null;
  @state() private selectedUnit: ProductionUnit | null = null;

  @query('production-detail-modal') private modalEl!: any;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    const [units, cycles] = await Promise.all([
      production_unitService.getAll(),
      production_cycleService.getAll(),
    ]);

    this.units = units;
    this.cycles = cycles.sort(
      (a, b) =>
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
    );
  }

  private get filteredCycles(): ProductionCycle[] {
    if (this.selectedDomain === 'all') return this.cycles;
    return this.cycles.filter((c) => c.domain === this.selectedDomain);
  }

  private findUnitByCycle(cycle: ProductionCycle): ProductionUnit | undefined {
    if (cycle.pond_id) return this.units.find((u) => u.id === cycle.pond_id);
    if (cycle.coop_id) return this.units.find((u) => u.id === cycle.coop_id);
    if (cycle.domain === 'hydroponic') {
      return this.units.find(
        (u) => u.farm_id === cycle.farm_id && u.type === 'zone'
      );
    }
    return undefined;
  }

  private handleFilterChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.selectedDomain = select.value;
  }

  private handleCardClick(cycle: ProductionCycle) {
    this.selectedCycle = cycle;
    this.selectedUnit = this.findUnitByCycle(cycle);
    this.modalEl?.open();
  }

  render() {
    return html`
      <div class="mb-4">
        <label class="text-sm text-gray-600 mr-2">Filter domain:</label>
        <select
          @change=${this.handleFilterChange}
          class="border text-sm px-2 py-1 rounded"
        >
          <option value="all">All</option>
          <option value="hydroponic">Hydroponic 🌱</option>
          <option value="aquaculture">Aquaculture 🐟</option>
          <option value="poultry">Poultry 🐔</option>
        </select>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        ${this.filteredCycles.map((cycle) => {
          const unit = this.findUnitByCycle(cycle);
          return html`
            <production-card
              .cycle=${cycle}
              .unit=${unit}
              @click=${() => this.handleCardClick(cycle)}
            >
            </production-card>
          `;
        })}
      </div>
      ${this.selectedCycle && this.selectedUnit
        ? html`
            <production-detail-modal
              .cycle=${this.selectedCycle}
              .unit=${this.selectedUnit}
            >
            </production-detail-modal>
          `
        : null}
    `;
  }
}
