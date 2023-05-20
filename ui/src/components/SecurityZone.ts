import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('security-zone')
export class ContactListComponent extends LitElement {
  static styles = css`
    .container {
      padding: 1rem;
       
    }

    h1 {
      font-size: 1.6rem;
      font-weight: 600;
    }

    /* Add additional styling as needed */
  `;

  render() {
    return html`
      <div class="container">
        <h1>Contact List</h1>
        <!-- Add your contact list content here -->
      </div>
    `;
  }
}