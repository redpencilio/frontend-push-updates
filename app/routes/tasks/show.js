import Route from '@ember/routing/route';
import { service } from '@ember/service';
import monitorModelUri from 'ember-polling-push-updates/decorators/monitor-model-uri';

@monitorModelUri
export default class TasksShowRoute extends Route {
  @service store;

  async model({task_id}) {
    return this.store.findRecord('task', task_id);
  }
}
