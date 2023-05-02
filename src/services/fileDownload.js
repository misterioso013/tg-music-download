import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import * as stream from 'stream'
import axios from 'axios'

const pipeline = promisify(stream.pipeline)
const __dirname = path.resolve()

export const downloadFile = async (url, ctx, messageId) => {
  let progress = 0
  let emoji = '🌑'
  try {
    const { data } = await axios({
      method: 'GET',
      url,
      responseType: 'stream'
    })

    data.on('data', (chunk) => {
      progress += chunk.length
      if (progress > 52428800) {
        data.destroy()
        return ctx.reply('File is too big!')
      }
    })

    const interval = setInterval(() => {
      if (emoji === '🌑') {
        emoji = '🌒'
      } else if (emoji === '🌒') {
        emoji = '🌓'
      } else if (emoji === '🌓') {
        emoji = '🌔'
      } else if (emoji === '🌔') {
        emoji = '🌕'
      } else if (emoji === '🌕') {
        emoji = '🌖'
      } else if (emoji === '🌖') {
        emoji = '🌗'
      } else if (emoji === '🌗') {
        emoji = '🌘'
      } else if (emoji === '🌘') {
        emoji = '🌑'
      }

      return ctx.telegram.editMessageText(ctx.message.chat.id, messageId, undefined, `${emoji} Downloading... ${SizeInMB(progress)}MB`)
    }, 2000)

    data.on('end', () => {
      clearInterval(interval)
      ctx.telegram.editMessageText(ctx.message.chat.id, messageId, undefined, 'Downloaded! 😊')
    })
    if (!fs.existsSync(path.join(__dirname, './', 'temp'))) {
      fs.mkdirSync(path.join(__dirname, './', 'temp'))
    }
    const filename = `${messageId}.mp3`
    const filePath = path.join(__dirname, './', 'temp', filename)

    await pipeline(data, fs.createWriteStream(filePath))

    return filePath
  } catch (error) {
    ctx.reply(error.message)
  }
}

function SizeInMB (bytes) {
  return (bytes / (1024 * 1024)).toFixed(2)
}
