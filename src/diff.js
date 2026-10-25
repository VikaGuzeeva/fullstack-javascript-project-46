import _ from 'lodash';

export const generateDiff = (obj1, obj2) => {
  const allKeys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
  const sortedKeys = _.sortBy(allKeys);
  const lines = sortedKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!(key in obj2)) {
      acc.push(`- ${key}: ${value1}`);
      return acc;
    }
    if (!(key in obj1)) {
      acc.push(`+ ${key}: ${value2}`);
      return acc;
    }
    if (value1 !== value2) {
      acc.push(`- ${key}: ${value1}`);
      acc.push(`+ ${key}: ${value2}`);
      return acc;
    }
    acc.push(`  ${key}: ${value1}`);
    return acc;
  }, []);
  return `{\n${lines.join('\n')}\n}`;
};