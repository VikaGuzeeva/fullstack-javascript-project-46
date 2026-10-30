import _ from 'lodash'

const replacer = ' '
const spacesCount = 4
const indentShift = 2

const getIndent = (depth) => replacer.repeat(depth * spacesCount - indentShift)

const stylish = (tree) => {
  const iter = (node, depth = 1) => {
    const currentIndent = getIndent(depth)

    if (Array.isArray(node)) {
      const lines = node.map((item) => {
        const { type, key, value, oldValue, newValue, children } = item

        switch (type) {
          case 'added':
            return `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`

          case 'removed':
            return `${currentIndent}- ${key}: ${iter(value, depth + 1)}`

          case 'changed':
            return (
              `${currentIndent}- ${key}: ${iter(oldValue, depth + 1)}\n` +
              `${currentIndent}+ ${key}: ${iter(newValue, depth + 1)}`
            )

          case 'unchanged':
            return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`

          case 'nested':
            return `${currentIndent}  ${key}: {\n${
              iter(children, depth + 1)
                .split('\n')
                .map((line) => `${currentIndent}  ${line}`)
                .join('\n')
            }\n${currentIndent}  }`

          default:
            throw new Error(`Unknown diff type: ${type}`)
        }
      })

      return lines.join('\n')
    }
    if (!_.isObject(node)) {
      return String(node)
    }
    const entries = Object.entries(node)
    if (entries.length === 0) {
      return '{}'
    }

    const innerLines = entries.map(([k, v]) => {
      const innerIndent = getIndent(depth + 1)
      return `${innerIndent}${k}: ${iter(v, depth + 1)}`
    })

    return `{\n${innerLines.join('\n')}\n${getIndent(depth)}}`
  }

  return iter(tree)
}

export default stylish
