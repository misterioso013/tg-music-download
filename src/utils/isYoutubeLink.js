function isYoutubeLink (link) {
  return !!link.match(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
}

export default isYoutubeLink
