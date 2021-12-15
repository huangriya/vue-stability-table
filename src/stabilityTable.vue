<template>
  <div class="vue-stability-table">
    <div class="vue-stability-table-wrapper" ref="tableBox">
      <vueAgileScrollbar @scroll="scroll">
        <table cellpadding="0" cellspacing="0" class="stability-wrapper-table">
          <thead class="stability-wrapper-table-head">
            <tr>
              <th sticky="left"
                  v-for="(item, i) in head.left" :key="item.prop"
                  :class="{'sticky-left': i === head.left.length - 1}" 
                  :style="getSticky(item, i)" 
                  :title="item.label">
                    {{item.label}}
                    <span @mousedown="dragSizeDown($event, item)" class="resize-handle" v-if="item.resizable && item.width > 0"></span>
                  </th>

              <td v-if="virtualScrollX" :style="{'min-width': virtualScrollX.left + 'px'}"></td>
              <th v-for="item in cols" 
                  :key="item.prop"
                  :style="getThStyle(item)">
                {{item.label}}
                <span class="resize-handle"
                      @mousedown="dragSizeDown($event, item)" v-if="item.resizable && item.width > 0"></span>
              </th>
              <td v-if="virtualScrollX" :style="{'min-width': virtualScrollX.right + 'px'}"></td>

              <th sticky="right"
                  v-for="(item, i) in head.right"
                  :class="{'sticky-right': i === 0}"
                  :key="item.prop"
                  :style="getSticky(item, head.right.length - 1 - i)" 
                  :title="item.label">
                    {{item.label}}
                    <span class="resize-handle" @mousedown="dragSizeDown($event, item)" v-if="item.resizable && item.width > 0"></span>
                  </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="virtualScrollY" ref="virtualTop" :style="{height: virtualScrollY.top + 'px'}"></tr>
            <template v-for="(row, i) in rows">
              <tr class="stability-wrapper-table-tbody-tr" :key="row.id" @click="trClick(row, expandKey(i))">
                <td sticky="left"
                    v-for="(item, i) in head.left"
                    :class="{'sticky-left': i === head.left.length - 1}" 
                    :key="item.prop"
                    :style="getSticky(item, i)" 
                    >{{row.id}}</td>

                <td v-if="virtualScrollX"></td>
                <td v-for="item in cols" :key="item.prop">{{row.id}}</td>
                <td v-if="virtualScrollX"></td>

                <td sticky="right"
                    v-for="(item, i) in head.right"
                    :class="{'sticky-right': i === 0}"
                    :key="item.prop"
                    :style="getSticky(item, head.right.length - 1 - i)"
                    >{{row.id}}</td>
              </tr>

              <!-- 展开项 -->
              <tr :key="row.id + 'expand'" v-if="expand[expandKey(i)]">
                <td :colspan="columns.length">
                  <div style="height:100px;background:#eee">{{expandKey(i)}}</div>
                </td>
              </tr>
            </template>
            <tr ref="virtualBottom" v-if="virtualScrollY" :style="{height: virtualScrollY.bottom + 'px'}"></tr>
          </tbody>
        </table>
      </vueAgileScrollbar>
      <div class="darg-size-ruler" ref="dargSizeRuler" v-if="dragSize.clientX" :style="{left: dragSize.rulerLeft + 'px'}"></div>
    </div>
  </div>
</template>

<script>
import props, { columns } from './props'
import vueAgileScrollbar from 'vue-agile-scrollbar'
import 'vue-agile-scrollbar/dist/style.css'
import Virtual from './virtual.js'

