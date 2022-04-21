import { LitElement, html, css } from 'lit';
import { navigate } from '../router';

class CardCharacter extends LitElement {
  static properties = {
    characterData: {},
    color: {},
  };

  static styles = css`
    .card {
      background-color: var(--blue);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      border-radius: 12px;
      box-shadow: 0 4px 5px rgba(189, 224, 90, 0.14), 0 1px 10px rgba(189, 224, 90, 0.12),
        0 2px 4px rgba(189, 224, 90, 0.2);
      max-width: 80%;
      margin: 0 auto;
      padding: 16px;
      overflow: hidden;
      border: 1px solid var(--green);
    }
    .card:hover {
      cursor: pointer;
    }
    .card__image {
      height: 170px;
      width: fit-content;
    }

    p,
    span {
      font-size: 14px;
      margin: 0px;
      font-family: 'Poppins', sans-serif;
    }
    .card__info {
      box-sizing: border-box;
      width: 100%;
      color: white;
      position: relative;
      padding: 0 8px;
    }
    .card__name {
      margin: 8px 0;
      text-align: center;
    }
    .card__type {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
    }
    .card__attribute {
      color: rgba(255, 255, 255, 0.7);
    }
    .card__attribute--location {
      display: block;
      margin-top: 12px;
    }
    .card__specie {
      margin-top: 12px;
    }
    .card__gender {
      margin-top: 8px;
    }
    .card__location {
      padding-right: 90px;
    }
    .card__status {
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 8px;
      border: 1px solid;
      font-weight: 600;
      position: absolute;
      bottom: 15px;
      right: 12px;
    }
    .card__status--alive {
      color: #22c55e;
      border-color: #22c55e;
    }
    .card__status--dead {
      color: #ff4363;
      border-color: #ff4363;
    }
    .card__status--unknown {
      color: #aca4f4;
      border-color: #aca4f4;
    }

    @media screen and (min-width: 480px) {
      .card {
        gap: 24px;
        flex-direction: row;
        align-items: normal;
        max-width: 700px;
        padding: 0px;
      }
      p,
      span {
        font-size: 16px;
      }
      .card__image {
        height: 240px;
      }
      .card__info {
        max-height: 240px;
        padding: 0px;
      }
      .card__name {
        text-align: left;
        margin: 16px 0 4px 0;
      }
    }
  `;

  constructor() {
    super();
  }

  _showCharacter(id) {
    navigate(`/character/${id}`);
  }

  render() {
    const { id, image, name, status, species, type, gender, location } = this.characterData;
    return html`<div class="card" @click=${() => this._showCharacter(id)}>
      <img src="${image}" alt="${name} image" class="card__image card__image--${status}" />
      <div class="card__info">
        <h3 class="card__name">${name}</h3>
        <p class="card__type">${type ? `(${type})` : ''}</p>
        <p class="card__specie"><span class="card__attribute">Species:</span> ${species}</p>
        <p class="card__gender"><span class="card__attribute">Gender:</span> ${gender}</p>
        <span class="card__attribute card__attribute--location">Location</span>
        <p class="card__location">${location.name}</p>
        <p class="card__status card__status--${status.toLowerCase()}">${status}</p>
      </div>
    </div>`;
  }
}

customElements.define('card-character', CardCharacter);
