import Model, { attr } from '@ember-data/model';

export default class MessageModel extends Model {
  @attr('string') sender;
  @attr('string') content;
  @attr('date') sentAt;
}
