// frontend/src/components/DynamicForm.ts

import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { modelDefinitions } from 'src/config/model-definitions';
import { getService } from 'src/services/getService';
import { ZodSchema, ZodNumber, ZodObject, ZodTypeAny } from 'zod';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('dynamic-form')
export class DynamicForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) model!: keyof typeof modelDefinitions;
  @property({ type: Object }) initialData: any = {};

  @state() private formData: Record<string, any> = {};

  // ⚠️ Tangkap perubahan initialData untuk handle edit ulang
  updated(changedProps: Map<string, any>) {
    if (changedProps.has('model')) {
      this.formData = {}; // Reset total saat ganti model
    }

    if (changedProps.has('initialData')) {
      const allowedKeys =
        modelDefinitions[this.model]?.fields.map((f) => f.key) || [];
      const cleanData: Record<string, any> = {};
      for (const key of allowedKeys) {
        cleanData[key] = this.initialData?.[key] ?? '';
      }

      // ✅ Tambahkan id jika tersedia
      if (this.initialData?.id) {
        cleanData.id = this.initialData.id;
      }

      this.formData = cleanData;
      console.log('[DynamicForm] filtered formData:', this.formData);
    }
  }

  handleChange(field: string, value: any) {
    this.formData = { ...this.formData, [field]: value };
  }

  async handleSubmit() {
    const schema: ZodSchema<any> = modelDefinitions[this.model].schema;
    const parsed = schema.safeParse(this.formData);
    if (!parsed.success) {
      alert('Validasi gagal, periksa kembali input.');
      console.warn(parsed.error);
      return;
    }

    const service = getService(this.model);
    if (this.formData.id) {
      await service.update(this.formData.id, this.formData);
    } else {
      await service.create(this.formData);
    }

    this.dispatchEvent(new CustomEvent('saved'));

    // Reset form setelah simpan
    this.formData = {};
  }

  render() {
    const def = modelDefinitions[this.model];
    if (!def) return html`<p>Model tidak ditemukan</p>`;

    const schemaObj = def.schema as ZodObject<any>;
    const schemaShape = schemaObj.shape as Record<string, ZodTypeAny>;

    return html`
      <form
        class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900"
        @submit=${(e: Event) => {
          e.preventDefault();
          this.handleSubmit();
        }}
      >
        ${def.fields.map((f, i) => {
          const zodType = schemaShape[f.key];
          if (!zodType) {
            console.warn(
              `[DynamicForm] Field "${f.key}" tidak ditemukan di schema`
            );
            return null;
          }

          const isNumber = zodType instanceof ZodNumber;
          const isMultiline = f.key.toLowerCase().includes('description');

          return html`
            <div class="flex flex-col">
              <label
                class="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
              >
                ${f.label}
              </label>

              ${isMultiline
                ? html`
                    <textarea
                      class="border rounded px-3 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white"
                      rows="3"
                      placeholder=${f.label}
                      .value=${this.formData[f.key] ?? ''}
                      ?autofocus=${i === 0}
                      @input=${(e: any) =>
                        this.handleChange(f.key, e.target.value)}
                    ></textarea>
                  `
                : html`
                    <input
                      class="border rounded px-3 py-2"
                      type=${isNumber ? 'number' : 'text'}
                      step=${ifDefined(isNumber ? 0.01 : undefined)}
                      placeholder=${f.label}
                      .value=${this.formData[f.key] ?? ''}
                      @input=${(e: any) =>
                        this.handleChange(
                          f.key,
                          isNumber ? Number(e.target.value) : e.target.value
                        )}
                    />
                  `}
            </div>
          `;
        })}

        <div class="col-span-1 md:col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold"
          >
            ${this.formData.id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    `;
  }
}
