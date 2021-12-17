

<template>
  <div>
    <section>
      <h3>基本用法 <button @click="setColumn">改变数据</button></h3>
      <div style="height:500px;width:800px;">
        <stabilityTable :columns="columns" :dataSource="rows" :expandSize="100">
          <template slot="content" slot-scope="{row}">
            {{row.id}}
          </template>
          <!-- <div slot="expand" slot-scope="{rowIndex, row}">
            afdasfasf{{row}}
          </div> -->
        </stabilityTable>
      </div>
    </section>
  </div>
</template>

<script>
import stabilityTable from '../src/stabilityTable.vue'

// import vueAgileScrollbar from 'vue-agile-scrollbar'
// import 'vue-agile-scrollbar/dist/style.css'

export default {
  components: { stabilityTable },
  data () {
    return {
      columns: [],
      rows: []
    }
  },
  created () {
    let columns = [{
      label: '固定列',
      prop: 'table',
      fixed: true,
      width: 80,
      resizable: true
    }, {
      label: '固定列2',
      prop: 'fixedTable2',
      fixed: true,
      width: 80,
      resizable: true
    }]
    
    for (let i = 0; i < 15; i++) {
      columns.push({
        label: '表头' + i,
        prop: 'table' + i
      })
    }

    columns.push({
      label: '固定尾1',
      prop: 'tableLast',
      fixed: true,
      width: 80,
      resizable: true,
      align: 'center'
    },{
      label: '固定尾2',
      prop: 'tableLast2',
      fixed: true,
      width: 80,
      resizable: true,
      align: 'right'
    })

    let rows = []
    for (let i = 0; i < 50; i++) {
      rows.push({
        id: i
      })
    }
    
    this.columns = columns
    this.rows = rows
  },

  methods: {
    setColumn () {
      let columns = [{
        label: '固定列',
        prop: 'table',
        fixed: true,
        width: 80,
        resizable: true
      }]
      
      for (let i = 0; i < 5; i++) {
        columns.push({
          label: '表头' + i,
          prop: 'table' + i
        })
      }

      columns.push({
        label: '固定尾1',
        prop: 'tableLast',
        fixed: true,
        width: 80,
        resizable: true,
        align: 'center'
      })

      this.columns = columns
    }
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
