import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('feature-card')
export class FeatureCard extends LitElement {
  @property() title = '';
  @property() icon = '';
  @property() color = 'green';
  @property() description = '';

  createRenderRoot() {
    return this;
  }

  render() {
    const bgMap: Record<string, string> = {
      green: 'bg-green-50 border-green-200',
      blue: 'bg-blue-50 border-blue-200',
      yellow: 'bg-yellow-50 border-yellow-200',
    };

    const bgClass = bgMap[this.color] || bgMap.green;

    return html`
      <div class="rounded-xl p-4 border shadow ${bgClass}">
        <h3 class="text-lg font-semibold flex items-center gap-2 mb-2">
          <span>${this.icon}</span> ${this.title}
        </h3>
        <p class="text-sm text-gray-700">${this.description}</p>
      </div>
    `;
  }
}
