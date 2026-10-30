import formatStylish from './formatters/stylish.js'

const isObject = (val) => typeof val === 'object' && val !== null && !Array.isArray(val)

export const buildDiffTree = (obj1, obj2) => {
  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  const orderedKeys = Array.from(allKeys).sort()
  return orderedKeys.map((key) => {
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (!(key in obj2)) {
      return { key, type: 'removed', value: val1 }
    }
    if (!(key in obj1)) {
      return { key, type: 'added', value: val2 }
    }

    if (isObject(val1) && isObject(val2)) {
      return {
        key,
        type: 'nested',
        children: buildDiffTree(val1, val2)
      }
    }

    if (val1 !== val2) {
      return { key, type: 'changed', oldValue: val1, newValue: val2 }
    }

    return { key, type: 'unchanged', value: val1 }
  })
}

const formatters = {
  stylish: formatStylish
}

export const generateDiff = (obj1, obj2, formatName = 'stylish') => {
  const diffTree = buildDiffTree(obj1, obj2)
  const formatter = formatters[formatName]

  if (!formatter) {
    throw new Error(`Unknown format: ${formatName}. Available formats: ${Object.keys(formatters).join(', ')}`)
  }

  return formatter(diffTree)
}
