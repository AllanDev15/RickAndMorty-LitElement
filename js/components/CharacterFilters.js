import { LitElement, html, css } from 'lit';
import { navigateParams } from '../router.js';
import './AppFilter.js';

class CharacterFilters extends LitElement {
  static properties = {
    filterValues: {},
    filters: { state: true },
  };

  static styles = css`
    .filters {
      margin-bottom: 32px;
    }
  `;

  constructor() {
    super();
    this.filterValues = {};
    this.filters = {
      gender: '',
      status: '',
    };
  }

  filter(e) {
    this.filters = e.detail.filters;

    navigateParams('/characters', this.filters);
    this.dispatchEvent(
      new Event('filter', { detail: { filter: true }, bubbles: true, composed: true })
    );
  }

  render() {
    return html`<form class="filters">
      <app-filter
        filter-type="status"
        .values=${this.filterValues?.statuses}
        .filters=${this.filters}
        @getFilters=${this.filter}
      ></app-filter>
      <app-filter
        filter-type="gender"
        .values=${this.filterValues?.genders}
        .filters=${this.filters}
        @getFilters=${this.filter}
      ></app-filter>
    </form> `;
  }
}

customElements.define('character-filters', CharacterFilters);
