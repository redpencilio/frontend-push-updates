import { module, test } from 'qunit';
import { setupTest } from 'frontend-push-updates/tests/helpers';

module('Unit | Route | tasks/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:tasks/new');
    assert.ok(route);
  });
});
