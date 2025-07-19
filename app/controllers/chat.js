import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ChatController extends Controller {
  @service store;
  @service pushUpdates;

  @tracked sender = ""
  @tracked message;
  @tracked messages;

  constructor() {
    super(...arguments);

    this.pushUpdates.monitorCache({
      path: "/messages?sort=-sent-at",
      callback: async () =>
        this.messages = await this.store.query('message', { sort: "-sent-at" })
    });
  }

  resetMessage() {
    this.message = this.store.createRecord('message');
  }

  @action
  addMessage(event) {
    event.preventDefault();
    this.message.sentAt = new Date();
    this.message.sender = this.sender;
    this.message.save();
    this.resetMessage();
  }
}
