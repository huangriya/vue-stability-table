

export const columns = {
  label: '',

  // 表格内容对应的属性，支持多层访问：如 'user.address[0].city'
  prop: '',

  // 表格内容对应的子属性
  subProp: '',

  align: 'left',
  fixed: false,
  key: '',

  // 是否可拖动调整宽度，此时 width 必须是 number 类型
  resizable: false,
  width: 100,
  minWidth: 80,
  maxWidth: null,

  // 格式化内容的函数
  formatter: null,

  // 排序
  sortable: false,

  // 每一列的样式class
  className: ''
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

  // 设置粘性头部和滚动条
  sticky: {
    type: Boolean,
    default: false
  },

  // 指定树形结构的列名
  childrenColumnName: {
    type: String,
    default: 'children'
  },

  // 树形结构缩进宽度
  indentSize: {
    type: Number,
    default: 16
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

  // 表格行 key 的取值，可以是字符串或一个函数
  rowKey: {
    type: String,
    default: 'id'
  },

  // 单行平均高度，虚拟滚动时用到
  rowSize: {
    type: Number,
    default: 40
  },

  // 单列平均宽度，虚拟滚动时用到
  colSize: {
    type: Number,
    default: 100
  },

  // 自定义空数据时的显示内容
  emptyText: {
    type: String,
    default: '暂无数据'
  },

  // 展开图标显示列
  openIconColumn: {
    type: Number,
    default: 0
  },

  // 滚动条展示类型
  scrollDisplayType: {
    type: String,
    default: 'show'
  },

  // 是否显示排序背景色
  sortMark: {
    type: Boolean,
    default: true
  },

  // 表格行的类名
  rowClassName: {
    type: Function
  },

  // 行选择配置
  rowSelection: {
    type: Object,
    default () {
      return {
        selected: [],
        disabled: []
      }
    }
  }
}