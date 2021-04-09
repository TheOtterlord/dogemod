# DogeMod

> NOTE: DogeMod is a work in progress

DogeMod is a simple moderation bot for [DogeHouse](https://dogehouse.tv) created by [TheOtterlord](https://github.com/TheOtterlord) to help protect your rooms.

DogeMod deletes messages that trigger the profanity filter (uses `bad-words` npm package) and warns the user who sent the message.
Once `dogehouse.js` adds banning, I will implement it here too.

## Set up

1. Install `node` and `npm`
2. Download this repo and unzip into an empty directory
3. In the directory, run `nmp i` to install dependencies
4. Create a `config.json` file in the main directory
5. Add the following to the `config.json` file, replacing `TOKEN_HERE` with your dogehouse token and `REFRESH_TOKEN_HERE` with your refresh token. (find out how to get these tokens [here](https://github.com/dogegarden/dogehouse.js#installation))

```json
{
  "TOKEN": "TOKEN_HERE",
  "REFRESH_TOKEN": "REFRESH_TOKEN_HERE"
}
```

6. Run `npm run start -- <room-id>` replacing `<room-id>` with the room you wish the bot to join

## Support

If you encounter any problems when using DogeMod, please open a [GitHub issue](https://github.com/TheOtterlord/dogemod/issues).

## Contributing

DogeMod is open-source and contributions are welcome.
If you plan to add a new feature, please open an issue first.

## License

DogeMod is distributed under the [MIT](https://choosealicense.com/licenses/mit/) license.
