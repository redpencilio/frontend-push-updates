import { setupTest } from 'frontend-push-updates/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | task', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('task', {});
    assert.ok(model, 'model exists');
  });
});
