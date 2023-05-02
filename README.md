# Telegram Music Downloader Bot

> English | [Português](docs/README.pt-BR.md)

Download music using Telegram and build your playlist offline.

> **Note:** This project was developed for study purposes and should not be used for commercial purposes.

## Installation

### Requirements

- [Node.js](https://nodejs.org/en/) >= 18.0.0
- [FFmpeg](https://ffmpeg.org/) >= 4.0.0 (optional)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/misterioso013/tg-music-download.git

cd tg-music-download
```

2. Install dependencies:

```bash
npm install
```

3. Create an `.env` file in the root of the project and add the following environment variables:

```bash
BOT_TOKEN= # Your bot's token
```

4. Start the bot:

```bash
npm start
```

## Usage

1. Start a conversation with the bot on Telegram.
2. Send the `/start` command to start the bot.
3. Submit a valid link of a sound you want to download.

## Support

- [x] YouTube
- [ ] SoundCloud
- [ ] Spotify
- [ ] Deezer

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to submit a PR.