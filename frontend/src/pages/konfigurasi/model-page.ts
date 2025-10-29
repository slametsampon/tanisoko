// frontend/src/pages/konfigurasi/model-page.ts

import { html, css, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { modelDefinitions } from 'src/config/model-definitions';
import { getService } from 'src/services/getService';

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

    console.log('[PageKonfigurasiModel] connected() triggered');

    if (!this.model) {
      // Coba dari attribute (jaga-jaga kalau router pernah kasih)
      const attr = this.getAttribute('model');
      console.log('[PageKonfigurasiModel] model from attribute:', attr);

      const path = window.location.pathname;
      console.log('[PageKonfigurasiModel] current path:', path);

      const match = path.match(/\/konfigurasi\/([^\/]+)/);
      const modelFromPath = match?.[1];
      console.log('[PageKonfigurasiModel] model from path:', modelFromPath);

      this.model = (attr || modelFromPath) as keyof typeof modelDefinitions;
    }

    console.log('[PageKonfigurasiModel] Final resolved model =', this.model);

    if (!this.model || !modelDefinitions[this.model]) {
      return html`<p>Model tidak valid atau belum didukung.</p>`;
    }

    this.loadData();
  }

  /**
   * 🔄 Lifecycle: dipanggil setiap kali properti berubah
   */
  updated(changed: Map<string | number | symbol, unknown>) {
    if (changed.has('model')) {
      console.log(
        '[PageKonfigurasiModel] model changed → reset state & reload'
      );
      this.selectedItem = null;
      this.items = [];
      if (this.model) {
        this.loadData();
      }
    }
  }

  async loadData() {
    console.log(`[PageKonfigurasiModel] loadData() for model = ${this.model}`);
    const service = getService<any>(this.model);
    const newItems = await service.getAll();
    console.log(
      `[PageKonfigurasiModel] Loaded ${newItems.length} items`,
      newItems
    );
    this.items = [...newItems]; // force trigger update
  }

  async handleSave() {
    console.log('[PageKonfigurasiModel] handleSave() - data saved');
    this.selectedItem = null;
    await this.loadData();
  }

  handleEdit = (item: any) => {
    console.log('[PageKonfigurasiModel] handleEdit() - item:', item);
    this.selectedItem = item;
  };

  handleDelete = async (item: any) => {
    const confirmed = confirm(`Yakin ingin menghapus item ID: ${item.id}?`);
    if (!confirmed) {
      console.log('[PageKonfigurasiModel] handleDelete() - cancelled');
      return;
    }

    const service = getService<any>(this.model);
    console.log(`[PageKonfigurasiModel] Deleting item ID: ${item.id}`);
    await service.delete(item.id);
    await this.loadData();
  };

  render() {
    const def = modelDefinitions[this.model];
    if (!def) {
      console.warn(
        `[PageKonfigurasiModel] Model "${this.model}" tidak ditemukan dalam definisi`
      );
      return html`<p>
        Model <strong>${this.model}</strong> tidak ditemukan dalam metadata.
      </p>`;
    }

    return html`
      <h2 class="text-xl font-bold mb-4 capitalize">
        Konfigurasi: ${this.model.replace(/_/g, ' ')}
      </h2>

      <div class="rounded-xl p-4 shadow mb-6">
        <dynamic-form
          .model=${this.model}
          .initialData=${this.selectedItem}
          @saved=${this.handleSave}
        ></dynamic-form>
      </div>

      <div class="rounded-xl p-4 shadow">
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
