// frontend/src/pages/konfigurasi/model-page.ts

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { modelDefinitions } from 'src/config/model-definitions';
import { getService } from 'src/services/getService';

import { addEventLog } from 'src/event-log/event-log-store';
import { EventLog } from 'src/models/event-log.model';

import 'src/components/DynamicForm';
import 'src/components/DynamicTable';

@customElement('page-konfigurasi-model')
export class PageKonfigurasiModel extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) model!: keyof typeof modelDefinitions;

  @state() private items: any[] = [];
  @state() private selectedItem: any | null = null;

  connectedCallback() {
    super.connectedCallback();

    if (!this.model) {
      const attr = this.getAttribute('model');
      const match = window.location.pathname.match(/\/konfigurasi\/([^\/]+)/);
      this.model = (attr || match?.[1]) as keyof typeof modelDefinitions;
    }

    if (!this.model || !modelDefinitions[this.model]) return;
    this.loadData();
  }

  updated(changed: Map<string | number | symbol, unknown>) {
    if (changed.has('model')) {
      this.selectedItem = null;
      this.items = [];
      if (this.model) {
        this.loadData();
      }
    }
  }

  async loadData() {
    const service = getService<any>(this.model);
    const newItems = await service.getAll();
    this.items = [...newItems];
  }

  /**
   * Fungsi logging perubahan metadata
   */
  private logEntityChange(
    source: string,
    source_id: number,
    field: string,
    oldValue: any,
    newValue: any,
    userId: string = 'user_demo'
  ) {
    const event: Omit<EventLog, 'id' | 'timestamp'> = {
      source: source as any,
      source_id,
      category: 'manual',
      summary: `Field "${field}" changed: ${oldValue} → ${newValue}`,
      recorded_by: userId,
      value: newValue,
      previous_value: oldValue,
    };
    addEventLog(event);
  }

  async handleSave(e: CustomEvent) {
    const newItem = e.detail as Record<string, any>;
    const oldItem = this.selectedItem;

    // Logging perubahan
    if (oldItem && newItem.id === oldItem.id) {
      const keysToCompare = Object.keys(newItem);
      for (const key of keysToCompare) {
        if (newItem[key] !== oldItem[key]) {
          this.logEntityChange(
            this.model,
            newItem.id,
            key,
            oldItem[key],
            newItem[key]
          );
        }
      }
    }

    this.selectedItem = null;
    await this.loadData();
  }

  handleEdit = (item: any) => {
    this.selectedItem = item;
  };

  handleDelete = async (item: any) => {
    const confirmed = confirm(`Yakin ingin menghapus item ID: ${item.id}?`);
    if (!confirmed) return;

    const service = getService<any>(this.model);
    await service.delete(item.id);

    // Catat penghapusan
    this.logEntityChange(
      this.model,
      item.id,
      '[entity]',
      'EXISTING',
      'DELETED'
    );

    await this.loadData();
  };

  render() {
    const def = modelDefinitions[this.model];
    if (!def) {
      return html`<p>
        Model <strong>${this.model}</strong> tidak ditemukan dalam metadata.
      </p>`;
    }

    return html`
      <h2 class="text-xl font-bold mb-4 capitalize">
        Konfigurasi: ${this.model.replace(/_/g, ' ')}
      </h2>

      <div class="bg-white rounded-xl p-4 shadow mb-6">
        <dynamic-form
          .model=${this.model}
          .initialData=${this.selectedItem}
          @saved=${this.handleSave}
        ></dynamic-form>
      </div>

      <div class="bg-white rounded-xl p-4 shadow">
        <dynamic-table
          .model=${this.model}
          .items=${this.items}
          .columns=${def.displayFields}
          @edit=${(e: CustomEvent) => this.handleEdit(e.detail)}
          @delete=${(e: CustomEvent) => this.handleDelete(e.detail)}
        ></dynamic-table>
      </div>
    `;
  }
}
