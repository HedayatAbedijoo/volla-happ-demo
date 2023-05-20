import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@holochain-open-dev/profiles/dist/elements/list-profiles';

@customElement('p2p-sync')
export class P2PSyncComponent extends LitElement {
  static styles = css`
  .container {
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content: start;
    font-size: 1.3rem; 
  }
  li, h1, h2 {
    color: white;
  }

  li {
    padding: .5rem 0 ;
  }

  h1 {
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 300;
    text-align: center;
  }
`;

render() {
  return html`
    <div class="container">
      <h1>P2P Sync</h1>
      <h2>INSTRUCTIONS</h2>
      <ol>
        <li>Write down a <em>network seed</em> and enter it when launching this app</li>
        <li>Share it with trusted parties</li>
        <li>Get them to run this same app file from the launcher <em style="font-weight: bold">with your network seed</em></li>
      </ol>
      <ul>
        <li>Your recipient will apear below when they have joined the network</li>
        <li>They will be able to see your shared backups/templates on the other pages</li>
      </ul>
      <h2>Available Peers:</h2>
      <list-profiles style="margin: .4rem auto"></list-profiles>
    </div>
  `;
}
}