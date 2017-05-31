/**
 * @author Ivan Prodaiko <prodaiko94@gmail.com>
 */

"use strict";

const subscribe = times => {
    return function(eventName, ...args) {
      this._events.set(
        eventName,
        args.reduce((acc, fn) => {
          const toPush = { fn };
          if (times) {
            Object.assign(toPush, { times, count: 0 });
          }
          acc.push(toPush);
          return acc;
        }, this._events.get(eventName) || [])
      );
      return this;
    };
  },
  on = subscribe(),
  once = subscribe(1);

/**
 * Creates a new EventEmitter
 * @constructor
 */

function EventEmitter() {
  /**
   * @private _events
   */
  Object.defineProperty(this, '_events', { value: new Map() });
}

/**
 * Subscribe once
 * @param eventName
 * @type string
 * @param args
 * @type Function
 * @return {EventEmitter}
 */

EventEmitter.prototype.once = function (eventName, ...args) {
  return once.apply(this, [eventName, ...args]);
};

/**
 * Subscribe for particular number of times
 * @param eventName
 * @type string
 * @param times
 * @type number
 * @param args
 * @type Function
 * @return {EventEmitter}
 */

EventEmitter.prototype.times = function (eventName, times, ...args) {
  return times > 0 ? subscribe(times).apply(this, [eventName, ...args]) : this;
};

/**
 * Subscribe until unsubscribe will be called
 * @param eventName
 * @type string
 * @param args
 * @type Function
 * @return {EventEmitter}
 */

EventEmitter.prototype.on = function (eventName, ...args) {
  return on.apply(this, [eventName, ...args]);
};

/**
 * Emit event
 * @param eventName
 * @type string
 * @param ctx
 * @param args
 * @return {EventEmitter}
 */

EventEmitter.prototype.emit = function(eventName, ctx, ...args) {
  if (!this._events.has(eventName)) return this;
  const listeners = this._events.get(eventName).filter(elem => {
    elem.fn.apply(ctx, args);
    if (elem.times) {
      elem.count += 1;
    }
    return elem.count ? (elem.times !== elem.count) : true;
  });
  listeners.length ? this._events.set(eventName, listeners) : this._events.delete(eventName);
  return this;
};

/**
 * Unsubscribe from event
 * @param eventName
 * @type string
 * @param fns
 * @return {EventEmitter}
 */

EventEmitter.prototype.off = function(eventName, ...fns) {
  if (!this._events.has(eventName)) return this;
  if (fns.length) {
    const tasksLeft = this._events.get(eventName).filter(listener => !fns.includes(listener.fn));
    if (tasksLeft.length) {
      this._events.set(eventName, tasksLeft);
    } else {
      this._events.delete(eventName);
    }
  } else {
    this._events.delete(eventName);
  }
  return this;
};

/**
 * Unsubscribe from all events at once
 * @return {EventEmitter}
 */

EventEmitter.prototype.offAll = function () {
  this._events.clear();
  return this;
};

/**
 * Set EventEmitter as prototype of an object
 * @param successor
 * @type Object
 */
EventEmitter.inherit = function (successor) {
  EventEmitter.call(successor);
  Object.setPrototypeOf(successor, EventEmitter.prototype);
  return successor;
};

/**
 * Use EventEmitter as a mixin for object
 * @param successor
 * @type Object
 */
EventEmitter.extend = function (successor) {
  EventEmitter.call(successor);
  Object.assign(successor, EventEmitter.prototype);
  return successor;
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EventEmitter;
}
if (typeof window !== 'undefined' && document) {
  window.EventEmitter = EventEmitter;
}