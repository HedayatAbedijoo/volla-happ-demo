import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import "@holochain-open-dev/file-storage/dist/elements/show-image.js";
import "@holochain-open-dev/file-storage/dist/elements/upload-files.js";

@customElement('contact-list')
export class ContactListComponent extends LitElement {
  static styles = css`
  .container {
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content: start;
  }
    h1 {
      font-size: 1.6rem;
      font-weight: 600;
      color: white;
      text-align: center;
    }
    h2 {
      font-size: 1.2rem;
      font-weight: 300;
      color: white;
      text-align: center;
    }

    /* Add additional styling as needed */
  `;

  render() {
    return html`
      <div class="container">
        <h1>Contact List</h1>
        <h2>BACKUP CONTACTS</h2>
        <upload-files></upload-files>
      </div>
    `;
  }
}