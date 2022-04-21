import { LitElement, html, css } from 'lit';
import ajax from '../helpers/ajax';
import api from '../helpers/api';

class CharacterView extends LitElement {
  static properties = {
    characterInfo: { type: Object },
  };

  constructor() {
    super();
    this.characterInfo = {};
    this.getCharacterInfo();
  }

  async getCharacterInfo() {
    const characterID = window.location.pathname.split('/');
    const data = await ajax(`${api.CHARACTERS}/${characterID[2]}`);
    this.characterInfo = data;
  }

  render() {
    return html` <h2>${this.characterInfo.name}</h2> `;
  }
}

customElements.define('character-view', CharacterView);
