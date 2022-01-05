



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

    // 顶部距离
    this.topDistance = 0

    this.rowStart = null
    this.rowEnd = null

    // 底部距离
    this.bottomDistance = 0

    // 左边距离
    this.leftDistance = 0

    this.colStart = null
    this.colEnd = null

    // 右边距离
    this.rightDistance = 0

    // 一屏可展示的条数
    this.screenRowSize = Math.floor(this.opts.viewHeight / this.opts.rowSize)

    this.scrollTop = 0
    this.scrollLeft = 0
  }

  // 获取行区间
  getRowsRegion (scrollTop, expand) {

    // 总行数小于等于50行，默认不开启虚拟滚动
    if (this.opts.rowsNum <= 50)  return null

    let start, end

    // 拓展展开溢出的高度
    let expandDistance = {
      top: 0,
      middle: 0,
      bottom: 0
    }

    const rowsNum = this.opts.rowsNum
    const rowSize = this.opts.rowSize
    const viewHeight = this.opts.viewHeight
    const pageSize = 30
    const overflowHeight = viewHeight / 2

    if (scrollTop < (viewHeight * 1.5)) {
      start = 0
      end = pageSize
    } else if (scrollTop - this.scrollTop > overflowHeight) {
      let topDistance = this.topDistance
      for (let i = this.rowStart; i < rowsNum; i++) {
        topDistance += rowSize + ((expand && expand[i]) || 0)
        if (topDistance >= scrollTop) {
          start = i - Math.floor(pageSize / 3)
          end = start + pageSize
          break
        } 
      }
    } else if (this.scrollTop - scrollTop > overflowHeight) {
      let topDistance = this.topDistance + overflowHeight
      if (topDistance >= scrollTop) {
        start = this.rowStart - Math.floor(pageSize / 3)
        end = start + pageSize
      }      

      if (this.topDistance - scrollTop > 100) {
        let topDistance = this.topDistance
        for (let i = this.rowStart; i > pageSize; i--) {
          topDistance -= rowSize + ((expand && expand[i]) || 0)
          if (topDistance <= scrollTop) {
            start = i - Math.floor(pageSize / 3)
            end = start + pageSize
            break
          }
        }
      }
    }

    if (expand) {
      for (const key in expand) {
        if (key < start) {
          expandDistance.top += expand[key]
        } else if (key > end) {
          expandDistance.bottom += expand[key]
        }
      }
    }

    if (end > rowsNum) {
      end = rowsNum
    }

    if (start < 0) {
      start = 0
    }
      
    if (start !== undefined && 
      end !== undefined && 
      (start !== this.rowStart || end !== this.rowEnd)) {
      
      this.scrollTop = scrollTop
      
      this.rowStart = start
      this.rowEnd = end

      this.topDistance = this.rowStart * this.opts.rowSize + expandDistance.top
      this.bottomDistance = (rowsNum - this.rowEnd) * this.opts.rowSize + expandDistance.bottom

      return {
        start: this.rowStart,
        end: this.rowEnd,
        top: this.topDistance,
        bottom: this.bottomDistance
      }
    }
  }

  // 更新行区间
  upRowsRegion () {

    const rowsNum = this.opts.rowsNum

    this.topDistance = this.rowStart * this.opts.rowSize
    this.bottomDistance = (rowsNum - this.rowEnd) * this.opts.rowSize

    return {
      start: this.rowStart,
      end: this.rowEnd,
      top: this.topDistance,
      bottom: this.bottomDistance
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