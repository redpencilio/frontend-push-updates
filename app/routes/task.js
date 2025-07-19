import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class TaskRoute extends Route {
  @service store;
  @service pushUpdates;

  async model() {
    const currentTasks = await this.store.findAll('task');

    if ( currentTasks.length ) {
      return currentTasks[0];
    } else {
      const task = this.store.createRecord('task', {});
      await task.save();
      return task;
    }
  }

  // Model for deregistering monitoring on unload
  lastModel = null;

  // this should ensure the binding stays fixed
  reloadModel = async () => this.lastModel && await this.lastModel.reload()

  async setupController(_controller, model) {
    super.setupController(...arguments);
    if ( this.lastModel ) {
      await this.pushUpdates.unMonitorResource( { uri: this.lastModel.uri, callback: this.reloadModel } );
    }

    this.lastModel = model;
    await this.pushUpdates.monitorResource( { uri: model.uri, callback: this.reloadModel } );
  }

  async deactivate() {
    super.deactivate(...arguments);
    if ( this.lastModel ) {
      await this.pushUpdates.unMonitorResource( { uri: this.lastModel.uri, callback: this.reloadModel } );
    }
  }
}
