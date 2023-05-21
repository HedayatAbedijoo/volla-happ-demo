import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

@customElement('app-home')
export class HomeComponent extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 2rem 1rem;
      color: rgba(255,255,255,1.00);
      background-color: rgba(0,0,0,0.80);
      max-height: 100vh;
    }

    .logo {
      margin-bottom: 16px;
    }

    .feature-card {
      flex: 1;
      padding: 1rem;
      transition: background-color 0.3s, border 0.3s;
      display: flex;
      justify-content: space-between;
    }

    .details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    }

    .feature-card:active {
      background-color: #f5f5f5;
      border: 2px solid purple;
      border-radius: 8px;
    }

    h2 {
      font-size: 1.6rem;
      font-weight: 600;
    }

    em {
      font-weight: 500;
    }
    p {
      font-size: 1.2rem;
      font-weight: 300;
      text-align: center;
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
        <div class="details">
          <h2>Contact List</h2>
          <p><em>Backup</em> and <em>restore</em> your Volla contacts</p>
        </div>         <sl-icon-button name="people" label="Contact List" style="font-size: 2.5rem; margin-top: 1rem;"></sl-icon-button>
          </div>
        <div class="feature-card" @click=${() => this.handleClick('P2PSync')}>
          <div class="details">
            <h2>P2P Sync</h2>
            <p>Share resources <em>securely</em> with <em>trusted</em> parties</p>
          </div>
          <sl-icon-button name="arrow-left-right" label="P2P Sync" style="font-size: 2.5rem; margin-top: 1rem;"></sl-icon-button>
        </div>
        <div class="feature-card" @click=${() => this.handleClick('SecurityZone')}>
          <div class="details">
            <h2>Security Zone</h2>
            <p><em>Create</em> and <em>store</em> domain whitelists and security templates ready to share</p>
          </div>
          <sl-icon-button name="shield-lock" label="Security" style="font-size: 2.5rem; margin-top: 1rem; color: white;"></sl-icon-button>
        </div>
      </div>
    `;
}
/* eslint-enable lit-a11y/click-events-have-key-events */
}
