import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import Component from '@glimmer/component';

export default class Messages extends Component {
  @service store;
  @tracked messages;

  async fetchMessages() {
    this.messages = this.store.findAll('message', { reload: true });
  }
}
