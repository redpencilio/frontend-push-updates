import EmberRouter from '@ember/routing/router';
import config from 'frontend-push-updates/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('chat');
  this.route('task');
  this.route('tasks', function() {
    this.route('new');
    this.route('edit', { path: "/:task_id/edit" });
    this.route('show', { path: "/:task_id" } );
  });
});
