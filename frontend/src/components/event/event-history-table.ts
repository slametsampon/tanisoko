// frontend/src/components/event/event-history-table.ts

import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EventLog } from '@models/event-log.model';

@customElement('event-history-table')
export class EventHistoryTable extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) logs: EventLog[] = [];

  categoryColors: Record<string, string> = {
    alarm: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    system: 'bg-blue-100 text-blue-800',
    info: 'bg-green-100 text-green-800',
    sensor: 'bg-orange-100 text-orange-800',
    manual: 'bg-gray-100 text-gray-800',
    feeding: 'bg-teal-100 text-teal-800',
    mortality: 'bg-purple-100 text-purple-800',
    observation: 'bg-indigo-100 text-indigo-800',
  };

  render() {
    return html`
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm border border-gray-200 rounded">
          <thead class="bg-gray-100 text-left">
            <tr>
              <th class="p-2 border-b">Time</th>
              <th class="p-2 border-b">Source</th>
              <th class="p-2 border-b">Category</th>
              <th class="p-2 border-b">Summary</th>
              <th class="p-2 border-b">By</th>
            </tr>
          </thead>
          <tbody>
            ${this.logs.map(
              (log) => html`
                <tr class="hover:bg-gray-50">
                  <td class="p-2 border-b">
                    ${new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td class="p-2 border-b">${log.source}#${log.source_id}</td>
                  <td class="p-2 border-b">
                    <span
                      class="text-xs font-semibold px-2 py-1 rounded-full inline-block ${this
                        .categoryColors[log.category] ?? 'bg-gray-100'}"
                    >
                      ${log.category}
                    </span>
                  </td>
                  <td class="p-2 border-b">${log.summary ?? '-'}</td>
                  <td class="p-2 border-b">${log.recorded_by ?? '-'}</td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}
