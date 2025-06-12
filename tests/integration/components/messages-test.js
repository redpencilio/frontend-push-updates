import { module, test } from 'qunit';
import { setupRenderingTest } from 'frontend-push-updates/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | messages', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Messages />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <Messages>
        template block text
      </Messages>
    `);

    assert.dom().hasText('template block text');
  });
});
