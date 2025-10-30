// frontend/src/components/event/event-history.ts

import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EventLog } from '@models/event-log.model';
import {
  eventLogStore,
  loadEventLogData,
} from '../../event-log/event-log-store';
import './event-history-filter.ts';
import './event-history-table.ts';

@customElement('event-history')
export class EventHistory extends LitElement {
  createRenderRoot() {
    return this;
  }

  @state() logs: EventLog[] = [];
  @state() filteredLogs: EventLog[] = [];

  async connectedCallback() {
    super.connectedCallback();
    await loadEventLogData();
    this.logs = [...eventLogStore.items];
    this.filteredLogs = [...this.logs];
  }

  handleFilterChanged = (e: CustomEvent<{ filter: any }>) => {
    const { filter } = e.detail;
    const { category, source, from, to, keyword } = filter;

    this.filteredLogs = this.logs.filter((log) => {
      const matchCategory = category === 'all' || log.category === category;
      const matchSource = source === 'all' || log.source === source;
      const time = new Date(log.timestamp).getTime();
      const fromTime = from ? new Date(from).getTime() : null;
      const toTime = to ? new Date(to).getTime() : null;
      const matchFrom = !fromTime || time >= fromTime;
      const matchTo = !toTime || time <= toTime;
      const kw = keyword?.toLowerCase() ?? '';
      const matchKeyword =
        !kw ||
        log.summary?.toLowerCase().includes(kw) ||
        log.source?.toLowerCase().includes(kw) ||
        log.recorded_by?.toLowerCase().includes(kw);
      return (
        matchCategory && matchSource && matchFrom && matchTo && matchKeyword
      );
    });
  };

  render() {
    return html`
      <h3 class="text-lg font-semibold text-gray-700 mb-4">📜 Event History</h3>
      <event-history-filter
        .logs=${this.logs}
        @filter-changed=${this.handleFilterChanged}
      ></event-history-filter>
      <event-history-table .logs=${this.filteredLogs}></event-history-table>
    `;
  }
}
