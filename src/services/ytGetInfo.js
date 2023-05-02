import ytdl from 'ytdl-core'

async function ytGetInfo (link) {
  const info = await ytdl.getInfo(link)
  const title = info.videoDetails.title
  const formats = info.formats
  const audioFormats = ytdl.filterFormats(formats, 'audioonly')
  const audio = audioFormats[0]
  const audioUrl = audio.url
  const duration = audio.approxDurationMs
  const thumb = info.videoDetails.thumbnails[0].url

  return {
    title,
    thumb,
    duration,
    audioUrl
  }
}

export default ytGetInfo
