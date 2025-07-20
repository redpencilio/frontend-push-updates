import { inject as service } from '@ember/service';
import ResourceUriMonitoringRouteRoute from './resource-uri-monitoring-route';

export default class TaskRoute extends ResourceUriMonitoringRouteRoute {
  @service store;

  async model() {
    const currentTasks = await this.store.findAll('task');

    if ( currentTasks.length ) {
      return currentTasks[0];
    } else {
      const task = this.store.createRecord('task', {});
      await task.save();
      return task;
    }
  }
}
