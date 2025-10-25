import Route from '@ember/routing/route';
import monitorCache from 'ember-polling-push-updates/decorators/monitor-cache'

@monitorCache("/messages?sort=-sent-at")
export default class ChatRoute extends Route {
  async model() {
    return await this.store.query('message', { sort: "-sent-at" })
  }
}
