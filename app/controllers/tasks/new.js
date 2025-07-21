import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import Controller from '@ember/controller';

export default class TasksNewController extends Controller {
  @service store;
  @service router;

  @tracked taskTitle;
  @tracked taskStatus;

  reset() {
    this.taskTitle = "";
    this.taskStatus = "";
  }

  @action
  async create(event) {
    event.preventDefault();
    const record = this.store.createRecord('task', {
      title: this.taskTitle,
      status: this.taskStatus
    });
    await record.save();
    this.router.transitionTo('tasks.show', record);
  }
}
