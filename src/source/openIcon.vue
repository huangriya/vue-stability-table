<template>
  <i class="stability-table-open-icon" :class="{'rotate-down': active}">
    <svg viewBox="64 64 896 896" data-icon="right" width="10" height="10" fill="currentColor" aria-hidden="true" focusable="false" class="">
      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
    </svg>
  </i>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.stability-table-open-icon {
  cursor: pointer;
  color: #6d859e;
  font-size: 12px;
  padding-right: 6px;
  svg {
    transition: transform .2s;
  }
  &.rotate-down {
    svg {
      transform: rotate(90deg);
    }
  }
}
</style>