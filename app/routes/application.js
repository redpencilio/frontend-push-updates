import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  @service pushUpdates

  async beforeModel() {
    await this.pushUpdates.ensureTabUri();
  }

  async model() {
    return {
      tabUri: this.pushUpdates.tabUri
    }
  }
}
