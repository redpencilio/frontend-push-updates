import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import monitorModelUri from 'ember-polling-push-updates/decorators/monitor-model-uri';

@monitorModelUri
export default class TasksEditRoute extends Route {
  @service store;

  async model({task_id}) {
    return await this.store.findRecord('task', task_id);
  }
}
