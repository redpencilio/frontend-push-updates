import { service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  @service pushUpdates
  @service store

  async beforeModel() {
    await this.pushUpdates.ensureTabUri();
  }

  async model() {
    return {
      tabUri: this.pushUpdates.tabUri,
      chat: await this.store.findAll('message')
    }
  }

  async afterModel() {
    // Ask cache-monitor to monitor /messages for us
    const queryParams = new URLSearchParams(
      { tab: this.pushUpdates.tabUri,
        path: "/messages"
      });
    await fetch(`/cache-monitor/monitor?${queryParams}`,
      {
        method: "POST",
        headers: { 'accept': 'application/vnd.api+json' }
      });
  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.resetMessage();
  }

}
