import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('p2p-sync')
export class P2PSyncComponent extends LitElement {
  static styles = css`
  h1 {
    font-size: 1.6rem;
  }
  h1, p {
    font-weight: 600;
    color: white;
  }

  /* Add additional styling as needed */
`;

render() {
  return html`
    <div class="container">
      <h1>Concept</h1>
      <p>Yet to be developed</p>
    </div>
  `;
}
}