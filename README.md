# vue-stability-table

基于vue的表格组件，高性能，支持一次性显示10万条、1万列的数据

# Demo

# Simple usage

通过npm 或者 yarn安装

``` 
yarn add vue-stability-table

npm i vue-stability-table
```

引入

``` js
import 'vue-stability-table/dist/style.css'
import vueStabilityTable from 'vue-stability-table'
```

``` vue
<template>
  <div style="height:432px;width:800px;">
    <stabilityTable ref="stabiltyTable" :columns="columns" :dataSource="rows"></stabilityTable>
  </div>
</template>

<script>
import 'vue-stability-table/dist/style.css'
import vueStabilityTable from 'vue-stability-table'

export default {
  components: { vueStabilityTable },
  data () {
    return {
      columns: [],
      rows: []
    }
  },
  created () {
    let columns = [{
      label: '固定列asadfasdfas',
      prop: 'table',
      fixed: true,
      width: 120,
      className: 'table-1',
      sortable: true,
      resizable: true
    }, {
      label: '固定列2',
      prop: 'fixedTable2',
      fixed: true,
      width: 120,
      resizable: true
    }]
    
    for (let i = 0; i <= 300; i++) {
      columns.push({
        label: '表头' + i,
        prop: 'table' + i,
        subProp: 'subTable' + i,
        resizable: true,
        sortable: true,
        formatter: function(str) {
          return str + 'bba'
        }
      })
    }

    columns.push({
      label: '固定尾1',
      prop: 'tableLast',
      fixed: true,
      width: 120,
      resizable: true,
      sortable: true,
      align: 'center'
    },{
      label: '固定尾2',
      prop: 'tableLast2',
      fixed: true,
      width: 120,
      resizable: true,
      sortable: true,
      align: 'right'
    })

    let rows = []
    for (let i = 0; i < 1000; i++) {
      let obj = {
        id: i,
        table: '是否' + i,
        fixedTable2: '收到',
        table1: i,
        table2: i,
        subTable1: '20%',
        children: []
      }
      for (let j = 0; j < 7; j++) {
        obj.children.push({
          id: i + 'ch' + j,
          fixedTable2: '2021111' + j,
          table1: '爱爱上爱上爱上爱上上',
          table2: 'asfasdasfasdfsffsfasfasdasfasdfsffsf'
        })
      }
      rows.push(obj)
    }
    this.columns = columns
    this.rows = rows
  }
}
</script>
```

# Api

## table props

name|类型|默认值|说明
--|:--:|--:|:--
columns| Array | [] | 表格列的配置描述
dataSource| Array | [] | 数据数组
childrenColumnName| String | children | 指定树形结构的字段名
indentSize| Number | 16 | 树形结构缩进宽度
rowKey| String | id | 表格行key的字段名
rowSize| Number | 40 | 单行平均高度，虚拟滚动时用到
colSize| Number | 100 | 单列平均宽度，虚拟滚动时用到
openIconColumn| Number | 0 | 展开图标显示列
scrollDisplayType | String | show | 滚动条展示类型
sortMark | Boolean | 1 | 是否显示排序背景色,
rowSelection | Object | {selected: [], disabled: []} | 让选中配置


## columns props
name|类型|默认值|说明
--|:--:|--:|:--
label| String | - | 列名
prop| String | - | 表格内容对应的属性，支持多层访问：如
subProp| String | - | 表格内容对应的子属性
align| String | left | 对齐方式
fixed| Boolean | false | 是否固定列
resizable| Boolean | false | 是否可拖动调整宽度，此时 width 必须是 number 类型
width| Number | 100 | 列宽度
minWidth| Number | 80 | 列最小宽度
maxWidth | Number | - | 列最大宽度
formatter | Function | - | 本列格式化函数
sortable | Boolean | false | 是否排序
className |  String | - | 本列样式类名

# 事件

name|回调参数|说明
--|:--:|:--
on-expand-change | function(row: Object, expandState: Boolean) | 拓展行展开收起
cell-text-click | function(columns: Object, row: Object, event: Element) | 点击单元格文本
resize-column | function(columns: Object) | 拖拽列宽改变后
on-sort-change | function(colProp: String, sortOrders: String, columns: Object) | 自定义排序，监听该事件后，系统默认排序会失效
scroll | function(scrollValue: Object, $event) | 滚动会触发该事件
scroll-hit | function(type: String, scrollValue: Object) | 滚动条触底、触顶、触左、触右后出发该事件
selection-change | function({row: Object, rows: Array, checked: Boolean}) | 选中行后触发
# 方法

name|参数|说明
--|:--|:--
updateColumns(columns) | - | 手动更新列数据(比直接改变props的columns性能高25%左右)
updateRows(rows) | - | 手动更新行数据(比直接改变props的dataSource性能高25%左右)
doLayout() | - | 表格重新布局
getSelectionRows() | - | 获取选中行
setSelectionRows(rowsKey:Array) | - | 设置选中行

# solt
name|说明
--|:--
content | 行单元格内容 参数: {row, column, content, rowIndex}
header | 表头内容 参数: { column }
expand | 自定义扩展行内容  参数:{ row }