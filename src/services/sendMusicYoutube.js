import ytGetInfo from './ytGetInfo.js'
import { downloadFile } from './fileDownload.js'
import { unlinkFile } from './unlinkFile.js'
import { captionFormart } from '../utils/captionFormart.js'

export async function sendMusicYoutube (link, chatId, messageId, ctx, message, me) {
  const ytData = await ytGetInfo(link)
  const { title, thumb, duration, audioUrl } = ytData
  const durationInSeconds = duration / 1000
  await ctx.telegram.editMessageText(chatId, message.message_id, undefined, `${title}\n\nFound! 😊`)
  const filePath = await downloadFile(audioUrl, ctx, message.message_id)
  await ctx.telegram.deleteMessage(chatId, message.message_id)
  await ctx.telegram.sendChatAction(chatId, 'upload_audio')
  const caption = captionFormart(title, link, 'Youtube', me)
  await ctx.telegram.sendAudio(
    chatId,
    { source: filePath }, {
      title,
      thumb: { url: thumb },
      duration: durationInSeconds,
      caption,
      parse_mode: 'HTML',
      reply_to_message_id: messageId
    })

  unlinkFile(filePath)
}
