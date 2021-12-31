/**
 * 根据传入的数据获取所有行
 * @param {Array} dataSource 数据源
 * @param {String} childrenColumnName 树形数据名称
 */
export const getAllRows = (dataSource, childrenColumnName = 'children') => {
  let list = [], len = dataSource.length, isChildren
  for (let i = 0, j = len - 1; i < len, j >= 0; i++, j--) {
    if (dataSource[i][childrenColumnName] || dataSource[j][childrenColumnName]) {
      isChildren = true
      break
    }
    if (i > len / 2) break
  }
  if (!isChildren) {
    return dataSource
  }
}

export const getAllRowsFind = (dataSource, childrenColumnName = 'children') => {
  let list = [], len = dataSource.length, isChildren = dataSource.find(o => o[childrenColumnName])
  if (!isChildren) {
    return dataSource
  }
}