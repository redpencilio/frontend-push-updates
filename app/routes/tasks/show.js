import { service } from '@ember/service';
import ResourceUriMonitoringRouteRoute from '../resource-uri-monitoring-route';

export default class TasksShowRoute extends ResourceUriMonitoringRouteRoute {
  @service store;

  async model({task_id}) {
    return this.store.findRecord('task', task_id);
  }
}
