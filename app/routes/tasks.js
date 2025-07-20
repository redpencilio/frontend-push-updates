import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class TasksRoute extends Route {
  @service store;
  @service pushUpdates;

  async model() {
    return this.store.findAll('task');
  }

  refresh = () => this.router.refresh(this.routeName);

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
