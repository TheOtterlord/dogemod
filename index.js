const { Client, EVENT } = require('dogehouse.js')
const { TOKEN, REFRESH_TOKEN } = require('./config.json')
const Logger = require('./logger')
const Filter = require('bad-words')
const readline = require('readline')

class App {
  constructor() {
    this.client = new Client()
    this.log = new Logger()
    this.filter = new Filter()
    this.warnings = {}
  }

  async start() {
    this.client.connect(TOKEN, REFRESH_TOKEN).then(async () => {
      console.log(`DogeMod Online`)
      const room = process.argv[2]
      if (room) return this.joinRoom(room)
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      })
      this.rl.question('Enter Room ID: ', room => {
        this.rl.close()
        this.joinRoom(room)
      })
    })
    this.client.on(EVENT.USER_JOINED_ROOM, (user) => {
      if (user?.username !== this.client.bot.username) return
      msg?.user?.whisper?.('Welcome! This chat is moderated by DogeMod. Type !dogemod in chat for more information')
    })
    this.client.on(EVENT.NEW_CHAT_MESSAGE, (msg) => {
      if (!msg?.user?.username) console.log(msg.user);
      if (msg?.user?.username === this.client.bot.username) return
      this.log.message(msg)
      if (msg.content === '!dogemod') return this.help(msg.user)
      if (this.filter.isProfane(this.convert(msg.content))) {
        msg.delete().then(() => {
          // until banning is implemented, we alert the room creator
          if (this.warnings[msg.user.id]) this.client.rooms.current.creator.whisper(`${msg.user.username ?? msg.user.displayName ?? msg.user.id} repeatedly used bad language`)
          msg.user.whisper('Please refrain from using bad language')
          this.warnings[msg.user.id] = true
        }).catch(() => {
          console.log('Failed to delete a message. Probably not a mod')
        })
      }
    })
  }

  joinRoom(room) {
    this.client.rooms.join(room).then(() => {
      this.client.bot.sendMessage('DogeMod is monitoring chat')
    }).catch(err => {
      console.log('Failed to join room with error: ', err)
      this.stop()
    })
  }

  help(user) {
    user.whisper('DogeMod is an open-source moderation bot created by TheOtterlord. Find out more at https://github.com/TheOtterlord/dogemod')
  }

  /**
   * Convert some ascii representations to the real version
   * @param {String} text The text to convert
   * @returns The converted text
   */
  convert(text) {
    return text
      .replaceAll('/-\\', 'a')
      .replaceAll('|_|', 'u')
      .replaceAll('|_', 'L')
      .replaceAll('|', 'i')
      .replaceAll('!', 'i')
      .replaceAll('1', 'i')
      .replaceAll('0', 'o')
  }

  stop(err) {
    console.log(err)
    this?.log?.save?.()
    if (err !== 0) process.exit()
  }
}

app = new App()
app.start()

const events = ["SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"]

events.forEach(event => {
  process.on(event, err => app.stop(err));
});
