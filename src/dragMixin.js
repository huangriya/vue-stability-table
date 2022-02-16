import { columns } from './props'

export default {

  data () {
    return {
      // 拖拽单元格宽度
      dragSize: {
        clientX: null,

        // 拖拽宽度
        dWidth: 0,

        height: 0,

        // 标尺left
        rulerLeft: 0,

        // 当前拖拽对象
        colItem: null
      }
    }
  },

  mounted () {

    // 添加单元格拖拽事件
    this.addDragEvent()
  },

  methods: {

    // 开始拖拽
    dragSizeDown (e, item) {
      
      this.dragSize.rulerLeft = (e.clientX - this.$refs.tableBox.getBoundingClientRect().x)
      this.dragSize.height = this.$refs.scroll.scrollHeight

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
      if (this.dragSize.clientX) {
        this.dragSize.clientX = null
        this.dragSize.element.setAttribute('data-darg-act', 'false')
        const minWidth = this.dragSize.colItem.minWidth || columns.minWidth
        let width = this.dragSize.width + this.dragSize.dWidth

        if (width < minWidth) {
          width = minWidth
        }

        this.dragSize.colItem.width = width
        window.removeEventListener('mousemove', this.dragSizeMove)
        this.$emit('resize-column', this.dragSize.colItem)
      }
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