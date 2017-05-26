/**
 * @author Ivan Prodaiko <prodaiko94@gmail.com>
 */

"use strict";

const subscribe = times => {
      return function(eventName, ...args) {
          this._events[eventName] = args.reduce((acc, fn) => {
              const toPush = { fn };
              if (times) {
                  Object.assign(toPush, { times, count: 0 });
              }
              acc.push(toPush);
              return acc;
          }, this._events[eventName] || []);
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
    Object.defineProperty(this, '_events', { value: {}, writable: true });
}

/**
 *
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
 *
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
 *
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
 *
 * @param eventName
 * @type string
 * @param ctx
 * @param args
 * @return {EventEmitter}
 */

EventEmitter.prototype.emit = function(eventName, ctx, ...args) {
    if (!this._events[eventName]) return this;
    this._events[eventName] = this._events[eventName].filter(elem => {
        elem.fn.apply(ctx, args);
        if (elem.times) {
            elem.count += 1;
        }
        return elem.count ? (elem.times !== elem.count) : true;
    });
    return this;
};

/**
 *
 * @param eventName
 * @type string
 * @param fns
 * @return {EventEmitter}
 */

EventEmitter.prototype.off = function(eventName, ...fns) {
    if (!this._events[eventName]) return this;
    if (fns.length) {
      const tasksLeft = this._events[eventName].filter(listener => !fns.includes(listener.fn));
      if (tasksLeft.length) {
          this._events[eventName] = tasksLeft;
      } else {
          delete this._events[eventName];
      }
    } else {
      delete this._events[eventName];
    }
    return this;
};

/**
 *
 * @return {EventEmitter}
 */

EventEmitter.prototype.offAll = function () {
    this._events = {};
    return this;
};

/**
 *
 * @param successor
 * @type Object
 */
EventEmitter.extend = function (successor) {
    EventEmitter.call(successor);
    Object.setPrototypeOf(successor, EventEmitter.prototype)
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventEmitter;
}
if (typeof window !== 'undefined' && document) {
    window.EventEmitter = EventEmitter;
}