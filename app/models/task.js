import Model, { attr } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') status;
  @attr('string') title;
  @attr('string') uri;
}
