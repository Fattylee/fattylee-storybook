

const EventEmitter = require('events');

const emitter = new EventEmitter();

module.exports.emitter = emitter;
console.log('event module called');

class MyEvent extends EventEmitter {
  hacker() {
    this.emit('hacker', 
  {name: 'abu lubaaba', gender: 'unknown'});
  } 
}




exports.MyEvent = MyEvent;

//console.log(module)