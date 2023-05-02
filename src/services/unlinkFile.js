import fs from 'fs'

export const unlinkFile = (filePath) => {
  try {
    fs.unlinkSync(filePath)
  } catch (error) {
    console.log(error.message)
  }
}
