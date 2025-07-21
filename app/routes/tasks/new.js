import Route from '@ember/routing/route';

export default class TasksNewRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);
    controller.reset();
  }
}
