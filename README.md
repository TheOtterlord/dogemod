# DogeMod

DogeMod is a simple moderation bot for [DogeHouse](https://dogehouse.tv) created by [TheOtterlord](https://github.com/TheOtterlord) to help protect your room chats.

DogeMod deletes messages that trigger the profanity filter (uses `bad-words` npm package) and warns the user who sent the message.
You can configure DogeMod to ban a user from the chat after a certain number of infractions.

## Set up

1. Install `node` and `npm`
2. Download this repo and unzip into an empty directory
3. In the directory, run `nmp i` to install dependencies
4. Create a `config.json` file in the main directory
5. Add the following to the `config.json` file, replacing `BOT_API_KEY` with your bot's key. (find out how to create a bot [here](https://github.com/benawad/dogehouse/blob/staging/CREATE_BOT_ACCOUNT.MD))

```json
{
  "apiKey": "BOT_API_KEY"
}
```

6. Run `npm run start -- <room-id>` replacing `<room-id>` with the room you wish the bot to join
7. (optional) Add a `banAfter` field to the `config.json` file setting it to the number of infractions to ban a user after (e.g. ban a user after 3 infractions: `"banAfter": 3`)

## Support

If you encounter any problems when using DogeMod, please open a [GitHub issue](https://github.com/TheOtterlord/dogemod/issues).

## Contributing

DogeMod is open-source and contributions are welcome.
If you plan to add a new feature, please open an issue first.

## License

DogeMod is distributed under the [MIT](https://choosealicense.com/licenses/mit/) license.
