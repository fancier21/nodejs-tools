class EventEmitter {
  constructor() {
    this._map = new Map()
  }

  emmit(eventName, ...args) {
    const listeners = this._map.get(eventName)
    listeners.forEach(cur => cur(...args));
  }

  on(eventName, listener) {
    const listeners = this._map.get(eventName)
    if (listeners) {
      this._map.set(eventName, listeners.concat(listener))
    } else {
      this._map.set(eventName, [listener])
    }
  }

  removeListener(eventName, listener) {
    const listeners = this._map.get(eventName)
    this._map.set(eventName, listeners.filter(cur => cur !== listener))
  }
}

const emitter = new EventEmitter()

const someEventListener = (...args) => console.log('some event: ', ...args)
const someEventListener1 = (...args) => console.log('some event1: ', ...args)

emitter.on('someEvent', someEventListener)
emitter.on('someEvent1', someEventListener1)

emitter.emmit('someEvent', 'firstArg', 'secondArg')
emitter.emmit('someEvent1', 'firstArg1', 'secondArg1')
// emitter.removeListener('someEvent', someEventListener)
