const fs = require('fs')
const path = require('path')
const { EventEmitter } = require('events')

const pathToDir = path.join(__dirname, './content')

class Watcher extends EventEmitter {
  constructor(pathDir) {
    super()
    this._dir = pathDir
    this._hash = new Map()
  }

  start() {
    this.stop()
    this._intervalId = setInterval(() => this.checkDirectory(), 1000)
  }

  stop() {
    clearInterval(this._intervalId)
  }

  checkDirectory() {
    fs.readdir(this._dir, (err, dir) => {
      if (err) {
        console.log('dir error', err)
        return
      }

      dir.forEach(cur => {
        const pathToFile = path.join(this._dir, cur)
        fs.readFile(pathToFile, 'utf-8', (err, file) => {
          if (err) {
            console.log('read error', err)
            return
          }

          const prevState = this._hash.get(pathToFile)
          if (prevState !== file) {
            this.emit('change', pathToFile)
            // console.log(`${cur} was changed`)
          }
          this._hash.set(pathToFile, file)
        })
      })
    })
  }
}

const watcher = new Watcher(pathToDir)
watcher.start()

watcher.on('change', (file) => console.log('changed', file))
