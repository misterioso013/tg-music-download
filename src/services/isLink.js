import isYoutubeLink from '../utils/isYoutubeLink.js'

function isLink (link) {
  if (isYoutubeLink(link)) {
    return 'youtube'
  } else {
    throw new Error('Invalid link')
  }
}

export default isLink
