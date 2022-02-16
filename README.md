# vue-stability-table

基于vue的表格组件，高性能，支持一次性显示10万条、1万列的数据

# Demo

# Simple usage

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
sortMark | Boolean | 1 | 是否显示排序背景色


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
scroll | function(scrollValue: Object, $event) | 滚动会触发该事件
scroll-hit | function(type: String, scrollValue: Object) | 滚动条触底、触顶、触左、触右后出发该事件
updated | function(scrollValue: Object) | 容器更新后会触发该事件
on-expand-change | function(row: Object, expandState: Boolean) | 拓展行展开收起
cell-text-click | function(columns: Object, row: Object, event: Element) | 点击单元格文本
resize-column | function(columns: Object) | 拖拽列宽改变后
on-sort-change | function(colProp: String, sortOrders: String, columns: Object) | 自定义排序，监听该事件后，系统默认排序会失效
# 方法

name|参数|说明
--|:--|:--
updated() | - | element改变后，<br>可以通过该方法手动更新滚动容器状态
setScrollLeft(number) | - | 改变滚动条左边滚动距离
setScrollTop(number) | - | 改变滚动条上边滚动距离

# solt