export default {
  components: { vueAgileScrollbar },
  props: props,
  data () {
    return {

      head: {
        rowNumber: 1,
        left: [],
        middle: [],
        right: []
      },

      rows: [],
      cols: [],

      expand: {},

      // 拖拽单元格宽度
      dragSize: {
        clientX: null,

        // 拖拽宽度
        dWidth: 0,

        // 标尺left
        rulerLeft: 0,

        // 当前拖拽对象
        colItem: null
      },

      virtualScrollX: null,
      virtualScrollY: null
    }
  },

  created () {},

  mounted () {
    this.init()

    // 添加单元格拖拽事件
    this.addDragEvent()
  },

  methods: {

    init () {

      this.setHead()

      this.virtual = new Virtual({
        rowsNum: this.dataSource.length,
        colsNum: this.columns.length,

        // 单行平均高度
        rowSize: this.rowSize,
        expandSize: this.expandSize,

        // 单列平均宽度
        colSize: 80,
      })

      this.setCols(0)
      
      this.setRows(0)

    },

    // 设置表头数据
    setHead () {

      let left = [], middle = [], right = [], columnsLen = this.columns.length, start = null, end = null

      // 获取两边的固定列
      for (let i = 0, j = columnsLen - 1; i < columnsLen, j >= 0; i++, j--) {
        const startItem = this.columns[i]
        const endItem = this.columns[j]

        if (startItem.fixed) {
          startItem.fixed = 'left'
          left.push(startItem)
        } else {
          start = i
        }

        if (endItem.fixed) {
          endItem.fixed = 'right'
          right.unshift(endItem)
        } else {
          end = j
        }
        
        if (start !== null && end !== null) break
      }

      // 获取非固定列
      middle = start !== 0 && end !== columnsLen ? this.columns.slice(start, end) : this.columns

      this.head = {
        left: left,
        middle: middle,
        right: right
      }
    },

    // 设置行数据
    setRows (scrollTop) {
      let rowsRegion = this.virtual.getRowsRegion(scrollTop, this.expand, this.$refs.virtualBottom, this.$refs.virtualTop)
      if (rowsRegion) {
        this.virtualScrollY = rowsRegion
        this.rows = this.dataSource.slice(this.virtualScrollY.start, this.virtualScrollY.end)
      } else if (rowsRegion === null) {
        this.rows = this.dataSource
      }
    },

    // 设置列数据
    setCols (scrollLeft) {
      let colsRegion = this.virtual.getColRegion(scrollLeft)
      if (colsRegion) {
        this.virtualScrollX = colsRegion
        this.cols = this.head.middle.slice(this.virtualScrollX.start, this.virtualScrollX.end)
      } else if (colsRegion === null) {
        this.cols = this.head.middle
      }
    },
    
    getThStyle (item) {
      let obj = {}
     
      let defaultWidth = item.width || columns.minWidth
      obj['min-width'] = defaultWidth > 0 ? defaultWidth + 'px' : defaultWidth
      
      return obj
    },

    getSticky (item, colIndex) {

      let colItem = item

      if (item.fixed === 'left') {
        colItem = colIndex ? this.head.left[colIndex - 1] : item
      }

      if (item.fixed === 'right') {
        colItem = colIndex ? this.head.right[colIndex] : item
      }

      return {
        'min-width': (item.width > 0 ? item.width : columns.minWidth) + 'px',
        [item.fixed]: colIndex * (colItem.width || columns.minWidth) + 'px'
      }
    },
    
    // 滚动
    scroll (v) {
      if (this.virtualScrollX) {
        this.setCols(v.left)
      }
      if (this.virtualScrollY) {
        this.setRows(v.top)
      }
    },

    trClick (row, rowIndex) {
      if (!this.expand[rowIndex]) {
        this.$set(this.expand, rowIndex, true)
      } else {
        this.expand[rowIndex] = false
      }
    },

    expandKey (i) {
      if (this.virtualScrollY) {
        return i + this.virtualScrollY.start
      }
      return i
    },

    // 开始拖拽
    dragSizeDown (e, item) {
      console.log(e)
      // console.log(e.clientX - this.$refs.tableBox.getBoundingClientRect().x)

      this.dragSize.rulerLeft = (e.clientX - this.$refs.tableBox.getBoundingClientRect().x)

      this.dragSize.clientX = e.clientX
      this.dragSize.width = item.width
      this.dragSize.colItem = item
      this.dragSize.element = e.target
      window.addEventListener('mousemove', this.dragSizeMove)

      this.dragSize.element.setAttribute('data-darg-act', 'true')
    },

    // 正在拖拽
    dragSizeMove (e) {
      const clientX = this.dragSize.clientX
      if (clientX) {
        let dragX = e.clientX - clientX
        this.dragSize.dWidth = dragX
        this.$refs.dargSizeRuler.style.left = this.dragSize.rulerLeft + dragX + 'px'
      }
    },

    // 拖拽取消
    dragSizeUp () {
      this.dragSize.clientX = null
      this.dragSize.element.setAttribute('data-darg-act', 'false')
      this.dragSize.colItem.width = this.dragSize.width + this.dragSize.dWidth
      window.removeEventListener('mousemove', this.dragSizeMove)
    },

     // 添加拖拽事件
    addDragEvent () {
      window.addEventListener('mouseup', this.dragSizeUp)
    },

    // 移除拖拽事件
    removeDragEvent () {
      window.removeEventListener('mouseup', this.dragSizeUp)
    }
  },

  beforeDestroy () {
   this.removeDragEvent()
  }
}
</script>

<style lang="less">
.vue-stability-table {
  height: 100%;
  .vue-stability-table-wrapper {
    height: 100%;
    position: relative;
    .darg-size-ruler {
      width: 3px;
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      background-color: #688ff4;
      z-index: 10;
    }
    .stability-wrapper-table {
      text-align: left;
      display: table;
      min-width: 100%;
      th, td {
        background-color: #fff;
        transition: background-color .5s ease .2s;
        position: relative;
      }
      tr {
        [sticky="left"], [sticky="right"] {
          position: sticky !important;
          z-index: 1;
        }
      }
      .sticky-left {
        &::after {
          position: absolute;
          top: 0;
          right: -30px;
          bottom: -1px;
          width: 30px;
          content: "";
          box-shadow: inset 8px 0 8px -8px rgb(0 0 0 / 14%);
        }
      }
      .sticky-right {
        &::after{
          position: absolute;
          top: 0;
          bottom: -1px;
          width: 30px;
          content: "";
          left: -30px;
          box-shadow: inset -8px 0 8px -8px rgb(0 0 0 / 14%);
        }
      }
      .stability-wrapper-table-head {
        position: sticky;
        top: 0;
        z-index: 2;
        tr {
          height: 50px;
        }
        th {
          border-bottom: 2px solid #ededed;
          font-size: 14px;
          font-weight: 400;
          height: 50px;
          min-height: 50px;
          .resize-handle {
            width: 3px;
            position: absolute;
            height: 100%;
            top: 0;
            right: -1px;
            cursor: col-resize;
            transition: background-color .5s ease;
            &[data-darg-act="true"], &:hover {
              background-color: #688ff4;
            }
          }
        }
      }
      .stability-wrapper-table-tbody-tr {
        height: 50px;
        td {
          border-bottom: 1px solid #ededed;
          font-size: 12px;
        }
        &:hover {
          td {
            background-color: #eff3fd;
          }
        }
      }
    }
  }
}
</style>