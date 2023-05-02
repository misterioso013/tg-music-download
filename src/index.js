import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import 'dotenv/config'
import isLink from './services/isLink.js'
import { sendMusicYoutube } from './services/sendMusicYoutube.js'

const bot = new Telegraf(process.env.BOT_TOKEN, { handlerTimeout: 900000 })

bot.start((ctx) => ctx.reply('Send me a music link!'))

bot.on(message('text'), async (ctx) => {
  const type = ctx.message.entities[0].type
  if (type !== 'url') {
    return ctx.reply('This is not a link!')
  }
  const offset = ctx.message.entities[0].offset
  const length = ctx.message.entities[0].length
  const link = ctx.message.text.slice(offset, length)
  const chatId = ctx.message.chat.id
  const messageId = ctx.message.message_id
  try {
    const service = isLink(link)
    const message = await ctx.reply('Searching...', { reply_to_message_id: messageId })
    const me = await ctx.telegram.getMe()
    if (service === 'youtube') {
      await sendMusicYoutube(link, chatId, messageId, ctx, message, me)
    }
  } catch (error) {
    ctx.reply(error.message)
  }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
