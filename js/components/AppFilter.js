import { LitElement, html, css } from 'lit';

class AppFilter extends LitElement {
  static properties = {
    filterType: { type: String, attribute: 'filter-type' },
    filters: { type: Object },
    values: { type: Array },
  };

  constructor() {
    super();
    this.filterType = '';
    this.values = [];
  }

  loadData() {}

  filter(e) {
    this.filters[this.filterType] = e.target.value;

    const filterEventOptions = {
      detail: { filters: this.filters },
      bubbles: true,
      composed: true,
    };

    this.dispatchEvent(new CustomEvent('getFilters', filterEventOptions));
  }

  render() {
    return html`<select id="${this.filterType}Filter" @change=${this.filter}>
      <option value="null" disabled selected>--Select--</option>
      ${this.values?.map((value) => html`<option value="${value}">${value}</option>`)}
    </select>`;
  }
}

customElements.define('app-filter', AppFilter);
