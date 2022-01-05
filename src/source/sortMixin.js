export default {
  data () {
    return {
      activeSort: '',
      sortOrders: ''
    }
  },
  methods: {
    sortChange (item) {
      if (item.sortable) {
        if (!this.activeSort || !this.sortOrders || this.sortOrders === 'desc' || item.prop !== this.activeSort) {
          this.sortOrders = 'asc'
        } else if (this.sortOrders === 'asc') {
          this.sortOrders = 'desc'
        }
        
        //  else if(this.sortOrders === 'desc') {
        //   this.sortOrders = ''
        // }

        this.activeSort = item.prop
        if (this._events['on-sort-change']) {
          this.$emit('on-sort-change', item.prop, this.sortOrders, item)
        } else {

          let allRows = this.dataSource.slice(0)
          
          if (this.sortOrders) {
            allRows.sort((o, p) => {
              let a = o[item.prop], b = p[item.prop]
              if (a === b) return 0
              if (typeof a === typeof b && this.sortOrders === 'asc') {
                return a < b ? -1 : 1
              }
              return a > b ? -1 : 1
            })
          }

          // 重新获取行数据
          if (this.virtualScrollY) {
            this.virtualScrollY = this.virtual.upRowsRegion(this.expand)
            this.rows = allRows.slice(this.virtualScrollY.start, this.virtualScrollY.end)
          } else {
            this.rows = allRows
          }
        }
      }
    }
  }
}