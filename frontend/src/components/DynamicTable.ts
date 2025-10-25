// frontend/src/components/DynamicTable.ts

import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('dynamic-table')
export class DynamicTable extends LitElement {
  createRenderRoot() {
    return this; // ✅ Disable Shadow DOM to apply Tailwind styles
  }

  @property({ type: String }) model!: string;
  @property({ type: Array }) items: any[] = [];
  @property({ type: Array }) columns: string[] = [];

  handleEdit(item: any) {
    console.log(`[DynamicTable] Edit clicked:`, item);
    this.dispatchEvent(new CustomEvent('edit', { detail: item }));
  }

  handleDelete(item: any) {
    console.log(`[DynamicTable] Delete clicked:`, item);
    this.dispatchEvent(new CustomEvent('delete', { detail: item }));
  }

  render() {
    if (!this.items.length) {
      return html`
        <p class="text-gray-500 text-sm italic">Data tidak tersedia</p>
      `;
    }

    return html`
      <div class="overflow-x-auto rounded shadow">
        <table
          class="min-w-full text-sm text-left border border-gray-200 bg-white dark:bg-gray-900"
        >
          <thead>
            <tr>
              <th class="p-3 border-b">ID</th>
              ${this.columns
                .filter((col) => col !== 'id') // 👈 Hindari duplikasi ID
                .map(
                  (col) => html`<th class="p-3 border-b capitalize">${col}</th>`
                )}
              <th class="p-3 border-b text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${this.items.map(
              (item) => html`
                <tr>
                  <td class="p-3">${item.id}</td>
                  ${this.columns
                    .filter((col) => col !== 'id') // 👈 Sama di body
                    .map((col) => html`<td class="p-3">${item[col]}</td>`)}
                  <td class="p-3 text-center space-x-2">
                    <button
                      class="text-yellow-600 hover:text-yellow-800"
                      @click=${() => this.handleEdit(item)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      class="text-red-600 hover:text-red-800"
                      @click=${() => this.handleDelete(item)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
