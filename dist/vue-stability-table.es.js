const columns = {
  label: "",
  prop: "",
  subProp: "",
  align: "left",
  fixed: false,
  key: "",
  resizable: false,
  width: 100,
  minWidth: 80,
  maxWidth: null,
  formatter: null,
  sortable: false,
  class: ""
};
var props$1 = {
  columns: {
    type: Array
  },
  dataSource: {
    type: Array
  },
  sticky: {
    type: Boolean,
    default: false
  },
  childrenColumnName: {
    type: String,
    default: "children"
  },
  indentSize: {
    type: Number,
    default: 16
  },
  defaultExpandAllRows: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: [Boolean, Object],
    default: false
  },
  rowKey: {
    type: String,
    default: "id"
  },
  rowSize: {
    type: Number,
    default: 40
  },
  colSize: {
    type: Number,
    default: 100
  },
  emptyText: {
    type: String,
    default: "\u6682\u65E0\u6570\u636E"
  },
  openIconColumn: {
    type: Number,
    default: 0
  },
  scrollDisplayType: {
    type: String,
    default: "show"
  },
  sortMark: {
    type: Boolean,
    default: true
  },
  rowClassName: {
    type: Function
  }
};
var props = {
  minBarSize: {
    type: Number,
    default: 50
  },
  scrollTop: {
    type: Number,
    default: 0
  },
  scrollLeft: {
    type: Number,
    default: 0
  },
  displayType: {
    type: String,
    default: "hover"
  },
  offsetLeft: {
    type: Number,
    default: 0
  },
  offsetRight: {
    type: Number,
    default: 10
  },
  offsetTop: {
    type: Number,
    default: 0
  },
  offsetBottom: {
    type: Number,
    default: 10
  },
  isAutoUpdate: {
    type: Boolean,
    default: true
  },
  dragSpeedX: {
    type: Number,
    default: 1
  },
  dragSpeedY: {
    type: Number,
    default: 1
  }
};
var render$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "scrollBox", staticClass: "vue-agile-scrollbar", class: {
    "not-user-select": _vm.scrollBarX.clientX || _vm.scrollBarY.clientY,
    "scrollbar-hover": _vm.displayType === "hover",
    "scrollbar-hide": _vm.displayType === "hide"
  } }, [_c("div", { ref: "scroll", staticClass: "agile-scroll-content", on: { "scroll": _vm.onScroll } }, [_c("div", { ref: "scrollContent", staticClass: "agile-scroll-wrapper" }, [_vm._t("default")], 2)]), _vm.scrollBarX.show ? _c("div", { staticClass: "agile-scroll-bar-x", class: { act: _vm.scrollBarX.clientX || _vm.scrollBarY.clientY }, style: { left: _vm.scrollBarX.left + "px", width: _vm.scrollBarX.width + "px", bottom: _vm.scrollBarX.bottom }, on: { "mousedown": function($event) {
    return _vm.scrollBarDown($event, "scrollBarX");
  } } }) : _vm._e(), _vm.scrollBarY.show ? _c("div", { staticClass: "agile-scroll-bar-y", class: { act: _vm.scrollBarY.clientY || _vm.scrollBarX.clientX }, style: { top: _vm.scrollBarY.top + "px", height: _vm.scrollBarY.height + "px" }, on: { "mousedown": function($event) {
    return _vm.scrollBarDown($event, "scrollBarY");
  } } }) : _vm._e()]);
};
var staticRenderFns$3 = [];
function normalizeComponent$1(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$3 = {
  name: "vueAgileScrollBar",
  props,
  data() {
    return {
      scrollBarY: {
        show: true,
        clientY: null,
        height: 0,
        top: this.offsetTop,
        multiple: 1
      },
      scrollBarX: {
        show: true,
        clientX: null,
        width: 0,
        bottom: 0,
        left: this.offsetLeft,
        multiple: 1
      },
      scrollWidth: 0,
      scrollHeight: 0,
      scrollContentWidth: 0,
      scrollContentHeight: 0
    };
  },
  watch: {
    offsetLeft() {
      this.setScrollBarLeft();
    },
    offsetRight() {
      this.setScrollBarLeft();
    },
    offsetTop() {
      this.setScrollBarTop();
    },
    offsetBottom() {
      this.setScrollBarTop();
    }
  },
  mounted() {
    this.$scrollBox = this.$refs.scrollBox;
    this.$scroll = this.$refs.scroll;
    this.$scrollContent = this.$refs.scrollContent;
    this.setScrollLeft();
    this.setScrollTop();
    this.updated();
    if (this.isAutoUpdate) {
      this.observer = new MutationObserver(this.updated);
      this.observer.observe(this.$refs.scrollContent, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }
    this.addDragEvent();
  },
  methods: {
    initContainer() {
      this.scrollWidth = this.$scrollBox.offsetWidth;
      this.scrollHeight = this.$scrollBox.offsetHeight;
      this.scrollContentWidth = this.$scrollContent.offsetWidth;
      this.scrollContentHeight = this.$scrollContent.offsetHeight;
    },
    initScrollBar() {
      if (this.scrollContentWidth > this.scrollWidth) {
        const width = this.scrollWidth - (this.scrollContentWidth - this.scrollWidth) - this.offsetLeft - this.offsetRight;
        this.scrollBarX.show = true;
        this.scrollBarX.width = width < this.minBarSize ? this.minBarSize : width;
        this.scrollBarX.multiple = (this.scrollContentWidth - this.scrollWidth) / (this.scrollWidth - this.scrollBarX.width - this.offsetLeft - this.offsetRight);
      } else {
        this.scrollBarX.show = false;
      }
      if (this.scrollContentHeight > this.scrollHeight) {
        const height = this.scrollHeight - (this.scrollContentHeight - this.scrollHeight) - this.offsetTop - this.offsetBottom;
        this.scrollBarY.show = true;
        this.scrollBarY.height = height < this.minBarSize ? this.minBarSize : height;
        this.scrollBarY.multiple = (this.scrollContentHeight - this.scrollHeight) / (this.scrollHeight - this.scrollBarY.height - this.offsetTop - this.offsetBottom);
        this.scrollBarX.bottom = 0;
      } else {
        this.scrollBarY.show = false;
        this.scrollBarX.bottom = this.scrollHeight - this.scrollContentHeight + "px";
      }
    },
    updated() {
      this.initContainer();
      this.initScrollBar();
      this.$emit("updated", {
        scrollBarY: this.scrollBarY.show,
        scrollBarX: this.scrollBarX.show,
        top: this.$scroll.scrollTop,
        left: this.$scroll.scrollLeft,
        scrollWidth: this.scrollWidth,
        scrollHeight: this.scrollHeight,
        scrollContentWidth: this.scrollContentWidth,
        scrollContentHeight: this.scrollContentHeight
      });
    },
    setScrollBarLeft() {
      const scrollLeft = this.$scroll.scrollLeft;
      const left = this.offsetLeft + Math.floor(scrollLeft / this.scrollBarX.multiple);
      if (left !== this.scrollBarX.left) {
        this.scrollBarX.left = left;
      }
      return scrollLeft;
    },
    setScrollBarTop() {
      const scrollTop = this.$scroll.scrollTop;
      const top = this.offsetTop + Math.floor(scrollTop / this.scrollBarY.multiple);
      if (top !== this.scrollBarY.top) {
        this.scrollBarY.top = top;
      }
      return scrollTop;
    },
    onScroll(e) {
      const scrollTop = this.setScrollBarTop();
      const scrollLeft = this.setScrollBarLeft();
      this.$emit("scroll", {
        top: scrollTop,
        left: scrollLeft,
        scrollWidth: this.scrollWidth,
        scrollHeight: this.scrollHeight,
        scrollContentWidth: this.scrollContentWidth,
        scrollContentHeight: this.scrollContentHeight
      }, e);
      if (this._events["scroll-hit"]) {
        this.onScrollHit(scrollTop, scrollLeft);
      }
    },
    onScrollHit(scrollTop, scrollLeft) {
      let type = "top", scrollY = scrollTop - this.initTop, scrollX = scrollLeft - this.initLeft;
      this.initTop = scrollTop;
      this.initLeft = scrollLeft;
      const scrollHit = () => {
        this.$emit("scroll-hit", type, {
          top: scrollTop,
          left: scrollLeft,
          scrollWidth: this.scrollWidth,
          scrollHeight: this.scrollHeight,
          scrollContentWidth: this.scrollContentWidth,
          scrollContentHeight: this.scrollContentHeight
        });
      };
      if (scrollY !== 0 && this.scrollBarY.height) {
        scrollY < 0 ? type = "top" : type = "bottom";
        if (this.scrollContentHeight - this.scrollHeight - scrollTop === 0) {
          scrollHit();
        }
        if (scrollTop === 0 && type === "top") {
          scrollHit();
        }
      }
      if (scrollX !== 0 && this.scrollBarX.width) {
        scrollX < 0 ? type = "left" : type = "right";
        if (scrollLeft === 0 && type === "left") {
          scrollHit();
        } else if (this.scrollContentWidth - this.scrollWidth - scrollLeft === 0) {
          scrollHit();
        } else {
          type = "xMiddle";
          scrollHit();
        }
      }
    },
    scrollBarDown(e, key) {
      if (key === "scrollBarX") {
        this.scrollBarX.clientX = e.clientX;
        this.scrollBarX.scrollLeft = this.$scroll.scrollLeft;
      }
      if (key === "scrollBarY") {
        this.scrollBarY.clientY = e.clientY;
        this.scrollBarY.scrollTop = this.$scroll.scrollTop;
      }
      window.addEventListener("mousemove", this.scrollBarDrag);
    },
    scrollBarDrag(e) {
      const clientX = this.scrollBarX.clientX;
      const clientY = this.scrollBarY.clientY;
      if (clientX) {
        let dragX = e.clientX - clientX;
        this.$scroll.scrollLeft = this.scrollBarX.scrollLeft + dragX * (this.scrollBarX.multiple * this.dragSpeedX);
      }
      if (clientY) {
        let dragY = e.clientY - clientY;
        this.$scroll.scrollTop = this.scrollBarY.scrollTop + dragY * this.scrollBarY.multiple * this.dragSpeedY;
      }
    },
    scrollBarUp() {
      this.scrollBarX.clientX = null;
      this.scrollBarY.clientY = null;
      window.removeEventListener("mousemove", this.scrollBarDrag);
    },
    addDragEvent() {
      window.addEventListener("mouseup", this.scrollBarUp);
    },
    removeDragEvent() {
      window.removeEventListener("mouseup", this.scrollBarUp);
    },
    setScrollLeft(number) {
      if (number >= 0 || this.scrollLeft >= 0) {
        this.$scroll.scrollLeft = number || this.scrollLeft;
      }
    },
    setScrollTop(number) {
      if (number >= 0 || this.scrollTop >= 0) {
        this.$scroll.scrollTop = number || this.scrollTop;
      }
    }
  },
  beforeDestroy() {
    if (this.isAutoUpdate && this.observer) {
      this.observer.disconnect();
    }
    this.removeDragEvent();
  }
};
const __cssModules$3 = {};
var __component__$3 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$3, render$3, staticRenderFns$3, false, __vue2_injectStyles$3, null, null, null);
function __vue2_injectStyles$3(context) {
  for (let o in __cssModules$3) {
    this[o] = __cssModules$3[o];
  }
}
var vueAgileScrollbar = /* @__PURE__ */ function() {
  return __component__$3.exports;
}();
var style = "";
class Virtual {
  constructor(options) {
    this.opts = Object.assign({}, {
      rowsNum: 0,
      colsNum: 0,
      rowSize: 50,
      colSize: 100,
      expandSize: null,
      fixedColNum: 0,
      viewHeight: 500,
      viewWidth: 800
    }, options);
    this.topDistance = 0;
    this.rowStart = null;
    this.rowEnd = null;
    this.bottomDistance = 0;
    this.leftDistance = 0;
    this.colStart = null;
    this.colEnd = null;
    this.rightDistance = 0;
    this.scrollTop = 0;
    this.scrollLeft = 0;
  }
  getRowsRegion(scrollTop, expand) {
    if (this.opts.rowsNum <= 50)
      return null;
    let start, end;
    let expandDistance = {
      top: 0,
      middle: 0,
      bottom: 0
    };
    const rowsNum = this.opts.rowsNum;
    const rowSize = this.opts.rowSize;
    const viewHeight = this.opts.viewHeight;
    const pageSize = Math.ceil(viewHeight / rowSize);
    if (expand) {
      let topDistance = this.topDistance;
      if (scrollTop > this.scrollTop) {
        for (let i = this.rowStart || 0; i < rowsNum; i++) {
          topDistance += rowSize + (expand && expand[i] || 0);
          if (topDistance >= scrollTop) {
            start = i;
            end = start + pageSize;
            break;
          }
        }
      }
      if (scrollTop < this.scrollTop && topDistance >= scrollTop) {
        let midden = 0;
        for (let i = this.rowStart; i < this.rowEnd; i++) {
          midden += rowSize + (expand && expand[i] || 0);
        }
        let endDistance = 0;
        for (const key in expand) {
          if (key < this.rowEnd) {
            endDistance += expand[key];
          }
        }
        end = Math.floor((scrollTop + midden - endDistance) / rowSize);
        if (end < pageSize)
          end = pageSize;
        start = end - pageSize;
      }
      for (const key in expand) {
        if (key < start) {
          expandDistance.top += expand[key];
        } else if (key > end) {
          expandDistance.bottom += expand[key];
        }
      }
    } else {
      start = Math.floor(scrollTop / rowSize);
      end = start + pageSize;
    }
    if (end > rowsNum) {
      end = rowsNum;
    }
    if (start < 0) {
      start = 0;
    }
    if (start !== void 0 && end !== void 0 && (start !== this.rowStart || end !== this.rowEnd)) {
      this.scrollTop = scrollTop;
      this.rowStart = start;
      this.rowEnd = end;
      this.topDistance = this.rowStart * this.opts.rowSize + expandDistance.top;
      this.bottomDistance = (rowsNum - this.rowEnd) * this.opts.rowSize + expandDistance.bottom;
      return {
        start: this.rowStart,
        end: this.rowEnd,
        top: this.topDistance,
        bottom: this.bottomDistance
      };
    }
  }
  upRowsRegion() {
    const rowsNum = this.opts.rowsNum;
    this.topDistance = this.rowStart * this.opts.rowSize;
    this.bottomDistance = (rowsNum > this.rowEnd ? rowsNum - this.rowEnd : 0) * this.opts.rowSize;
    return {
      start: this.rowStart,
      end: this.rowEnd,
      top: this.topDistance,
      bottom: this.bottomDistance
    };
  }
  emptyRowsRegion() {
    this.rowStart = null;
    this.rowEnd = null;
  }
  getColRegion(scrollLeft) {
    const itemSize = this.opts.colSize;
    const screenNum = Math.floor(this.opts.viewWidth / itemSize);
    if (this.opts.colsNum <= 30)
      return null;
    let start, end, isLast;
    if (scrollLeft < this.opts.viewWidth) {
      start = 0;
      end = screenNum * 2;
    } else {
      start = Math.floor(scrollLeft / itemSize) - screenNum;
      let endSum = start + screenNum * 3;
      end = endSum;
      if (endSum > this.opts.colsNum) {
        end = this.opts.colsNum;
        this.rightDistance = 0;
        isLast = true;
      }
    }
    this.scrollLeft = scrollLeft;
    if ((start !== this.colStart || end !== this.colEnd) && end - this.colEnd > 5 || this.colEnd - end > 5 || isLast) {
      this.colStart = start;
      this.colEnd = end;
      this.leftDistance = this.colStart * itemSize;
      this.rightDistance = (this.opts.colsNum - this.colEnd) * itemSize;
      return {
        start: this.colStart,
        end: this.colEnd,
        left: this.leftDistance,
        right: this.rightDistance
      };
    }
  }
}
var dragMixin = {
  data() {
    return {
      dragSize: {
        clientX: null,
        dWidth: 0,
        height: 0,
        rulerLeft: 0,
        colItem: null
      }
    };
  },
  mounted() {
    this.addDragEvent();
  },
  methods: {
    dragSizeDown(e, item) {
      this.dragSize.rulerLeft = e.clientX - this.$refs.tableBox.getBoundingClientRect().x;
      this.dragSize.height = this.$refs.scroll.scrollHeight;
      this.dragSize.clientX = e.clientX;
      this.dragSize.width = item.width;
      this.dragSize.colItem = item;
      this.dragSize.element = e.target;
      window.addEventListener("mousemove", this.dragSizeMove);
      this.dragSize.element.setAttribute("data-darg-act", "true");
    },
    dragSizeMove(e) {
      const clientX = this.dragSize.clientX;
      if (clientX) {
        let dragX = e.clientX - clientX;
        this.dragSize.dWidth = dragX;
        this.$refs.dargSizeRuler.style.left = this.dragSize.rulerLeft + dragX + "px";
      }
    },
    dragSizeUp() {
      if (this.dragSize.clientX) {
        this.dragSize.clientX = null;
        this.dragSize.element.setAttribute("data-darg-act", "false");
        const minWidth = this.dragSize.colItem.minWidth || columns.minWidth;
        let width = this.dragSize.width + this.dragSize.dWidth;
        if (width < minWidth) {
          width = minWidth;
        }
        this.dragSize.colItem.width = width;
        window.removeEventListener("mousemove", this.dragSizeMove);
      }
    },
    addDragEvent() {
      window.addEventListener("mouseup", this.dragSizeUp);
    },
    removeDragEvent() {
      window.removeEventListener("mouseup", this.dragSizeUp);
    }
  },
  beforeDestroy() {
    this.removeDragEvent();
  }
};
var sortMixin = {
  data() {
    return {
      activeSort: "",
      sortOrders: ""
    };
  },
  methods: {
    getActSortClass(item) {
      if (this.sortMark && item.sortable && item.prop === this.activeSort) {
        return true;
      }
      return false;
    },
    sortChange(item) {
      if (item.sortable) {
        if (!this.activeSort || !this.sortOrders || this.sortOrders === "desc" || item.prop !== this.activeSort) {
          this.sortOrders = "asc";
        } else if (this.sortOrders === "asc") {
          this.sortOrders = "desc";
        }
        this.activeSort = item.prop;
        if (this._events["on-sort-change"]) {
          this.$emit("on-sort-change", item.prop, this.sortOrders, item);
        } else {
          let allRows = this.dataSource.slice(0);
          if (this.sortOrders) {
            allRows.sort((o, p) => {
              let a = o[item.prop], b = p[item.prop];
              if (a === b)
                return 0;
              if (typeof a === typeof b && this.sortOrders === "asc") {
                return a < b ? -1 : 1;
              }
              return a > b ? -1 : 1;
            });
          }
          this.tree = {};
          this.allRows = allRows;
          this.$refs.scroll.setScrollTop(0);
          if (this.virtualScrollY) {
            this.virtualScrollY = this.virtual.upRowsRegion(this.expand);
            this.rows = allRows.slice(this.virtualScrollY.start, this.virtualScrollY.end);
          } else {
            this.rows = allRows;
          }
        }
      }
    }
  }
};
var render$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "stability-table-column-sorter" }, [_c("span", { staticClass: "stability-table-column-sorter-inner" }, [_c("span", { staticClass: "stability-table-column-sorter-up", class: { "sort-act": _vm.sort && _vm.activeSort && _vm.sort === _vm.activeSort && _vm.sortOrders === "asc" }, attrs: { "role": "img" } }, [_c("svg", { attrs: { "focusable": "false", "width": "11", "height": "11", "fill": "currentColor", "aria-hidden": "true", "viewBox": "0 0 1024 1024" } }, [_c("path", { attrs: { "d": "M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" } })])]), _c("span", { staticClass: "stability-table-column-sorter-down", class: { "sort-act": _vm.sort && _vm.activeSort && _vm.sort === _vm.activeSort && _vm.sortOrders === "desc" }, attrs: { "role": "img" } }, [_c("svg", { attrs: { "focusable": "false", "width": "11", "height": "11", "fill": "currentColor", "aria-hidden": "true", "viewBox": "0 0 1024 1024" } }, [_c("path", { attrs: { "d": "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" } })])])])]);
};
var staticRenderFns$2 = [];
var sort_vue_vue_type_style_index_0_lang = "";
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$2 = {
  props: {
    sort: {
      type: String,
      default: ""
    },
    activeSort: {
      type: String,
      default: ""
    },
    sortOrders: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {}
};
const __cssModules$2 = {};
var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
function __vue2_injectStyles$2(context) {
  for (let o in __cssModules$2) {
    this[o] = __cssModules$2[o];
  }
}
var Sort = /* @__PURE__ */ function() {
  return __component__$2.exports;
}();
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("i", { staticClass: "stability-table-open-icon", class: { "rotate-down": _vm.active } }, [_c("svg", { attrs: { "viewBox": "64 64 896 896", "data-icon": "right", "width": "10", "height": "10", "fill": "currentColor", "aria-hidden": "true", "focusable": "false" } }, [_c("path", { attrs: { "d": "M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z" } })])]);
};
var staticRenderFns$1 = [];
var openIcon_vue_vue_type_style_index_0_lang = "";
const __vue2_script$1 = {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var openIcon = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
const getAttrKeys = function(attrs) {
  let dataAttr = {};
  for (let i = 0; i < attrs.length; i++) {
    let item = attrs[i];
    let temp = {
      key: item.name,
      value: item.value
    };
    dataAttr[temp.key] = temp.value;
  }
  return dataAttr;
};
let fixEvent = function(e) {
  if (!e.target) {
    e.target = e.srcElement;
    e.pageX = e.x;
    e.pageY = e.y;
  }
  if (/mouseover/i.test(e.type) && !e.relatedTarget) {
    e.relatedTarget = e.fromElement;
  } else if (/mouseout/i.test(e.type) && !e.relatedTarget) {
    e.relatedTarget = e.toElement;
  }
  return e;
};
const eventAgent = (evt, func) => {
  const evt1 = fixEvent(evt);
  const actEl = evt1.currentTarget;
  let el = evt1.target, actionType, isFind, attr;
  while (el && el !== actEl) {
    actionType = el.getAttribute("event-agent") || "";
    actionType = actionType.trim().toLowerCase().split(",");
    if (actionType.indexOf(evt1.type.toLowerCase()) !== -1) {
      attr = getAttrKeys(el.attributes);
      isFind = true;
      break;
    }
    el = el.parentNode;
  }
  isFind && func && func(el, attr);
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "stability-table", class: { "not-user-select": _vm.dragSize.clientX } }, [_c("div", { ref: "tableBox", staticClass: "stability-table-wrapper" }, [_c("vueAgileScrollbar", { ref: "scroll", attrs: { "dragSpeedY": 0.6, "displayType": _vm.scrollDisplayType, "offsetLeft": _vm.offsetLeft, "offsetRight": _vm.offsetRight, "offsetTop": _vm.offsetTop }, on: { "scroll": _vm.scroll, "updated": _vm.scrollUpdated, "scroll-hit": _vm.scrollHit } }, [_c("table", { staticClass: "stability-wrapper-table", class: {
    "not-sticky": !_vm.stickyType,
    "not-sticky-left": _vm.stickyType === "left",
    "not-sticky-right": _vm.stickyType === "right"
  }, attrs: { "cellpadding": "0", "cellspacing": "0" }, on: { "click": _vm.tableClcik } }, [_c("thead", { ref: "tabelHead", staticClass: "stability-wrapper-table-head" }, [_c("tr", [_vm._l(_vm.head.left, function(item, i) {
    return _c("th", { key: item.prop, class: [{ "sticky-left": i === _vm.head.left.length - 1 }, item.class, { "act-sort": _vm.getActSortClass(item) }], style: _vm.getSticky(item, i), attrs: { "sticky": "left" } }, [_c("div", { staticClass: "stability-table-cell cell-flex", class: _vm.getCellClass(item).concat([{ "sortable-column": item.sortable }]), on: { "click": function($event) {
      return _vm.sortChange(item);
    } } }, [_c("div", { staticClass: "text-content", attrs: { "title": item.label } }, [_vm._t("headerText", function() {
      return [_vm._v(_vm._s(item.label))];
    }, { "column": item })], 2), item.sortable ? _c("Sort", { attrs: { "sort": item.prop, "sortOrders": _vm.sortOrders, "activeSort": _vm.activeSort } }) : _vm._e()], 1), item.resizable && item.width > 0 ? _c("span", { staticClass: "resize-handle", on: { "mousedown": function($event) {
      return _vm.dragSizeDown($event, item);
    } } }) : _vm._e()]);
  }), _vm.virtualScrollX ? _c("td", { style: { "width": _vm.virtualScrollX.left + "px" } }) : _vm._e(), _vm._l(_vm.cols, function(item) {
    return _c("th", { key: item.prop, class: [item.class, { "act-sort": _vm.getActSortClass(item) }], style: _vm.getThStyle(item) }, [_c("div", { staticClass: "stability-table-cell cell-flex", class: _vm.getCellClass(item).concat([{ "sortable-column": item.sortable }]), on: { "click": function($event) {
      return _vm.sortChange(item);
    } } }, [_c("div", { staticClass: "text-content", attrs: { "title": item.label } }, [_vm._t("headerText", function() {
      return [_vm._v(_vm._s(item.label))];
    }, { "column": item })], 2), item.sortable ? _c("Sort", { attrs: { "sort": item.prop, "sortOrders": _vm.sortOrders, "activeSort": _vm.activeSort } }) : _vm._e()], 1), item.resizable && item.width > 0 ? _c("span", { staticClass: "resize-handle", on: { "mousedown": function($event) {
      return _vm.dragSizeDown($event, item);
    } } }) : _vm._e()]);
  }), _vm.virtualScrollX ? _c("td", { style: { "width": _vm.virtualScrollX.right + "px" } }) : _vm._e(), _vm._l(_vm.head.right, function(item, i) {
    return _c("th", { key: item.prop, class: [{ "sticky-right": i === 0 }, item.class, { "act-sort": _vm.getActSortClass(item) }], style: _vm.getSticky(item, _vm.head.right.length - 1 - i), attrs: { "sticky": "right" } }, [_c("div", { staticClass: "stability-table-cell cell-flex", class: _vm.getCellClass(item).concat([{ "sortable-column": item.sortable }]), on: { "click": function($event) {
      return _vm.sortChange(item);
    } } }, [_c("div", { staticClass: "text-content", attrs: { "title": item.label } }, [_vm._t("headerText", function() {
      return [_vm._v(_vm._s(item.label))];
    }, { "column": item })], 2), item.sortable ? _c("Sort", { attrs: { "sort": item.prop, "sortOrders": _vm.sortOrders, "activeSort": _vm.activeSort } }) : _vm._e()], 1), item.resizable && item.width > 0 ? _c("span", { staticClass: "resize-handle", on: { "mousedown": function($event) {
      return _vm.dragSizeDown($event, item);
    } } }) : _vm._e()]);
  })], 2)]), _c("tbody", [_vm.virtualScrollY ? _c("tr", { ref: "virtualTop", style: { height: _vm.virtualScrollY.top + "px" } }) : _vm._e(), _vm._l(_vm.rows, function(row, i) {
    return [_c("tr", { key: row[_vm.rowKey], staticClass: "stability-wrapper-table-tbody-tr", on: { "click": function($event) {
      _vm.trClick(row, _vm.expandKey(i));
    } } }, [_vm._l(_vm.head.left, function(item, j) {
      return _c("td", { key: item.prop, class: [{ "sticky-left": j === _vm.head.left.length - 1 }, item.class, { "act-sort": _vm.getActSortClass(item) }], style: _vm.getSticky(item, j), attrs: { "sticky": "left" } }, [_c("div", { staticClass: "stability-table-cell cell-flex", class: _vm.getCellClass(item) }, [j === _vm.openIconColumn ? _c("span", { style: { width: row._treeIndex_ * 17 + "px" } }) : _vm._e(), j === _vm.openIconColumn && row[_vm.childrenColumnName] && row[_vm.childrenColumnName].length ? _c("open-icon", { attrs: { "active": _vm.tree[row[_vm.rowKey]] }, nativeOn: { "click": function($event) {
        _vm.treeOpen(row, _vm.expandKey(i));
      } } }) : _vm._e(), _vm._t("content", function() {
        return [_c("div", { staticClass: "text-content", attrs: { "title": _vm.getContent(row, item), "event-agent": "click", "row-index": _vm.expandKey(i), "col-index": j } }, [_vm._v(" " + _vm._s(_vm.getContent(row, item)) + " "), item.subProp ? [_c("br"), _c("span", { staticClass: "sub-text-content" }, [_vm._v(_vm._s(row[item.subProp]))])] : _vm._e()], 2)];
      }, { "row": row, "column": item, "content": _vm.getContent(row, item), "rowIndex": _vm.expandKey(i) })], 2)]);
    }), _vm.virtualScrollX ? _c("td") : _vm._e(), _vm._l(_vm.cols, function(item, j) {
      return _c("td", { key: item.prop, class: [item.class, { "act-sort": _vm.getActSortClass(item) }] }, [_c("div", { staticClass: "stability-table-cell", class: _vm.getCellClass(item) }, [_vm._t("content", function() {
        return [_c("div", { staticClass: "text-content", attrs: { "title": _vm.getContent(row, item), "event-agent": "click", "row-index": _vm.expandKey(i), "col-index": _vm.head.left.length + j + (_vm.virtualScrollX ? _vm.virtualScrollX.start : 0) } }, [_vm._v(" " + _vm._s(_vm.getContent(row, item)) + " "), item.subProp ? [_c("br"), _c("span", { staticClass: "sub-text-content" }, [_vm._v(_vm._s(row[item.subProp]))])] : _vm._e()], 2)];
      }, { "row": row, "column": item, "content": _vm.getContent(row, item), "rowIndex": _vm.expandKey(i) })], 2)]);
    }), _vm.virtualScrollX ? _c("td") : _vm._e(), _vm._l(_vm.head.right, function(item, j) {
      return _c("td", { key: item.prop, class: [{ "sticky-right": j === 0 }, item.class, { "act-sort": _vm.getActSortClass(item) }], style: _vm.getSticky(item, _vm.head.right.length - 1 - j), attrs: { "sticky": "right" } }, [_c("div", { staticClass: "stability-table-cell", class: _vm.getCellClass(item) }, [_vm._t("content", function() {
        return [_c("div", { staticClass: "text-content", attrs: { "title": _vm.getContent(row, item), "event-agent": "click", "row-index": _vm.expandKey(i), "col-index": _vm.head.left.length + _vm.head.middle.length + j } }, [_vm._v(" " + _vm._s(_vm.getContent(row, item)) + " "), item.subProp ? [_c("br"), _c("span", { staticClass: "sub-text-content" }, [_vm._v(_vm._s(row[item.subProp]))])] : _vm._e()], 2)];
      }, { "row": row, "column": item, "content": _vm.getContent(row, item), "rowIndex": _vm.expandKey(i) })], 2)]);
    })], 2), _vm.expand && _vm.expand[_vm.expandKey(i)] ? _c("tr", { key: row[_vm.rowKey] + "expand", ref: row[_vm.rowKey] + "expand", refInFor: true }, [_c("td", { attrs: { "colspan": _vm.columns.length } }, [_c("div", { staticClass: "tr-expand", style: { width: _vm.$refs.scroll.scrollWidth + "px" } }, [_vm._t("expand", null, { "row": row, "rowIndex": _vm.expandKey(i) })], 2)])]) : _vm._e()];
  }), _vm.virtualScrollY ? _c("tr", { ref: "virtualBottom", style: { height: _vm.virtualScrollY.bottom + "px" } }) : _vm._e()], 2)])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.dragSize.clientX, expression: "dragSize.clientX" }], ref: "dargSizeRuler", staticClass: "darg-size-ruler", style: { left: _vm.dragSize.rulerLeft + "px", height: _vm.dragSize.height + "px" } })], 1)]);
};
var staticRenderFns = [];
var stabilityTable_vue_vue_type_style_index_0_lang = "";
const __vue2_script = {
  components: { vueAgileScrollbar, Sort, openIcon },
  props: props$1,
  mixins: [dragMixin, sortMixin],
  data() {
    return {
      allRows: [],
      head: {
        left: [],
        middle: [],
        right: []
      },
      rows: [],
      cols: [],
      expand: null,
      tree: {},
      virtualScrollX: null,
      virtualScrollY: null,
      offsetTop: 0,
      stickyType: ""
    };
  },
  watch: {
    columns(v) {
      this.updateColumns(v);
    },
    dataSource(v) {
      this.updateRows(v);
    }
  },
  computed: {
    offsetLeft() {
      let num = 5;
      this.head.left.forEach((o) => {
        num += o.width > 0 ? o.width : columns.minWidth;
      });
      return num;
    },
    offsetRight() {
      let num = 5;
      this.head.right.forEach((o) => {
        num += o.width > 0 ? o.width : columns.minWidth;
      });
      return num;
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.setOffsetTop();
  },
  methods: {
    init() {
      if (!this.dataSource.length || !this.columns.length)
        return;
      this.setHead();
      this.allRows = this.dataSource.slice(0);
      this.setVirtual();
      this.setCols(0);
      this.setRows(0);
    },
    updateColumns(columns2) {
      this.$refs.scroll.setScrollLeft(0);
      this.head = {
        left: [],
        middle: [],
        right: []
      };
      this.cols = [];
      this.setVirtual({
        colsNum: columns2.length
      });
      this.setHead(columns2);
      this.setCols(0);
    },
    updateRows(data) {
      const dataSource = data || this.dataSource;
      this.$refs.scroll.setScrollTop(0);
      this.allRows = dataSource.slice(0);
      this.setVirtual({
        rowsNum: this.allRows.length
      });
      this.setRows(0);
    },
    setVirtual(opts = {}) {
      if (!this.virtual) {
        this.virtual = new Virtual({
          rowsNum: this.dataSource.length,
          colsNum: this.head.middle.length,
          rowSize: this.rowSize,
          colSize: this.colSize
        });
      } else {
        for (let key in opts) {
          this.virtual.opts[key] = opts[key];
        }
      }
    },
    setHead(cols) {
      const columns2 = cols || this.columns;
      let left = [], middle = [], right = [], columnsLen = columns2.length, start = null, end = null;
      for (let i = 0; i < columnsLen; i++) {
        const startItem = columns2[i];
        if (startItem.fixed) {
          startItem.fixed = "left";
          left.push(startItem);
        } else {
          start = i;
          break;
        }
      }
      for (let j = columnsLen - 1; j >= 0; j--) {
        const endItem = columns2[j];
        if (endItem.fixed) {
          endItem.fixed = "right";
          right.unshift(endItem);
        } else {
          end = j;
          break;
        }
      }
      middle = columns2.slice(start, end + 1);
      this.head = {
        left,
        middle,
        right
      };
      this.setOffsetTop();
    },
    setOffsetTop() {
      if (this.$refs.tabelHead) {
        this.offsetTop = this.$refs.tabelHead.offsetHeight + 5;
      }
    },
    setRows(scrollTop) {
      let rowsRegion = this.virtual.getRowsRegion(scrollTop, this.expand);
      if (rowsRegion) {
        const virtualScrollY = rowsRegion;
        this.rows = this.allRows.slice(virtualScrollY.start, virtualScrollY.end);
        this.virtualScrollY = virtualScrollY;
      } else if (rowsRegion === null) {
        this.rows = this.allRows;
        this.virtualScrollY = null;
        this.virtual.emptyRowsRegion();
      }
    },
    setCols(scrollLeft) {
      let colsRegion = this.virtual.getColRegion(scrollLeft);
      if (colsRegion) {
        this.virtualScrollX = colsRegion;
        this.cols = this.head.middle.slice(this.virtualScrollX.start, this.virtualScrollX.end);
      } else if (colsRegion === null) {
        this.cols = this.head.middle;
      }
    },
    getContent(row, col) {
      let text = row[col.prop];
      if (col.formatter && typeof col.formatter === "function" && text) {
        return col.formatter(text);
      }
      return text;
    },
    getThStyle(item) {
      let obj = {
        width: (item.width > 0 ? item.width : columns.width) + "px"
      };
      return obj;
    },
    getCellClass(item) {
      const align = {
        "left": "align-left",
        "center": "align-center",
        "right": "align-right"
      };
      let classArr = [align[item.align || columns.align]];
      return classArr;
    },
    getSticky(item, colIndex) {
      let colItem = item;
      if (item.fixed === "left") {
        colItem = colIndex ? this.head.left[colIndex - 1] : item;
      }
      if (item.fixed === "right") {
        colItem = colIndex ? this.head.right[colIndex] : item;
      }
      const width = item.width > 0 ? item.width : columns.width;
      let stylesObj = {
        width: width + "px",
        [item.fixed]: colIndex * (colItem.width || columns.width) + "px"
      };
      return stylesObj;
    },
    scroll(v) {
      if (this.virtualScrollX) {
        this.setCols(v.left);
      }
      if (this.virtualScrollY || this.isUpdateRows) {
        this.setRows(v.top);
        this.isUpdateRows = false;
      }
      this.scrollTop = v.top;
    },
    trClick(row, rowIndex) {
      if (this.$scopedSlots.expand) {
        if (!this.expand) {
          this.expand = {};
        }
        if (!this.expand[rowIndex]) {
          this.$set(this.expand, rowIndex, true);
        } else {
          this.expand[rowIndex] = false;
        }
        this.$nextTick(() => {
          if (this.expand[rowIndex]) {
            this.expand[rowIndex] = this.$refs[row[this.rowKey] + "expand"][0].offsetHeight;
          }
        });
        this.$emit("on-expand-change", row, this.expand[rowIndex]);
      }
    },
    expandKey(i) {
      if (this.virtualScrollY) {
        return i + this.virtualScrollY.start;
      }
      return i;
    },
    scrollUpdated(v) {
      if (this.virtual) {
        if (v.scrollHeight) {
          this.virtual.opts.viewHeight = v.scrollHeight;
        }
        if (v.scrollWidth) {
          this.virtual.opts.viewWidth = v.scrollWidth;
        }
      }
      this.dragSize.height = v.scrollContentHeight > v.scrollHeight ? v.scrollHeight : v.scrollContentHeight;
      if (v.scrollBarX) {
        if (v.left === 0) {
          this.stickyType = "left";
        }
      } else {
        this.stickyType = "";
      }
    },
    scrollHit(v) {
      this.stickyType = v;
    },
    treeOpen(row, rowIndex) {
      let rowKey = row[this.rowKey];
      let childrenList = row[this.childrenColumnName];
      if (!this.tree[rowKey]) {
        this.$set(this.tree, rowKey, true);
        childrenList.forEach((o) => {
          let rowTreeIndex = row["_treeIndex_"];
          rowTreeIndex ? o["_treeIndex_"] = rowTreeIndex + 1 : o["_treeIndex_"] = 1;
        });
        this.allRows.splice(rowIndex + 1, 0, ...childrenList);
      } else {
        this.tree[rowKey] = false;
        this.allRows.splice(rowIndex + 1, childrenList.length);
      }
      this.isUpdateRows = true;
      this.virtual.opts.rowsNum = this.allRows.length;
      if (this.virtualScrollY) {
        this.virtualScrollY = this.virtual.upRowsRegion(this.expand);
        this.rows = this.allRows.slice(this.virtualScrollY.start, this.virtualScrollY.end);
      } else {
        this.rows = this.allRows;
      }
    },
    doLayout() {
      this.setOffsetTop();
      this.$refs.scroll.updated();
    },
    tableClcik(event) {
      if (this._events["cell-text-click"]) {
        eventAgent(event, (e, attr) => {
          const rowIndex = attr["row-index"];
          const colIndex = attr["col-index"];
          this.$emit("cell-text-click", this.columns[colIndex], this.allRows[rowIndex], e);
        });
      }
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var stabilityTable = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { stabilityTable as default };
