import Route from '@ember/routing/route';

export default class ChatRoute extends Route {
  setupController(controller) {
    super.setupController(...arguments);
    controller.resetMessage();
  }
}
