

export const columns = {
  label: '',

  // 表格内容对应的属性，支持多层访问：如 'user.address[0].city'
  prop: '',
  align: 'left',
  fixed: false,
  key: '',

  // 是否可拖动调整宽度，此时 width 必须是 number 类型
  resizable: false,
  width: null,
  minWidth: 80,
  maxWidth: null,

  // 格式化内容的函数
  formatter: null
}

export default {

  // 表格列的配置描述
  columns: {
    type: Array
  },

  // 数据数组
  dataSource: {
    type: Array
  },

  sticky: {
    type: Boolean,
    default: false
  },

  // 指定树形结构的列名
  childrenColumnName: {
    type: String,
    default: 'children'
  },

  // 初始时，是否展开所有行
  defaultExpandAllRows: {
    type: Boolean,
    default: false
  },

  // 分页相关配置
  pagination: {
    type: [Boolean, Object],
    default: false
  },

  // 表格行的类名
  rowClassName: {
    type: String,
    default: ''
  },

  // 表格行 key 的取值，可以是字符串或一个函数
  rowKey: {
    type: String,
    default: ''
  },

  // 单行平均高度，虚拟滚动时用到
  rowSize: {
    type: Number,
    default: 50
  },

  // 拓展行平均高度，虚拟滚动时用到
  expandSize: {
    type: Number,
    default: null
  },

  // 单列平均宽度，虚拟滚动时用到
  colSize: {
    type: Number,
    default: 80
  },

  // 自定义空数据时的显示内容
  emptyText: {
    type: String,
    default: '暂无数据'
  }
}