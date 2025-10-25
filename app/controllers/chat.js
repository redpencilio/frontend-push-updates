import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ChatController extends Controller {
  @service store;
  @service pushUpdates;

  @tracked sender = ""
  @tracked message;

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
