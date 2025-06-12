import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

export default class PushUpdatesService extends Service {
  @tracked tabUri;
  @tracked tabUriP;

  handlers = {};

  // This is a current hack so we can easily render the messages somewhere
  @tracked messages = [];

  constructor() {
    super(...arguments);

    this.startQueryLoop();
  }

  addHandler( kind, functor ) {
    this.handlers[kind] ||= [];
    this.handlers[kind].push( functor );
  }

  removeHandler( kind, functor ) {
    this.handlers[kind] =
      (this.handlers[kind] || [])
        .filter( (element) => element === functor );
  }

  async ensureTabUri() {
    if( ! this.tabUriP ) {
      this.tabUriP = new Promise( async (acc, rej) => {
        try {
          const body = await fetch(`/polling/tabUri`);
          const resp = await body.json();
          const tabUri = resp.data.attributes.tabUri;
          this.tabUri = tabUri;
          acc(tabUri);
        } catch (e) {
          console.error(`Could not get tab URI  ${e}`);
          rej();
        }
      });
    }
    return await this.tabUriP;
  }

  async startQueryLoop() {
    const tabUri = await this.ensureTabUri();
    while (true) {
      try {
        const messages = (await (await fetch(`/polling/messages?tab=${encodeURIComponent(tabUri)}`)).json()).data;

        // create a visible set of messages
        const newVisibleMessages = messages
              .map( ({attributes}) => `${attributes.content} ${attributes.channel ? `BY ${attributes.channel}` : ""}` );
        this.messages = [...newVisibleMessages,...this.messages];

        // call processors if they exist
        messages
          .forEach(
            (message) => this
                         .handlers[message.attributes.channel]
                         ?.forEach(
                           (handler) => { try {
                             handler.call(message.attributes.content)
                           } catch (e) {
                             console.warn(`Handler did not respond to message`, { handler, message, e })
                           } }));
      } catch (e) {
        console.warn(`Failed to poll messages ${e}.`);
      }
      await timeout( 2000 );
    }
  }
}

function timeout(ms) {
  return new Promise((acc) =>
    setTimeout(() => acc(), ms)
  );
}
