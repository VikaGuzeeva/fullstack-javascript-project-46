import stylish from './stylish.js'

const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish
    case 'json':
      return JSON.stringify
    default:
      throw new Error(`Invalid format - ${formatName}`)
  }
}

export default getFormatter
