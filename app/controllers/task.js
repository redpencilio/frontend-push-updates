import { action } from '@ember/object';
import Controller from '@ember/controller';

export default class TaskController extends Controller {
  @action
  saveTask(event) {
    event.preventDefault();
    this.model.save();
  }
}
