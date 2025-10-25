import Route from '@ember/routing/route';
import { service } from '@ember/service';
import monitorCache from 'ember-polling-push-updates/decorators/monitor-cache';

@monitorCache("/tasks")
export default class TasksIndexRoute extends Route {
  @service store;

  async model() {
    return await this.store.query('task', {});
  }
}
