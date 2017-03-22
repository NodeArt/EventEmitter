"use strict";

const subscribe = once => {
      return function(eventName, ...args) {
          const arrOfSubscribers = this.events[eventName] || [];
          args.forEach(fn => arrOfSubscribers.push({ fn: fn, once: once }));
          this.events[eventName] = arrOfSubscribers;
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

EventEmitter.prototype.emit = function(eventName, ...args) {
    if (!this.events[eventName]) return this;
    for (let i = 0; i < this.events[eventName].length; i++) {
        let obj = this.events[eventName][i];
        obj.fn(...args);
        if (obj.once) {
            this.events[eventName].splice(i, 1);
        }
    }
    return this;
};

EventEmitter.prototype.off = function(eventName, ...fns) {
    if (!this.events[eventName]) return this;
    fns.length > 0 ?
      this.events[eventName] = this.events[eventName].filter(listener => !fns.includes(listener.fn)) :
      delete this.events[eventName];
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