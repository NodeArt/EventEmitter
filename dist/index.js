"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
            }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
        "use strict";

        var subscribe = function subscribe(once) {
            return function (eventName) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                this.events[eventName] = args.reduce(function (acc, fn) {
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

        EventEmitter.prototype.on = function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return on.apply(this, args);
        };

        EventEmitter.prototype.once = function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            return once.apply(this, args);
        };

        EventEmitter.prototype.emit = function (eventName) {
            var _this = this;

            for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
                args[_key4 - 1] = arguments[_key4];
            }

            if (!this.events[eventName]) return this;
            this.events[eventName] = this.events[eventName].filter(function (elem) {
                elem.fn.apply(_this, args);
                return !elem.once;
            });
            return this;
        };

        EventEmitter.prototype.off = function (eventName) {
            for (var _len5 = arguments.length, fns = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                fns[_key5 - 1] = arguments[_key5];
            }

            if (!this.events[eventName]) return this;
            fns.length > 0 ? this.events[eventName] = this.events[eventName].filter(function (listener) {
                return !fns.includes(listener.fn);
            }) : delete this.events[eventName];
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
    }, {}] }, {}, [1]);