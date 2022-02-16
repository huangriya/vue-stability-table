

<template>
  <div>
    <section>
      <h3>基本用法 <button @click="setData">重新载入数据</button> <button @click="setColumn">改变列数据</button> <button @click="$refs.stabiltyTable.empty()">清空数据</button></h3>
      <div style="height:432px;width:800px;">
        <stabilityTable ref="stabiltyTable" :columns="columns" :dataSource="rows" :expandSize="100" :openIconColumn="1">
          <template slot="content" slot-scope="{row, rowIndex}">
            {{row.id}}
          </template>
          <!-- <div slot="expand" slot-scope="{rowIndex, row}" :style="{height: rowIndex % 2 === 0 ? '400px' : '20px', background: '#f1f1f1'}">
            afdasfasf{{row}}{{rowIndex}}
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
      label: '固定列asadfasdfas',
      prop: 'table',
      fixed: true,
      width: 120,
      className: 'addd',
      sortable: true,
      resizable: true
    }, {
      label: '固定列2',
      prop: 'fixedTable2',
      fixed: true,
      width: 120,
      resizable: true
    }]
    
    for (let i = 0; i <= 300; i++) {
      columns.push({
        label: '表头' + i,
        prop: 'table' + i,
        subProp: 'subTable' + i,
        resizable: true,
        sortable: true,
        formatter: function(str) {
          return str + 'bba'
        },
      })
    }

    columns.push({
      label: '固定尾1',
      prop: 'tableLast',
      fixed: true,
      width: 120,
      resizable: true,
      sortable: true,
      align: 'center'
    },{
      label: '固定尾2',
      prop: 'tableLast2',
      fixed: true,
      width: 120,
      resizable: true,
      sortable: true,
      align: 'right'
    })

    let rows = []
    for (let i = 0; i < 1000; i++) {
      let obj = {
        id: i,
        table: '是否' + i,
        fixedTable2: '收到',
        table1: i,
        table2: i,
        subTable1: '20%',
        children: []
      }

   
      for(let j = 0; j < 7; j++) {
        obj.children.push({
          id: i + 'ch' + j,
          fixedTable2: '2021111' + j,
          table1: '爱爱上爱上爱上爱上上',
          table2: 'asfasdasfasdfsffsfasfasdasfasdfsffsf'
        })
      }
      
      rows.push(obj)
    }
    console.time('渲染用时')
    this.columns = columns
    this.rows = rows
    this.$nextTick(() => {
      console.timeEnd('渲染用时')
    })
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
      
      for (let i = 0; i < 70; i++) {
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
      this.$refs.stabiltyTable.updateColumns(columns)
    },

    setData () {
      let columns = [{
        label: '固定列',
        prop: 'table',
        fixed: true,
        width: 80,
        resizable: true
      }]
      
      for (let i = 0; i < 10; i++) {
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

      let rows = []
      for (let i = 0; i < 5000; i++) {
        rows.push({
          id: i,
          table: 'asfasdasfasdfsffsf',
          table1: '爱爱上爱上爱上爱上上',
          table2: 'asfasdasfasdfsffsfasfasdasfasdfsffsf'
        })
      }

      
      
      this.columns = columns
      console.time('time')
      this.rows = rows
      // this.$refs.stabiltyTable.updateRows(rows)
      this.$nextTick(()=>{
        console.timeEnd('time')
      })
      
    },

    sortChange () {
      
    },

    cellTextClick (col, row) {
      console.log(col, row)
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
.zwc {
  overflow-x: auto;
  width: 300px;
  border: solid #ddd 1px;
}
.hd, .bd {
  width: 500px;
}
.bd {
  height: 200px;
  overflow-y: auto;
}
</style>
