import { LitElement, html, css } from 'lit';
import api from '../helpers/api.js';
import { navigate } from '../router.js';

class AppHeader extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    :host {
      box-sizing: border-box;
    }

    header {
      // background-color: var(--background);
      background: linear-gradient(to bottom, #11545f 50%, transparent 100%);
    }

    .container {
      max-width: 1600px;
      width: 90%;
      margin: 0 auto;
    }

    nav {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 img {
      height: 100px;
    }

    nav ul {
      width: 100%;
      padding: 24px 0;
      margin: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: unset;
      border-top: 3px solid var(--green);
    }
    li {
      list-style: none;
    }
    li a:link,
    li a:visited {
      text-decoration: none;
      color: white;
      font-size: 18px;
    }
    @media screen and (min-width: 768px) {
      nav ul {
        gap: 64px;
        justify-content: center;
      }
    }
  `;

  _onNavigate(e, element) {
    e.preventDefault();
    navigate(element.path);
  }

  render() {
    const paths = [
      {
        name: 'Characters',
        path: '/characters',
      },
      {
        name: 'Locations',
        path: '/locations',
      },
      {
        name: 'Episodes',
        path: '/episodes',
      },
    ];
    return html`<header>
      <nav class="container">
        <h1><img src="./assets/title.webp" alt="Rick and Morty" /></h1>
        <ul>
          ${paths.map(
            (element) =>
              html`<li>
                <a href="#" @click=${(e) => this._onNavigate(e, element)}>${element.name}</a>
              </li>`
          )}
        </ul>
      </nav>
    </header>`;
  }
}

customElements.define('app-header', AppHeader);
