import { service } from '@ember/service';
import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class TasksEditController extends Controller {
  @service router;

  @action
  async save(event) {
    event.preventDefault();
    await this.model.save();
  }

  @action
  async delete(event) {
    event.preventDefault();
    await this.model.destroyRecord();
    this.router.transitionTo("tasks.index");
  }
}
