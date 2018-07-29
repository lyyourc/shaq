/**
 * normalizeData
 * { shortcuts } => [{ category: 'shortcuts', items: shortcuts }]
 * 
 * @param {Object} data 
 */
export function normalizeData(data) {
  return Object.keys(data).reduce((acc, key) => {
    return [...acc, { category: key, items: data[key] }]
  }, [])
}

export function flattenData(data) {
  return Object.keys(data).reduce((acc, key) => {
    return [...acc, ...data[key].items]
  }, [])
}
