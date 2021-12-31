<template>
  <span class="stability-table-column-sorter">
    <span class="stability-table-column-sorter-inner">
      <span role="img" class="stability-table-column-sorter-up">
        <svg focusable="false" width="11" height="11" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024">
          <path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"></path>
        </svg>
      </span>
      <span role="img" class="stability-table-column-sorter-down">
        <svg focusable="false" width="11" height="11" fill="currentColor" aria-hidden="true" viewBox="0 0 1024 1024">
          <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
        </svg>
      </span>
    </span>
  </span>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.stability-table-column-sorter {
  transition: color .3s;
  margin-left: 5px;
  color: #c3c6cc;
  font-size: 0;
  .stability-table-column-sorter-inner {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    .stability-table-column-sorter-up, .stability-table-column-sorter-down {
      font-size: 11px;
      line-height: 0;
    }
    .stability-table-column-sorter-up {
      margin-top: 2px;
    }
    .stability-table-column-sorter-down {
      margin-top: -4px;
    }
  }
}
</style>