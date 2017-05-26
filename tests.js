/**
 * Created by Ivan on 16-Apr-17.
 */
"use strict";

const assert = require('assert');
const EventEmitter = require('./src/');

const events = new EventEmitter();

const ctx = { ctx : true };

events
  .once(
    'event1',
    (...args) => console.log('once1', ...args),
    (...args) => console.log('once2', ...args)
  )
  .on('event1',
    function () {
      assert.deepEqual(this, ctx, 'Context test error');
    },
    () => assert.deepEqual(this, {}, 'Context test error')
  )
  .emit('event1', ctx, 1, 2, 3);

assert.equal(Object.keys(events._events['event1']).length, 2, 'Once test error');

const fn = (...args) => assert.deepEqual(args, [1, 2, 3], 'Args test error');

events
  .on('event2', fn)
  .emit('event2', null, 1, 2, 3)
  .off('event2', fn);

assert.equal(events._events['event2'], undefined, 'Off test error');

events
  .on('event2', fn)
  .offAll();

assert.deepEqual(events._events, {}, 'OffAll test error');