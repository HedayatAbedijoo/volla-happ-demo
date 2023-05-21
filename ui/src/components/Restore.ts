import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import "@holochain-open-dev/file-storage/dist/elements/show-image.js";
import "@holochain-open-dev/file-storage/dist/elements/upload-files.js";
import '@shoelace-style/shoelace/dist/components/select/select.js';


@customElement('contact-restore')
export class ContactListBackupComponent extends LitElement {
    @property({ type: Array }) files!: string[];
    
  render() {
    return html` <div class="wrapper">
    <h2>Files:</h2>
    <sl-select class="file-select sl-theme-light" label="Select a backup to restore" value="option-1 option-2 option-3" multiple clearable>
    ${this.files.map((file) => html`<sl-option  class="file-option" value="${file}">${file}</sl-option><br />`)}
    </sl-select></div>`;
  }

  static styles = css`
  .wrapper {
  height: 80vh;
  display:grid;
  place-content: center;
  }
  h1, h2, p {
    color: white;

    }
  .file-select, .file-option, .select__combobox {
    background-color: white !important;
    color: black !important;
    width: 90vw;
    transform: scale: 1.5;
    }
`;
}