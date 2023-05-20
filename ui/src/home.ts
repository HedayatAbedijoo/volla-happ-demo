import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-home')
export class HomeComponent extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 2rem 1rem;
      color: rgba(255,255,255,1.00);
      background-color: rgba(0,0,0,1.00)
    }

    .logo {
      margin-bottom: 16px;
    }

    .feature-card {
      flex: 1;
      padding: 1rem;
      transition: background-color 0.3s, border 0.3s;
    }

    .feature-card.active {
      background-color: #f5f5f5;
      border: 2px solid purple;
      border-radius: 8px;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 600;
    }

    p {
      font-size: 1.2rem;
      font-weight: 300;
    }
  `;

  handleClick(componentName: string) {
    const event = new CustomEvent('navigate', {
      detail: componentName,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
/* eslint-disable lit-a11y/click-events-have-key-events */

render() {
    return html`
      <div class="container">
        <img class="logo" src="assets/volla.png" alt="Volla Sync" />
        <div class="feature-card" @click=${() => this.handleClick('ContactList')}>
        <h2>Contact List</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <sl-icon name="contact"></sl-icon>
          </div>
        <div class="feature-card" @click=${() => this.handleClick('P2PSync')}>
          <h2>P2P Sync</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <sl-icon name="sync"></sl-icon>
        </div>
        <div class="feature-card" @click=${() => this.handleClick('SecurityZone')}>
          <h2>Security Zone</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <sl-icon name="security"></sl-icon>
        </div>
      </div>
    `;
}
/* eslint-enable lit-a11y/click-events-have-key-events */
}
