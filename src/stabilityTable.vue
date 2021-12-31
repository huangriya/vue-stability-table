<template>
  <div class="stability-table" :class="{'not-user-select': dragSize.clientX}">
    <div class="stability-table-wrapper" ref="tableBox">
      <vueAgileScrollbar ref="scroll" @scroll="scroll" :dragSpeedY="0.6" :offsetLeft="offsetLeft" :offsetRight="offsetRight" :offsetTop="offsetTop" @updated="scrollUpdated" @scroll-hit="scrollHit">
        <table cellpadding="0" cellspacing="0"
              class="stability-wrapper-table"
              :class="{'not-sticky': !stickyType, 
                      'not-sticky-left': stickyType === 'left',
                      'not-sticky-right': stickyType === 'right'}">
          <thead class="stability-wrapper-table-head" ref="tabelHead">
            <tr>
              <th sticky="left"
                  v-for="(item, i) in head.left" :key="item.prop"
                  :class="{'sticky-left': i === head.left.length - 1}" 
                  :style="getSticky(item, i)">
                  <div class="stability-table-cell cell-flex" :class="[...getCellClass(item), {'sortable-column': item.sortable}]">
                    <div class="text-content" :title="item.label">
                      <slot name="headerText" :column="item">{{item.label}}</slot>
                    </div>
                    <Sort v-if="item.sortable" />
                  </div>
                  <span @mousedown="dragSizeDown($event, item)" 
                        class="resize-handle" v-if="item.resizable && item.width > 0"></span>
              </th>
              <td v-if="virtualScrollX" :style="{'width': virtualScrollX.left + 'px'}"></td>
              <th v-for="item in cols" 
                  :key="item.prop"
                  :style="getThStyle(item)">
                <div class="stability-table-cell cell-flex" :class="getCellClass(item)">
                  <div class="text-content" :title="item.label">
                    <slot name="headerText" :column="item">{{item.label}}</slot>
                  </div>
                  <Sort v-if="item.sortable"/>
                </div>
                <span class="resize-handle"
                      @mousedown="dragSizeDown($event, item)" v-if="item.resizable && item.width > 0"></span>
              </th>
              <td v-if="virtualScrollX" :style="{'width': virtualScrollX.right + 'px'}"></td>

              <th sticky="right"
                  v-for="(item, i) in head.right"
                  :class="{'sticky-right': i === 0}"
                  :key="item.prop"
                  :style="getSticky(item, head.right.length - 1 - i)">
                  <div class="stability-table-cell cell-flex" :class="getCellClass(item)">
                    <div class="text-content" :title="item.label">
                      <slot name="headerText" :column="item">{{item.label}}</slot>
                    </div>
                    <Sort v-if="item.sortable"/>
                  </div>
                  <span class="resize-handle" @mousedown="dragSizeDown($event, item)" v-if="item.resizable && item.width > 0"></span>
                </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="virtualScrollY" ref="virtualTop" :style="{height: virtualScrollY.top + 'px'}"></tr>
            <template v-for="(row, i) in rows">
              <tr class="stability-wrapper-table-tbody-tr" :key="row[rowKey]" @click="trClick(row, expandKey(i))">
                <td sticky="left"
                    v-for="(item, i) in head.left"
                    :class="{'sticky-left': i === head.left.length - 1}" 
                    :key="item.prop"
                    :style="getSticky(item, i)" >
                    <div class="stability-table-cell cell-flex" :class="getCellClass(item)">
                      <open-icon v-if="i === 0 && row[childrenColumnName] && row[childrenColumnName].length" />
                      <slot name="content" :row="row" :column="item" :content="row[item.prop]" :rowIndex="expandKey(i)">
                        <div class="text-content" :title="row[item.prop]">{{row[item.prop]}}</div>
                      </slot>
                    </div>
                </td>
                <td v-if="virtualScrollX"></td>
                <td v-for="item in cols" :key="item.prop">
                  <div class="stability-table-cell" :class="getCellClass(item)">
                    <slot name="content" :row="row" :column="item" :content="row[item.prop]" :rowIndex="expandKey(i)">
                      <div class="text-content" :title="row[item.prop]">{{row[item.prop]}}</div>
                    </slot>
                  </div>
                </td>
                <td v-if="virtualScrollX"></td>

                <td sticky="right"
                    v-for="(item, j) in head.right"
                    :class="{'sticky-right': j === 0}"
                    :key="item.prop"
                    :style="getSticky(item, head.right.length - 1 - j)">
                  <div class="stability-table-cell" :class="getCellClass(item)">
                    <slot name="content" :row="row" :column="item" :content="row[item.prop]" :rowIndex="expandKey(i)">
                      <div class="text-content" :title="row[item.prop]">{{row[item.prop]}}</div>
                    </slot>
                  </div>
                </td>
              </tr>

              <!-- 展开项 -->
              <tr :key="row[rowKey] + 'expand'" :ref="row[rowKey] + 'expand'" v-if="expand && expand[expandKey(i)]">
                <td :colspan="columns.length">
                  <div class="tr-expand" :style="{width: $refs.scroll.scrollWidth + 'px'}">
                    <slot name="expand" :row="row" :rowIndex="expandKey(i)"></slot>
                  </div>
                </td>
              </tr>
            </template>
            <tr ref="virtualBottom" v-if="virtualScrollY" :style="{height: virtualScrollY.bottom + 'px'}"></tr>
          </tbody>
        </table>
      </vueAgileScrollbar>
      <div class="darg-size-ruler" ref="dargSizeRuler" v-show="dragSize.clientX" :style="{left: dragSize.rulerLeft + 'px', height: dragSize.height + 'px'}"></div>
    </div>
  </div>
