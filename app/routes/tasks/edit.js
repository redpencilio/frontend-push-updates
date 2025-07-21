import { inject as service } from '@ember/service';
import ResourceUriMonitoringRouteRoute from '../resource-uri-monitoring-route';

export default class TasksEditRoute extends ResourceUriMonitoringRouteRoute {
  @service store;

  async model({task_id}) {
    return await this.store.findRecord('task', task_id);
  }
}
