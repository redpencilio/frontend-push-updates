import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TasksIndexRoute extends Route {
  @service store;
  @service pushUpdates;
  @service router;

  async model() {
    return await this.store.query('task', {});
  }

  refresh = () => {
    this.router.refresh(this.routeName);
  }

  async activate() {
    this.pushUpdates.monitorCache({
      path: "/tasks",
      callback: this.refresh,
      initial: false
    });
  }

  async deactivate() {
    this.pushUpdates.unMonitorCache({
      path: "/tasks",
      callback: this.refresh
    })
  }
}
