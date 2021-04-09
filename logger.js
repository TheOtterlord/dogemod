const fs = require('fs')

class Logger {
  constructor() {
    this.cache = []
  }

  message(msg) {
    const text = `${msg.author.username}: ${msg.content}`
    this.log(text)
  }

  log(text) {
    this.cache.push(`[${this.timestamp()}] ${text}\n`)
    console.log(`\x1b[1m[${this.timestamp()}] \x1b[0m${text}`)
  }

  timestamp() {
    return (new Date()).toISOString()
  }

  save() {
    var text = `DogeMod Logs: saved at ${this.timestamp()} \n`.concat(...this.cache)
    fs.writeFileSync(`${this.timestamp().replaceAll(':','-').split('.')[0]}.log`, text)
  }
}

module.exports = Logger
