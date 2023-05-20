import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AppAgentClient, AppAgentWebsocket } from '@holochain/client';
import { contextProvider } from '@lit-labs/context';
import { Profile, ProfilesStore, ProfilesClient } from "@holochain-open-dev/profiles";
import { FileStorageClient } from "@holochain-open-dev/file-storage";

import { AsyncStatus, StoreSubscriber } from '@holochain-open-dev/stores';

import '@shoelace-style/shoelace/dist/themes/dark.css';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import "@holochain-open-dev/file-storage/dist/elements/file-storage-context.js";
import "@holochain-open-dev/profiles/dist/elements/profiles-context.js";
import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';
import '@holochain-open-dev/profiles/dist/elements/profile-prompt.js';
import '@holochain-open-dev/profiles/dist/elements/profile-list-item-skeleton.js';

import './components/ContactList';
import './components/P2PSync';
import './components/SecurityZone';
import './home';

import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import { clientContext } from './contexts';
// Set the base path to the folder you copied Shoelace's assets to
setBasePath('/');

@customElement('app-root')
export class AppComponent extends LitElement {
  @state() loading = true;

  @state() result: string | undefined;

  @contextProvider({ context: clientContext })
  @property({ type: Object })
  client!: AppAgentClient;

  @property({ type: Object })
  profilesStore!: ProfilesStore;

  @state() profileCreated = false;
  
  _myProfile!: StoreSubscriber<AsyncStatus<Profile | undefined>>;

  fileStorageClient!: any;
  
  async firstUpdated() {
    this.client = await AppAgentWebsocket.connect(`ws://localhost:23185`, 'hello-world');

    this.fileStorageClient = new FileStorageClient(this.client, 'hello_world');

    this.profilesStore = new ProfilesStore(new ProfilesClient(this.client, 'hello_world'), {
      avatarMode: "avatar-optional",
    });

    this._myProfile = new StoreSubscriber(
      this,
      () => this.profilesStore.myProfile
    );
    let profileExists;
    try {
      // eslint-disable-next-line no-console
      console.log(this.client.myPubKey, 'client pubkey')
      profileExists = await this.client.callZome({
        role_name: "hello_world",
        zome_name: "profiles",
        fn_name: "get_agent_profile",
        payload: this.client.myPubKey
      }); 
      // eslint-disable-next-line no-console
      console.log(profileExists, 'client pubkey')
    } catch (error) {

    // eslint-disable-next-line no-console
      console.log("error fetching profile")
    }

    this.profileCreated =  !!profileExists;
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
      background-size: cover;
      background-repeat: no-repeat;
    }

    .spinner {
      width: 20vh;
      height: 20vh;
      margin: auto auto
    }

    .create-profile {
      display: grid;
      place-content: center;
      height: 100vh;
    }
  `;

  activeComponent: string | undefined = undefined;

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

  renderMyProfile() {
    switch (this._myProfile.value.status) {
      case 'pending':
        return html`<profile-list-item-skeleton></profile-list-item-skeleton>`;
      case 'complete':
        if (!this._myProfile.value.value) return html``;

        return html`<div
          class="row"
          style="align-items: center;"
          slot="actionItems"
        >
          <agent-avatar .agentPubKey=${this.client.myPubKey}></agent-avatar>
          <span style="margin: 0 16px;">${this._myProfile.value.value?.nickname}</span>
        </div>`;
      case 'error':
            // eslint-disable-next-line no-console
      console.log("ERROR", this._myProfile.value)
        return html`<p>Error fetcing profile: ${this._myProfile.value.error.data.data}</p>`;
      default:
        return html``
    }
  }

  goHome() {
    this.loading = true;
    this.activeComponent = undefined;
    this.loading = false;
  }

  renderActiveComponent() {
    switch (this.activeComponent) {
      case 'ContactList':
        return html`<sl-icon-button @click=${this.goHome} name="arrow-return-left" label="Return" style="font-size: 2.5rem; position: fixed; left: 1rem; top: 1rem; "></sl-icon-button><contact-list></contact-list>`;
      case 'P2PSync':
        return html`<sl-icon-button @click=${this.goHome} name="arrow-return-left" label="Return" style="font-size: 2.5rem; position: fixed; left: 1rem; top: 1rem; "></sl-icon-button><p2p-sync></p2p-sync>`;
      case 'SecurityZone':
        return html`<sl-icon-button @click=${this.goHome} name="arrow-return-left" label="Return" style="font-size: 2.5rem; position: fixed; left: 1rem; top: 1rem; "></sl-icon-button><security-zone></security-zone>`;
      default:
        return html`<app-home></app-home>`;
    }
  }

  render() {
    if (this.loading)
    return html`<sl-spinner class="spinner"></sl-spinner>`;
    if (!this.profileCreated) return html`
      <profiles-context .store="${this.profilesStore}">
      <div class="container">
        <create-profile class="create-profile" @profile-created=${() => {
          this.profileCreated = true;
        }}>${this.renderMyProfile()}</create-profile>
      </div>
      </profiles-context>
    `;
    return html`
      <profiles-context .store=${this.profilesStore}>
        <file-storage-context .client=${this.fileStorageClient}>
          <div class="container">
          ${this.renderActiveComponent()}
          </div>
        </file-storage-context>
      </profiles-context>
    `;
  }
}