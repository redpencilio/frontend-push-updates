import { setupTest } from 'frontend-push-updates/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | message', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('message', {});
    assert.ok(model, 'model exists');
  });
});
