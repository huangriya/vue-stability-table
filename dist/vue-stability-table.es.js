const columns = {
  label: "",
  prop: "",
  align: "left",
  fixed: false,
  key: "",
  resizable: false,
  width: null,
  minWidth: 80,
  maxWidth: null,
  formatter: null
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
  defaultExpandAllRows: {
    type: Boolean,
    default: false
  },
  pagination: {
    type: [Boolean, Object],
    default: false
  },
  rowClassName: {
    type: String,
    default: ""
  },
  rowKey: {
    type: String,
    default: ""
  },
  rowSize: {
    type: Number,
    default: 50
  },
  expandSize: {
    type: Number,
    default: null
  },
  colSize: {
    type: Number,
    default: 80
  },
  emptyText: {
    type: String,
    default: "\u6682\u65E0\u6570\u636E"
  }
};
var props = {
  minBarSize: {
    type: Number,
    default: 50
  },
  scrollTop: {
    type: [Number, Function],
    default: 0
  },
  scrollLeft: {
    type: [Number, Function],
    default: 0
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
  offsetHit: {
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
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { ref: "scrollBox", staticClass: "vue-agile-scrollbar", class: { "not-user-select": _vm.scrollBarX.clientX || _vm.scrollBarY.clientY } }, [_c("div", { ref: "scroll", staticClass: "agile-scroll-content", on: { "scroll": _vm.onScroll } }, [_c("div", { ref: "scrollContent", staticClass: "agile-scroll-wrapper" }, [_vm._t("default")], 2)]), _vm.scrollBarX.show ? _c("div", { staticClass: "agile-scroll-bar-x", class: { act: _vm.scrollBarX.clientX || _vm.scrollBarY.clientY }, style: { left: _vm.scrollBarX.left + "px", width: _vm.scrollBarX.width + "px", bottom: _vm.scrollBarX.bottom }, on: { "mousedown": function($event) {
    return _vm.scrollBarDown($event, "scrollBarX");
  } } }) : _vm._e(), _vm.scrollBarY.show ? _c("div", { staticClass: "agile-scroll-bar-y", class: { act: _vm.scrollBarY.clientY || _vm.scrollBarX.clientX }, style: { top: _vm.scrollBarY.top + "px", height: _vm.scrollBarY.height + "px" }, on: { "mousedown": function($event) {
    return _vm.scrollBarDown($event, "scrollBarY");
  } } }) : _vm._e()]);
};
var staticRenderFns$1 = [];
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
const __vue2_script$1 = {
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
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
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
          this.ticking = false;
        });
        this.ticking = true;
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
    }
  },
  beforeDestroy() {
    if (this.isAutoUpdate && this.observer) {
      this.observer.disconnect();
    }
    this.removeDragEvent();
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent$1(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var vueAgileScrollbar = /* @__PURE__ */ function() {
  return __component__$1.exports;
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
    this.rowStart = null;
    this.rowEnd = null;
    this.colStart = null;
    this.colEnd = null;
    this.topDistance = 0;
    this.bottomDistance = 0;
    this.leftDistance = 0;
    this.rightDistance = 0;
    this.scrollTop = 0;
  }
  getRowsRegion(scrollTop, expand, virtualBottom, virtualTop) {
    if (this.opts.rowsNum <= 60) {
      return null;
    }
    if (!scrollTop || Math.abs(scrollTop - this.scrollTop) > this.opts.rowSize) {
      this.scrollTop = scrollTop;
      let start, end;
      let expandDistance = {
        top: 0,
        middle: 0,
        bottom: 0
      };
      if (scrollTop < this.opts.viewHeight) {
        start = 0;
        end = 30;
      } else if (virtualBottom.offsetTop - scrollTop < this.opts.viewHeight) {
        start = this.rowEnd - 10;
        end = start + 30;
        if (end > this.opts.rowsNum) {
          end = this.opts.rowsNum;
        }
        if (this.opts.expandSize) {
          for (const key in expand) {
            if (key < start) {
              expandDistance.top += this.opts.expandSize;
            }
          }
        }
      } else if (virtualTop && scrollTop - virtualTop.clientHeight < 100) {
        start = this.rowStart - 20;
        end = this.rowEnd - 20;
        if (this.opts.expandSize) {
          for (const key in expand) {
            if (key < start) {
              expandDistance.top += this.opts.expandSize;
            } else if (key > end) {
              expandDistance.bottom += this.opts.expandSize;
            }
          }
        }
      }
      if (start !== void 0 && end !== void 0 && start !== this.rowStart && end !== this.rowEnd) {
        this.rowStart = start;
        this.rowEnd = end;
        this.topDistance = this.rowStart * this.opts.rowSize + expandDistance.top;
        this.bottomDistance = (this.opts.rowsNum - this.rowEnd) * this.opts.rowSize + expandDistance.bottom;
        return {
          start: this.rowStart,
          end: this.rowEnd,
          top: this.topDistance,
          bottom: this.bottomDistance
        };
      }
    }
  }
  getColRegion(scrollLeft) {
    const itemSize = this.opts.colSize;
    const screenNum = Math.floor(this.opts.viewWidth / itemSize);
    if (this.opts.colsNum <= screenNum * 3) {
      return null;
    }
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
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "vue-stability-table", class: { "not-user-select": _vm.dragSize.clientX } }, [_c("div", { ref: "tableBox", staticClass: "vue-stability-table-wrapper" }, [_c("vueAgileScrollbar", { ref: "scroll", attrs: { "offsetLeft": _vm.offsetLeft, "offsetRight": _vm.offsetRight, "offsetTop": _vm.offsetTop }, on: { "scroll": _vm.scroll, "updated": _vm.scrollUpdated, "scroll-hit": _vm.scrollHit } }, [_c("table", { staticClass: "stability-wrapper-table", class: {
    "not-sticky": !_vm.stickyType,
    "not-sticky-left": _vm.stickyType === "left",
    "not-sticky-right": _vm.stickyType === "right"
  }, attrs: { "cellpadding": "0", "cellspacing": "0" } }, [_c("thead", { ref: "tabelHead", staticClass: "stability-wrapper-table-head" }, [_c("tr", [_vm._l(_vm.head.left, function(item, i) {
    return _c("th", { key: item.prop, class: { "sticky-left": i === _vm.head.left.length - 1 }, style: _vm.getSticky(item, i), attrs: { "sticky": "left", "title": item.label } }, [_c("div", { staticClass: "stability-table-cell cell-th", class: _vm.getCellClass(item) }, [_vm._v(" " + _vm._s(item.label) + " ")]), item.resizable && item.width > 0 ? _c("span", { staticClass: "resize-handle", on: { "mousedown": function($event) {
      return _vm.dragSizeDown($event, item);
    } } }) : _vm._e()]);
  }), _vm.virtualScrollX ? _c("td", { style: { "min-width": _vm.virtualScrollX.left + "px" } }) : _vm._e(), _vm._l(_vm.cols, function(item) {
    return _c("th", { key: item.prop, style: _vm.getThStyle(item) }, [_c("div", { staticClass: "stability-table-cell", class: _vm.getCellClass(item) }, [_vm._v(" " + _vm._s(item.label) + " ")]), item.resizable && item.width > 0 ? _c("span", { staticClass: "resize-handle", on: { "mousedown": function($event) {
      return _vm.dragSizeDown($event, item);
    } } }) : _vm._e()]);
  }), _vm.virtualScrollX ? _c("td", { style: { "min-width": _vm.virtualScrollX.right + "px" } }) : _vm._e(), _vm._l(_vm.head.right, function(item, i) {
    return _c("th", { key: item.prop, class: { "sticky-right": i === 0 }, style: _vm.getSticky(item, _vm.head.right.length - 1 - i), attrs: { "sticky": "right", "title": item.label } }, [_c("div", { staticClass: "stability-table-cell", class: _vm.getCellClass(item) }, [_vm._v(" " + _vm._s(item.label) + " ")]), item.resizable && item.width > 0 ? _c("span", { staticClass: "resize-handle", on: { "mousedown": function($event) {
      return _vm.dragSizeDown($event, item);
    } } }) : _vm._e()]);
  })], 2)]), _c("tbody", [_vm.virtualScrollY ? _c("tr", { ref: "virtualTop", style: { height: _vm.virtualScrollY.top + "px" } }) : _vm._e(), _vm._l(_vm.rows, function(row, i) {
    return [_c("tr", { key: row.id, staticClass: "stability-wrapper-table-tbody-tr", on: { "click": function($event) {
      _vm.trClick(row, _vm.expandKey(i));
    } } }, [_vm._l(_vm.head.left, function(item, i2) {
      return _c("td", { key: item.prop, class: { "sticky-left": i2 === _vm.head.left.length - 1 }, style: _vm.getSticky(item, i2), attrs: { "sticky": "left" } }, [_c("div", { staticClass: "stability-table-cell", class: _vm.getCellClass(item) }, [_vm._t("content", function() {
        return [_vm._v(_vm._s(row.id))];
      }, { "row": row, "column": item, "content": row.id, "rowIndex": _vm.expandKey(i2) })], 2)]);
    }), _vm.virtualScrollX ? _c("td") : _vm._e(), _vm._l(_vm.cols, function(item) {
      return _c("td", { key: item.prop }, [_c("div", { staticClass: "stability-table-cell", class: _vm.getCellClass(item) }, [_vm._t("content", function() {
        return [_vm._v(_vm._s(row.id))];
      }, { "row": row, "column": item, "content": row.id, "rowIndex": _vm.expandKey(i) })], 2)]);
    }), _vm.virtualScrollX ? _c("td") : _vm._e(), _vm._l(_vm.head.right, function(item, j) {
      return _c("td", { key: item.prop, class: { "sticky-right": j === 0 }, style: _vm.getSticky(item, _vm.head.right.length - 1 - j), attrs: { "sticky": "right" } }, [_c("div", { staticClass: "stability-table-cell", class: _vm.getCellClass(item) }, [_vm._t("content", function() {
        return [_vm._v(_vm._s(row.id))];
      }, { "row": row, "column": item, "content": row.id, "rowIndex": _vm.expandKey(i) })], 2)]);
    })], 2), _vm.expand && _vm.expand[_vm.expandKey(i)] ? _c("tr", { key: row.id + "expand" }, [_c("td", { attrs: { "colspan": _vm.columns.length } }, [_c("div", { staticStyle: { "height": "100px" } }, [_vm._t("expand", null, { "row": row, "rowIndex": _vm.expandKey(i) })], 2)])]) : _vm._e()];
  }), _vm.virtualScrollY ? _c("tr", { ref: "virtualBottom", style: { height: _vm.virtualScrollY.bottom + "px" } }) : _vm._e()], 2)])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.dragSize.clientX, expression: "dragSize.clientX" }], ref: "dargSizeRuler", staticClass: "darg-size-ruler", style: { left: _vm.dragSize.rulerLeft + "px", height: _vm.dragSize.height + "px" } })], 1)]);
};
var staticRenderFns = [];
var stabilityTable_vue_vue_type_style_index_0_lang = "";
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
const __vue2_script = {
  components: { vueAgileScrollbar },
  props: props$1,
  mixins: [dragMixin],
  data() {
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
      virtualScrollX: null,
      virtualScrollY: null,
      offsetTop: 0,
      stickyType: ""
    };
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
  watch: {
    columns() {
      this.init();
    },
    dataSource() {
      this.init();
    }
  },
  created() {
  },
  mounted() {
    this.init();
    this.expand = this.$scopedSlots.expand ? {} : null;
  },
  methods: {
    init() {
      this.setHead();
      this.virtual = new Virtual({
        rowsNum: this.dataSource.length,
        colsNum: this.columns.length,
        rowSize: this.rowSize,
        expandSize: this.expandSize,
        colSize: this.colSize
      });
      this.setCols(0);
      this.setRows(0);
    },
    setHead() {
      let left = [], middle = [], right = [], columnsLen = this.columns.length, start = null, end = null;
      for (let i = 0, j = columnsLen - 1; j >= 0; i++, j--) {
        const startItem = this.columns[i];
        const endItem = this.columns[j];
        if (startItem.fixed) {
          startItem.fixed = "left";
          left.push(startItem);
        } else {
          start = i;
        }
        if (endItem.fixed) {
          endItem.fixed = "right";
          right.unshift(endItem);
        } else {
          end = j;
        }
        if (start !== null && end !== null)
          break;
      }
      middle = start !== 0 && end !== columnsLen ? this.columns.slice(start, end) : this.columns;
      this.head = {
        left,
        middle,
        right
      };
      if (this.$refs.tabelHead) {
        this.offsetTop = this.$refs.tabelHead.offsetHeight + 5;
      }
    },
    setRows(scrollTop) {
      let rowsRegion = this.virtual.getRowsRegion(scrollTop, this.expand, this.$refs.virtualBottom, this.$refs.virtualTop);
      if (rowsRegion) {
        this.virtualScrollY = rowsRegion;
        this.rows = this.dataSource.slice(this.virtualScrollY.start, this.virtualScrollY.end);
      } else if (rowsRegion === null) {
        this.rows = this.dataSource;
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
    getThStyle(item) {
      let obj = {};
      const minWidth = item.minWidth || columns.minWidth;
      let defaultWidth = item.width || minWidth;
      obj["min-width"] = defaultWidth > 0 ? defaultWidth + "px" : defaultWidth;
      if (item.width) {
        obj["width"] = item.width > 0 ? item.width + "px" : item.width;
        obj["max-width"] = obj.width;
      }
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
      const minWidth = item.minWidth || columns.minWidth;
      if (item.fixed === "left") {
        colItem = colIndex ? this.head.left[colIndex - 1] : item;
      }
      if (item.fixed === "right") {
        colItem = colIndex ? this.head.right[colIndex] : item;
      }
      let stylesObj = {
        "min-width": (item.width > 0 ? item.width : minWidth) + "px",
        [item.fixed]: colIndex * (colItem.width || minWidth) + "px"
      };
      if (item.width) {
        stylesObj["width"] = item.width > 0 ? item.width + "px" : item.width;
      }
      return stylesObj;
    },
    scroll(v) {
      if (this.virtualScrollX) {
        this.setCols(v.left);
      }
      if (this.virtualScrollY) {
        this.setRows(v.top);
      }
    },
    trClick(row, rowIndex) {
      if (this.expand) {
        if (!this.expand[rowIndex]) {
          this.$set(this.expand, rowIndex, true);
        } else {
          this.expand[rowIndex] = false;
        }
      }
    },
    expandKey(i) {
      if (this.virtualScrollY) {
        return i + this.virtualScrollY.start;
      }
      return i;
    },
    scrollUpdated(v) {
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
