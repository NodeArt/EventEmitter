[![bitHound Overall Score](https://www.bithound.io/github/NodeArt/EventEmitter/badges/score.svg)](https://www.bithound.io/github/NodeArt/EventEmitter)
[![bitHound Dependencies](https://www.bithound.io/github/NodeArt/EventEmitter/badges/dependencies.svg)](https://www.bithound.io/github/NodeArt/EventEmitter/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/NodeArt/EventEmitter/badges/code.svg)](https://www.bithound.io/github/NodeArt/EventEmitter)

Methods:
```javascript
const EventEmitter = require('@nodeart/event_emitter');
const events = new EventEmitter();
events.on(eventName, ...fns)
events.once(eventName, ...fns)
events.off(eventName, ...fns) 
events.offAll()
events.emit(eventName, ...args)
// One can remove some functions from listeners array by passing them to .off method,
// but to remove particular event use .off with eventName only;
```
Features:
1) any number of functions can be put as listeners
2) chaining available
3) can be used in node.js and in browser 
  
