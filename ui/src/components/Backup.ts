import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import "@holochain-open-dev/file-storage/dist/elements/show-image.js";
import "@holochain-open-dev/file-storage/dist/elements/upload-files.js";

@customElement('contact-backup')
export class ContactListBackupComponent extends LitElement {
  static styles = css`
    .wrapper {
      height: 80vh;
      display:grid;
      place-content: center;
    }
  `;

  render() {
    return html` <div class="wrapper"><upload-files></upload-files></div>`;
  }
}