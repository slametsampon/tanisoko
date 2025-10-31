// frontend/src/components/event/event-history-filter.ts

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EventLog } from 'src/models/event-log.model';

@customElement('event-history-filter')
export class EventHistoryFilter extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) logs: EventLog[] = [];

  @state() category = 'all';
  @state() source = 'all';
  @state() from = '';
  @state() to = '';
  @state() keyword = '';

  private emitFilter() {
    const detail = {
      filter: {
        category: this.category,
        source: this.source,
        from: this.from,
        to: this.to,
        keyword: this.keyword,
      },
    };
    this.dispatchEvent(
      new CustomEvent('filter-changed', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const categories = Array.from(new Set(this.logs.map((l) => l.category)));
    const sources = Array.from(new Set(this.logs.map((l) => l.source)));

    return html`
      <div class="flex flex-wrap gap-4 mb-4 items-end">
        <div>
          <label class="text-sm block mb-1">Category</label>
          <select
            class="border rounded px-2 py-1 text-sm"
            @change=${(e: any) => (
              (this.category = e.target.value), this.emitFilter()
            )}
          >
            <option value="all">All</option>
            ${categories.map((c) => html`<option value=${c}>${c}</option>`)}
          </select>
        </div>

        <div>
          <label class="text-sm block mb-1">Source</label>
          <select
            class="border rounded px-2 py-1 text-sm"
            @change=${(e: any) => (
              (this.source = e.target.value), this.emitFilter()
            )}
          >
            <option value="all">All</option>
            ${sources.map((s) => html`<option value=${s}>${s}</option>`)}
          </select>
        </div>
        <div class="flex-1">
          <label class="text-sm block mb-1">Keyword</label>
          <input
            type="text"
            class="w-full border rounded px-2 py-1 text-sm"
            placeholder="Search..."
            @input=${(e: any) => (
              (this.keyword = e.target.value), this.emitFilter()
            )}
          />
        </div>
        <div class="flex flex-col gap-y-4">
          <div>
            <label class="text-sm block mb-1">From</label>
            <input
              type="datetime-local"
              class="border rounded px-2 py-1 text-sm"
              @change=${(e: any) => (
                (this.from = e.target.value), this.emitFilter()
              )}
            />
          </div>

          <div>
            <label class="text-sm block mb-1">To</label>
            <input
              type="datetime-local"
              class="border rounded px-2 py-1 text-sm"
              @change=${(e: any) => (
                (this.to = e.target.value), this.emitFilter()
              )}
            />
          </div>
        </div>
      </div>
    `;
  }
}
