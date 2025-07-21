import { module, test } from 'qunit';
import { setupTest } from 'frontend-push-updates/tests/helpers';

module('Unit | Route | tasks/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:tasks/edit');
    assert.ok(route);
  });
});