</template>

<script>
import props, { columns } from './props'
import vueAgileScrollbar from 'vue-agile-scrollbar'
import 'vue-agile-scrollbar/dist/style.css'
import Virtual from './virtual.js'
import dragMixin from './dragMixin'
import { getAllRows, getAllRowsFind } from './utils'
import Sort from './source/sort.vue'
import openIcon from './source/openIcon.vue'

export default {
  components: { vueAgileScrollbar, Sort, openIcon },
  props: props,
  mixins: [dragMixin],
  data () {
    return {

      // 所有行
      allRows: [],

      head: {
        rowNumber: 1,
        left: [],
        middle: [],
        right: []
      },

      rows: [],
      cols: [],

      // 记录扩展行展开
      expand: null,

      virtualScrollX: null,
      virtualScrollY: null,

      // Y轴滚动条顶部偏移量
      offsetTop: 0,

      // 固定列类型
      stickyType: ''
    }
  },

  computed: {

    // 滚动条左边偏移
    offsetLeft () {
      let num = 5
      this.head.left.forEach(o => {
        num += (o.width > 0) ? o.width : columns.minWidth
      })
      return num
    },

    // 滚动条右边偏移
    offsetRight () {
      let num = 5
      this.head.right.forEach(o => {
        num += (o.width > 0) ? o.width : columns.minWidth
      })
      return num
    }
  },

  watch: {
    dataSource () {
      this.empty()
      this.$nextTick(() => {
        this.init()
      })
    }
  },

  mounted () {
    this.init()
    this.expand = this.$scopedSlots.expand ? {} : null
  },

  methods: {

    init () {
      if (!this.dataSource.length || !this.columns.length) return

      this.setHead()

      this.allRows = Object.freeze(this.dataSource)

      this.virtual = new Virtual({
        rowsNum: this.allRows.length,
        colsNum: this.head.middle.length,

        // 单行平均高度
        rowSize: this.rowSize,
        
        // 单列平均宽度
        colSize: this.colSize
      })
      
      this.setCols(0)
      this.setRows(0)
    },

    // 更新列数据
    updateColumns (columns) {
      this.setHead(columns)
      this.virtual.opts.colsNum = columns.length
      this.setCols(this.virtual.scrollLeft)
    },

    // 清空表格
    empty () {
      this.head = {
        rowNumber: 1,
        left: [],
        middle: [],
        right: []
      },
      this.rows = []
      this.cols = []
      this.virtualScrollX = null
      this.virtualScrollY = null
    },

    // 设置表头数据
    setHead (cols) {
      const columns = cols || this.columns
      let left = [], middle = [], right = [], columnsLen = columns.length, start = null, end = null

      // 获取两边的固定列
      for (let i = 0, j = columnsLen - 1; i < columnsLen, j >= 0; i++, j--) {
        const startItem = columns[i]
        const endItem = columns[j]

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
      middle = start !== 0 && end !== columnsLen ? columns.slice(start, end + 1) : columns

      this.head = {
        left: left,
        middle: middle,
        right: right
      }

      // 设置y轴滚动条偏移量
      if (this.$refs.tabelHead) {
        this.offsetTop = this.$refs.tabelHead.offsetHeight + 5
      }
    },

    // 设置行数据
    setRows (scrollTop) {
      let rowsRegion = this.virtual.getRowsRegion(scrollTop, this.expand)
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
      let obj = {
        width: (item.width > 0 ? item.width : columns.width) + 'px'
      }
      return obj
    },

    getCellClass (item) {
      const align = {
        'left': 'align-left',
        'center': 'align-center',
        'right': 'align-right'
      }

      let classArr = [align[item.align || columns.align]]

      return classArr
    },

    getSticky (item, colIndex) {

      let colItem = item

      if (item.fixed === 'left') {
        colItem = colIndex ? this.head.left[colIndex - 1] : item
      }

      if (item.fixed === 'right') {
        colItem = colIndex ? this.head.right[colIndex] : item
      }

      const width = item.width > 0 ? item.width : columns.width

      let stylesObj = {
        width: width + 'px',
        [item.fixed]: colIndex * (colItem.width || columns.width) + 'px'
      }

      return stylesObj
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
      if (this.expand) {
        if (!this.expand[rowIndex]) {
          this.$set(this.expand, rowIndex, true)
        } else {
          this.expand[rowIndex] = false
        }
        this.$nextTick(() => {
           if (this.expand[rowIndex]) {
             this.expand[rowIndex] = this.$refs[row[this.rowKey] + 'expand'][0].offsetHeight
          }
        })
      }
    },

    expandKey (i) {
      if (this.virtualScrollY) {
        return i + this.virtualScrollY.start
      }
      return i
    },
    
    scrollUpdated (v) {
      if (this.virtual) {
        this.virtual.opts.viewHeight = v.scrollHeight
        this.virtual.opts.viewWidth = v.scrollWidth
      }
      this.dragSize.height = v.scrollContentHeight > v.scrollHeight ? v.scrollHeight : v.scrollContentHeight
      if (v.scrollBarX) {
        if (v.left === 0) {
          this.stickyType = 'left'
        }
      } else {
        this.stickyType = ''
      }
    },

    scrollHit (v) {
      this.stickyType = v
    }
  }
}
</script>

<style lang="less">
.stability-table {
  height: 100%;
  * {
    box-sizing: border-box;
  }
  &.not-user-select {
    user-select: none;
    -webkit-user-select: none;
  }
  .stability-table-wrapper {
    height: 100%;
    position: relative;
    .darg-size-ruler {
      width: 2px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #688ff4;
      z-index: 10;
    }
    .stability-wrapper-table {
      text-align: left;
      display: table;
      width: 100%;
      table-layout: fixed;
      border-collapse: separate;
      th, td {
        background-color: #fff;
        transition: background-color .5s ease .2s;
        position: relative;
        .stability-table-cell {
          padding: 0 8px;
          position: relative;
          width: 100%;
          .text-content {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &.align-left {
            text-align: left;
          }
          &.align-center {
            text-align: center;
            &.cell-flex {
              justify-content: center
            }
          }
          &.align-right {
            text-align: right;
            &.cell-flex {
              justify-content: right;
            }
          }
        }
      }
      .cell-flex {
        display: flex;
        &.sortable-column {
          cursor: pointer;
        }
      }
      tr {
        [sticky="left"], [sticky="right"] {
          position: sticky !important;
          z-index: 1;
        }
      }
      &.not-sticky {
        .sticky-left::after, .sticky-right::after {
          display: none;
        }
      }
      &.not-sticky-left {
        .sticky-left::after {
          display: none;
        }
      }
      &.not-sticky-right {
        .sticky-right::after {
          display: none;
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
          height: 40px;
        }
        th {
          border-bottom: 2px solid #ededed;
          font-size: 14px;
          font-weight: 400;
          height: 40px;
          min-height: 40px;
          &:hover {
            background-color: #eff3fd;
          }
          .resize-handle {
            width: 2px;
            position: absolute;
            height: 100%;
            top: 0;
            right: 0px;
            cursor: col-resize;
            transition: background-color .5s ease;
            &[data-darg-act="true"], &:hover {
              background-color: #688ff4;
            }
          }
          
        }
      }
      .stability-wrapper-table-tbody-tr {
        height: 40px;
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
      .tr-expand {
        position: sticky;
        left: 0;
      }
    }
  }
}
</style>