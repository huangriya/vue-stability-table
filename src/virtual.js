



class Virtual {

  constructor (options) {

    this.opts = Object.assign({}, {
      // 总行数
      rowsNum: 0,

      // 总列数
      colsNum: 0,

      // 单行平均高度
      rowSize: 50,

      // 单列平均宽度
      colSize: 100,

      // 行拓展展开平均高度
      expandSize: null,

      // 固定列数量
      fixedColNum: 0,

      // 可视区域高度
      viewHeight: 500,

      // 可视区域宽度
      viewWidth: 800
    }, options)

    this.rowStart = null
    this.rowEnd = null

    this.colStart = null
    this.colEnd = null

    // 顶部距离
    this.topDistance = 0

    // 底部距离
    this.bottomDistance = 0

    // 左边距离
    this.leftDistance = 0

    // 右边距离
    this.rightDistance = 0

    this.scrollTop = 0

    this.scrollLeft = 0
  }

  // 获取行的区域
  getRowsRegion (scrollTop, expand, virtualBottom, virtualTop) {

     // 总行数小于等于60行，默认不开启虚拟滚动
    if (this.opts.rowsNum <= 60) {
      return null
    }

    let start, end, direction = 'down'

    // 拓展展开溢出的高度
    let expandDistance = {
      top: 0,
      middle: 0,
      bottom: 0
    }

    if (scrollTop < this.opts.viewHeight) {
      start = 0
      end = 30
    } else if (virtualBottom.offsetTop - scrollTop < this.opts.viewHeight) {
      start = this.rowEnd - 15
      end = start + 30
      if (end > this.opts.rowsNum) {
        end = this.opts.rowsNum
      }

      if (start < this.rowStart) {
        start = undefined
        end = undefined
      }

      if (expand) {
        for (const key in expand) {
          if (key < start) {
            expandDistance.top += expand[key]
          }
        }
      }
    } else if (virtualTop && scrollTop - virtualTop.clientHeight < 100) {
      start = this.rowStart - 15
      end = this.rowEnd - 15
      
      if (expand) {
        for (const key in expand) {
          if (key < start) {
            expandDistance.top += expand[key]
          } else if (key > end) {
            expandDistance.bottom += expand[key]
          }
        }
      }
    }

    if (start !== undefined && 
        end !== undefined && 
        start !== this.rowStart && 
        end !== this.rowEnd) {

      this.rowStart = start
      this.rowEnd = end

      this.topDistance = this.rowStart * this.opts.rowSize + expandDistance.top
      this.bottomDistance = (this.opts.rowsNum - this.rowEnd) * this.opts.rowSize + expandDistance.bottom
      
      return {
        start: this.rowStart,
        end: this.rowEnd,
        top: this.topDistance,
        bottom: this.bottomDistance
      }
    }
  }


  // 获取列区域
  getColRegion (scrollLeft) {

    // 单列平均宽度
    const itemSize = this.opts.colSize

    // 一屏的个数
    const screenNum = Math.floor(this.opts.viewWidth / itemSize)

    // 小于3屏数据时不开启虚拟滚动
    if (this.opts.colsNum <= screenNum * 3) {
      return null
    }

    let start, end, isLast

    if (scrollLeft < this.opts.viewWidth) {
      start = 0
      end = screenNum * 2
    } else {
      start = Math.floor(scrollLeft / itemSize) - screenNum

      let endSum = start + screenNum * 3

      end = endSum

      if (endSum > this.opts.colsNum) {
        end = this.opts.colsNum
        this.rightDistance = 0
        isLast = true
      }
    }

    this.scrollLeft = scrollLeft

    if ((start !== this.colStart || end !== this.colEnd) && (end - this.colEnd > 5) || (this.colEnd - end > 5) || isLast) {

      this.colStart = start
      this.colEnd = end

      this.leftDistance = this.colStart * itemSize
      this.rightDistance = (this.opts.colsNum - this.colEnd) * itemSize

      return {
        start: this.colStart,
        end: this.colEnd,
        left: this.leftDistance,
        right: this.rightDistance
      }
    }
  }
}

export default Virtual