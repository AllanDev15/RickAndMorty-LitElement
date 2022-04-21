import { LitElement, html, css } from 'lit';
import ajax from '../helpers/ajax.js';
import api from '../helpers/api.js';
import './Header.js';
import './CardCharacter.js';
import './CharacterFilters.js';

class AppCharacters extends LitElement {
  page = 1;
  static properties = {
    characters: { state: true },
    isFiltered: { state: true },
    filteredCharacters: { state: true },
    filterValues: { state: true },
  };

  static styles = css`
    .container {
      max-width: 1800px;
      width: 90%;
      margin: 0 auto;
    }
    h2 {
      color: white;
      margin: 32px 0;
    }
    .loader {
      display: grid;
      place-items: center;
    }
    .cards-container {
      display: grid;
      grid-template-columns: 100%;
      row-gap: 48px;
      column-gap: 24px;
      padding: 32px 0;
    }

    @media screen and (min-width: 480px) {
      .container {
        width: 85%;
      }
    }
    @media screen and (min-width: 768px) {
      .cards-container {
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      }
    }
  `;

  constructor() {
    super();
    this.isFiltered = false;
    this.filteredCharacters = [];
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.characters) {
      this.loadCharacters();
    }
    window.onscroll = () => this.loadMoreCharacters();
  }

  async loadCharacters() {
    const charactersData = await ajax(api.CHARACTERS);
    this.setFilterValues(charactersData.results);

    this.characters = charactersData.results;

    const result = this.filterData(charactersData.results);
    if (result) {
      this.filteredCharacters = result;
    }

    await this.updateComplete;
    const loader = this.renderRoot.querySelector('.loader');
    loader.style.display = 'none';
  }

  async loadMoreCharacters() {
    const loader = this.renderRoot.querySelector('.loader');
    await this.updateComplete;

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // console.log(scrollTop + clientHeight + 110, scrollHeight);
    if (scrollTop + clientHeight + 150 >= scrollHeight) {
      loader.style.display = 'grid';
      this.page++;
      const response = await ajax(`${api.CHARACTERS}/?page=${this.page}`);

      let newCharacters;
      newCharacters = this.characters.concat(response.results);
      this.characters = newCharacters;

      if (this.isFiltered) {
        newCharacters = this.filteredCharacters.concat(response.results);
        this.filteredCharacters = this.filterData(newCharacters);
      }
      loader.style.display = 'none';
    }
  }

  filterData(data) {
    const url = new URL(window.location);
    const params = url.searchParams;
    const gender = params.get('gender');
    const status = params.get('status');

    if (!gender && !status) return false;

    this.isFiltered = true;

    const filteredCharacters = data
      .filter((character) => this.filterGender(character, gender))
      .filter((character) => this.filterStatus(character, status));

    return filteredCharacters;
  }

  filterGender = (character, gender) => {
    if (gender) {
      return character.gender === gender;
    }
    return character;
  };
  filterStatus = (character, status) => {
    if (status) {
      return character.status === status;
    }
    return character;
  };

  setFilterValues(data = this.characters) {
    let statuses = [];
    let genders = [];

    data.forEach((character) => {
      if (!statuses.includes(character.status)) statuses.push(character.status);
      if (!genders.includes(character.gender)) genders.push(character.gender);
    });

    this.filterValues = {
      statuses,
      genders,
    };
  }

  changeFilter() {
    console.log('filter');
    this.filteredCharacters = this.filterData(this.characters);
    this.isFiltered = true;
    this.loadMoreCharacters();
  }

  render() {
    let template;
    if (!this.characters) {
      template = html` <app-header> </app-header>
        <main>
          <div class="container">
            <h2>Characters</h2>
            <div class="loader">
              <img src="./assets/loader.svg" alt="loader" />
            </div>
          </div>
        </main>`;
    } else {
      // ! I'ts OK here? 👇🏼
      this.loadMoreCharacters();
      const charactersData = this.isFiltered ? this.filteredCharacters : this.characters;

      template = html`<app-header> </app-header>
        <main>
          <div class="container">
            <h2>Characters</h2>
            <div class="filters">
              <character-filters
                .filterValues=${this.filterValues}
                @filter=${this.changeFilter}
              ></character-filters>
              <button>Limpiar Filtros</button>
            </div>
            <div class="cards-container">
              ${charactersData?.map(
                (character) => html`<card-character .characterData=${character}></card-character>`
              )}
            </div>
            <div class="loader">
              <img src="./assets/loader.svg" alt="loader" />
            </div>
          </div>
        </main> `;
    }

    return template;
  }
}

customElements.define('app-characters', AppCharacters);
