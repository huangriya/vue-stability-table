



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
    const pageSize = Math.ceil(viewHeight / rowSize)

    // 扩展行时
    if (expand) {
      let topDistance = this.topDistance
      if (scrollTop > this.scrollTop) {
        for (let i = this.rowStart || 0; i < rowsNum; i++) {
          topDistance += rowSize + ((expand && expand[i]) || 0)
          if (topDistance >= scrollTop) {
            start = i
            end = start + pageSize
            break
          } 
        }
      }
      if (scrollTop < this.scrollTop && topDistance >= scrollTop) {
        let midden = 0
        for (let i = this.rowStart; i < this.rowEnd; i++) {
          midden += rowSize + ((expand && expand[i]) || 0)
        }
        let endDistance = 0
        for (const key in expand) {
          if (key < this.rowEnd) {
            endDistance += expand[key]
          }
        }
        end = Math.floor((scrollTop + midden - endDistance) / rowSize)
        if (end < pageSize) end = pageSize
        start = end - pageSize
      }

      for (const key in expand) {
        if (key < start) {
          expandDistance.top += expand[key]
        } else if (key > end) {
          expandDistance.bottom += expand[key]
        }
      }
    } else {
      start = Math.floor(scrollTop / rowSize)
      end = start + pageSize
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
    this.bottomDistance = (rowsNum > this.rowEnd ? (rowsNum - this.rowEnd) : 0) * this.opts.rowSize

    return {
      start: this.rowStart,
      end: this.rowEnd,
      top: this.topDistance,
      bottom: this.bottomDistance
    }

  }

  emptyRowsRegion () {
    this.rowStart = null
    this.rowEnd = null
  }


  // 获取列区域
  getColRegion (scrollLeft) {

    // 单列平均宽度
    const itemSize = this.opts.colSize

    // 一屏的个数
    const screenNum = Math.floor(this.opts.viewWidth / itemSize)

    // 总列数小于30列数据时不开启虚拟滚动
    if (this.opts.colsNum <= 30) return null

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