import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AppAgentClient, AppAgentWebsocket } from '@holochain/client';
import { contextProvider } from '@lit-labs/context';
import { ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";

import { clientContext } from './contexts';
import '@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js';

import "@holochain-open-dev/profiles/dist/elements/profiles-context.js";
import './components/ContactList';
import './components/P2PSync';
import './components/SecurityZone';
import './home';

@customElement('app-root')
export class AppComponent extends LitElement {
  @state() loading = true;

  @state() result: string | undefined;

  @contextProvider({ context: clientContext })
  @property({ type: Object })
  client!: AppAgentClient;

  @property({ type: Object })
  profilesStore!: ProfilesStore;

  async firstUpdated() {
    this.client = await AppAgentWebsocket.connect(`ws://localhost:16662`, 'hello-world');

    this.profilesStore = new ProfilesStore(new ProfilesClient(this.client, 'hello-world'), {
      avatarMode: "avatar-optional",
    });

    this.loading = false;
  }
  static styles = css`
    .container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Poppins', sans-serif;
      background-image: url("../assets/bg.jpg");
    }
  `;

  activeComponent: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('navigate', this.handleNavigate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('navigate', this.handleNavigate);
  }

  handleNavigate(event: Event) {
    this.loading = true;
    const componentName = (event as CustomEvent).detail;
    this.activeComponent = componentName;
    this.loading = false;
  }

  renderActiveComponent() {
    switch (this.activeComponent) {
      case 'ContactList':
        return html`<contact-list></contact-list>`;
      case 'P2PSync':
        return html`<p2p-sync></p2p-sync>`;
      case 'SecurityZone':
        return html`<security-zone></security-zone>`;
      default:
        return html`<app-home></app-home>`;
    }
  }

  render() {
    if (this.loading)
    return html`
      <p>Loading</p>
    `;
    
    // eslint-disable-next-line no-console
    console.log("RENDERED PAGE", this.renderActiveComponent())
    return html`
      <profiles-context .store=${this.profilesStore}>
        <div class="container">
        ${this.renderActiveComponent()}
        </div>
      </profiles-context>
    `;
  }
}