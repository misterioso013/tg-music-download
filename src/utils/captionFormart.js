export const captionFormart = (title, link, service, me) => {
  return `<b>${title}</b>\n\n<b>Source:</b> <a href="${link}">${service}</a>\n<b>Dowloaded by:</b> <a href="tg://user?id=${me.id}">${me.first_name}</a>`
}
