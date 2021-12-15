<template>
  <thead class="stability-wrapper-table-head">
    <tr>
      <th class="sticky-left" v-for="item in fixedHead.left" :key="item.prop"
          :style="getThStyle(item)">{{item.label}}</th>
      <td v-if="virtualScrollX" :style="{'min-width': virtualScrollX.left + 'px'}"></td>
      <th v-for="item in cols" :key="item.prop"
          :style="getThStyle(item)">{{item.label}}</th>
      <td v-if="virtualScrollX" :style="{'min-width': virtualScrollX.right + 'px'}"></td>
      <th class="sticky-right" v-for="item in fixedHead.right" :key="item.prop"
      :style="getThStyle(item)">{{item.label}}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array
    }
  }
}
</script>