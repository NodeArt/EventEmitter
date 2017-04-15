"use strict";

const subscribe = once => {
      return function(eventName, ...args) {
          this.events[eventName] = args.reduce((acc, fn) => {
              acc.push({ fn: fn, once: once });
              return acc;
          }, this.events[eventName] || []);
          return this;
      };
  },
  on = subscribe(false),
  once = subscribe(true);

function EventEmitter() {
    this.events = {};
}

EventEmitter.prototype.on = function (...args) {
    return on.apply(this, args);
};

EventEmitter.prototype.once = function (...args) {
    return once.apply(this, args);
};

EventEmitter.prototype.emit = function(eventName, ctx, ...args) {
    if (!this.events[eventName]) return this;
    this.events[eventName] = this.events[eventName].filter(elem => {
        elem.fn.apply(ctx, args);
        return !elem.once;
    });
    return this;
};

EventEmitter.prototype.off = function(eventName, ...fns) {
    if (!this.events[eventName]) return this;
    if (fns.length) {
      const tasksLeft = this.events[eventName].filter(listener => !fns.includes(listener.fn));
      if (tasksLeft.length) {
          this.events[eventName] = tasksLeft;
      } else {
          delete this.events[eventName];
      }
    } else {
      delete this.events[eventName];
    }
    return this;
};

EventEmitter.prototype.offAll = function () {
    this.events = {};
    return this;
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventEmitter;
}
if (typeof window !== 'undefined' && document) {
    window.EventEmitter = EventEmitter;
}