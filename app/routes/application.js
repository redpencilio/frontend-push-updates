import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);
    controller.resetMessage();
  }
}
