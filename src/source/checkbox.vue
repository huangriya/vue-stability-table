<template>
  <span class="stability-table-checkbox" 
        :class="{'stability-table-checkbox-checked': value, 
        'surely-table-checkbox-disabled': disabled, 
        'surely-table-checkbox-indeterminate': !value && indeterminate}" 
        @click="change()">
    <input class="stability-table-checkbox-input" type="checkbox" :checked="value" :disabled="disabled">
    <span class="stability-table-checkbox-inner"></span>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, Number],
      default: false
    },

    disabled: {
      type: [Boolean, Number],
    },

    indeterminate: {
      type: Boolean
    }
  },
  created () {
  
  },
  methods: {
    change () {
      if (!this.disabled) {
        this.$emit('change', !this.value)
      }
    }
  }
}
</script>

<style lang="less">
.stability-table-checkbox {
  display: inline-block;
  position: relative;
  cursor: pointer;
  width: 16px;
  height: 16px;
  vertical-align: sub;
  &.stability-table-checkbox-checked {
    .stability-table-checkbox-inner {
      border-color: #1890ff;
      background-color: #1890ff;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")
    }
  }
  &.surely-table-checkbox-disabled {
    .stability-table-checkbox-inner {
      background-color: #eee;
      border-color: #ddd;
    }
  }
  &.surely-table-checkbox-indeterminate {
    .stability-table-checkbox-inner {
      &::after {
        content: '';
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #1890ff;
        margin-left: -4px;
        left: 50%;
        top: 50%;
        margin-top: -4px;
      }
    }
  }
  .stability-table-checkbox-input, .stability-table-checkbox-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .stability-table-checkbox-input {
    opacity: 0;
  }
  .stability-table-checkbox-inner {
    display: block;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    transition: all .3s;
    background-color: #fff;
   }
}
</style>