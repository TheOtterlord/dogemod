const { apiKey, banAfter } = require('./config.json')
const { raw, wrap, tokensToString } = require('@dogehouse/kebab')
const Filter = require('bad-words')
const axios = require('axios')

/**
 * The app
 */
class App {
  /**
   * Creates an app instance
   */
  constructor() {
    this.filter = new Filter()
    this.banAfter = {}
  }

  /**
   * Starts the application
   */
  async start() {
    // Fetch our access token
    const res = await axios('https://api.dogehouse.tv/bot/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        apiKey
      }
    })
    const {accessToken, refreshToken} = res.data

    // Attempt to connect to the api
    try {
      this.wrapper = wrap(await raw.connect(
        accessToken,
        refreshToken,
        {
          onConnectionTaken: () => {
            console.error("\nAnother client has taken the connection");
            process.exit();
          }
        }
      ))
    } catch (err) {
      // something went wrong
      if (err.code === 4001) console.error("Invalid token!");
      // console.error(err)
      process.exit()
    }

    // Get the room from the cli args
    const room = process.argv[2] ?? ''

    this.wrapper.subscribe.newChatMsg(async ({userId, msg}) => {
      const text = tokensToString(msg.tokens);
      console.log(`${msg.displayName}: ${text}`)

      // return if sender is the bot
      if (userId === this.wrapper.connection.user.id) return

      if (text === '!dogemod') return this.help(userId)

      if (this.filter.isProfane(text)) {
        this.banAfter[userId] = (this.banAfter[userId] ?? 0) + 1
        this.wrapper.mutation.deleteRoomChatMessage(userId, msg.id)
        this.wrapper.mutation.sendRoomChatMsg([{t: 'mention', v: 'TheOtterlord'}, {t: 'text', v: 'Please refrain from using bad language'}], [userId])
        if (this.banAfter[userId] === banAfter) this.wrapper.mutation.banFromRoomChat(userId)
      }
    })
    
    this.joinRoom(room)
  }

  /**
   * Join a room
   * @param {string} room id of the room to join
   */
  async joinRoom(room) {
    const roomInfo = await this.wrapper.query.joinRoomAndGetInfo(room)
    console.log(`${roomInfo.room.name}\n${roomInfo.room.description}`)

    // tell the chat that the room is now moderated
    await this.wrapper.mutation.sendRoomChatMsg([{t: 'text', v: 'This chat is now moderated by DogeMod. See !dogemod for more info'}])
  }

  /**
   * Send a help message to a user
   * @param {string} userId The id of the user who requested !dogemod
   * @returns Promise<void>
   */
  help(userId) {
    return this.wrapper.mutation.sendRoomChatMsg([{t: 'text', v: 'DogeMod is an open-source moderation bot for DogeHouse. Created by TheOtterlord. Find out more at'}, {t: 'link', v: 'https://github.com/TheOtterlord/dogemod'}], [userId])
  }
}

const app = new App()
app.start()
