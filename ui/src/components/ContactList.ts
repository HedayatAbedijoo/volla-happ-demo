import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';

import './Backup';

@customElement('contact-list')
export class ContactListComponent extends LitElement {
  @state() loading = true;
  
  activeComponent: string | undefined = undefined;

  handleNavigate(event: any) {
    this.loading = true;
    this.activeComponent = event;

    this.loading = false;
  }

  renderTitle() {
    switch (this.activeComponent) {
      case 'Restore':
        return html`<h2>RESTORE CONTACTS</h2>`;
      case 'Edit':
        return html`<h2>EDIT CONTACTS</h2>`;
      default:
        return html`<h2>BACKUP CONTACTS</h2>`;
    }
  }

  isActive(componentName: string) {
    if (this.activeComponent === componentName){
      return "active";
    }
    return "inactive"
  }
  renderNavItems() {
    switch (this.activeComponent) {
      case 'Restore':
        return html`
        <button class="nav-button" @click=${() => this.handleNavigate('Backup')}><sl-icon name="cloud-upload" label="Upload"></button>
        <button class="nav-button active" @click=${() => this.handleNavigate('Restore')}><sl-icon name="box-arrow-in-down" label="Download"></button>
        <button class="nav-button" @click=${() => this.handleNavigate('Edit')}><sl-icon name="pencil-square" label="Edit"></button>`;
      case 'Edit':
        return html`
        <button class="nav-button" @click=${() => this.handleNavigate('Backup')}><sl-icon name="cloud-upload" label="Upload"></button>
        <button class="nav-button" @click=${() => this.handleNavigate('Restore')}><sl-icon name="box-arrow-in-down" label="Download"></button>
        <button class="nav-button active" @click=${() => this.handleNavigate('Edit')}><sl-icon name="pencil-square" label="Edit"></button>`;
      default:
        return html`
        <button class="nav-button active" @click=${() => this.handleNavigate('Backup')}><sl-icon name="cloud-upload" label="Upload"></button>
        <button class="nav-button" @click=${() => this.handleNavigate('Restore')}><sl-icon name="box-arrow-in-down" label="Download"></button>
        <button class="nav-button" @click=${() => this.handleNavigate('Edit')}><sl-icon name="pencil-square" label="Edit"></button>`;
    }
  }
  renderActiveComponent() {
    switch (this.activeComponent) {
      case 'Restore':
        return html`<contact-restore></contact-restore>`;
      case 'Edit':
        return html`<contact-edit></contact-edit>`;
      default:
        return html`<contact-backup></contact-backup>`;
    }
  }
  
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
    nav {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100vw;
    }
    .nav-group {
      margin: 0 auto;
      display:flex;
      width: 100vw;
      height: 4rem;
    }
    .nav-button {
      flex-grow: 1;
      display: grid;
      place-content: center;
      cursor: pointer;
    }
    .nav-button.active {
      color: var(--sl-color-primary-400) !important;
    }
    
    .nav-button, button {
      height: 4rem !important;
    }
    button:hover {
      text-color: var(--sl-color-primary-500) !important;
    }
    button {
      width: 33vw !important;
      height: 100% !important;
      background-color: var(--sl-color-neutral-700) !important;
      border-color: var(--sl-color-neutral-300) !important;
      color: var(--sl-color-neutral-100) !important;
      font-size: 3.5rem;
    }
  `;

  render() {
    return html`
    <div class="container">
      <h1>Contact List</h1>
      ${this.renderTitle()}
      ${this.renderActiveComponent()}
      <nav>
      <div class="nav-group">
         ${this.renderNavItems()}
      </div>
      </nav>
    </div>
    `;
  }
}