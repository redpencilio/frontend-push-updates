import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service('store') store;
  @service pushUpdates;
  @tracked message;
  @tracked messages;
  @tracked sender = "";

  constructor() {
    super(...arguments);
    this.setupMonitor();
  }

  get pushMessages() {
    return this.pushUpdates.messages;
  }

  @action
  async fetchMessages() {
    this.messages = await this.store.query('message', { sort: "-sent-at" });
  }

  resetMessage() {
    this.message = this.store.createRecord('message');
  }

  setupMonitor() {
    this.pushUpdates.addHandler("http://services.semantic.works/cache-monitor", () => {
      console.log(`Got cache monitor message ${[...arguments]}`);
      this.fetchMessages()
    });
  }

  // removeMonitor() {
  //   this.pushUpdates.removeHandler("http://services.semantic.works/cache-monitor", this.fetchMessages);
  // }

  @action
  addMessage(event) {
    event.preventDefault();
    this.message.sentAt = new Date();
    this.message.sender = this.sender;
    this.message.save();
    this.resetMessage();
  }
}
