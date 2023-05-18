<template>
  <div>

    <el-card>

      <div>
        <h1> Title </h1>
      </div>
      <p>
        Lorem ipsum represents a long-held tradition for designers,
        typographers and the like. Some people hate it and argue for
        its demise, but others ignore the hate as they create awesome
        tools to help create filler text for everyone from bacon lovers
        to Charlie Sheen fans.
      </p>

      <el-card>
        <el-tabs>
          <el-tab-pane label="description" name="activity">
            <el-input />
          </el-tab-pane>

          <el-tab-pane label="sample" name="timeline" />
          <el-tab-pane label="paper" name="account" >
            <el-link></el-link>
          </el-tab-pane>
        </el-tabs>
      </el-card>

    </el-card>

    <el-card>
      <div id="app">
        <input v-model="search">
        <el-menu>
          <li v-for="item in items">
            <el-menu-item>
              <span v-html="item.name"  />
            </el-menu-item>
          </li>
        </el-menu>
      </div>
    </el-card>

  </div>

</template>

<script>
export default {
  name: 'Demo',

  data() {
    return {
      tableData: [
        { date: 1, name: 'zs1' },
        { date: 2, name: 'zs2' }
      ],
      inputValue: '',
      SearchInput: '',
      SearchInputCopy: '',
      listObj: [
        { id: 1, name: 'zs1' },
        { id: 2, name: 'zs2' },
        { id: 3, name: 'zs3' },
        { id: 4, name: 'zs4' },
        { id: 5, name: 'zs5' },
        { id: 6, name: 'zs6' }
      ],
      search: '',
      contract: [{
        name: '苹果'
      }, {
        name: '香蕉'
      }, {
        name: '雪梨'
      }, {
        name: '宝马'
      }, {
        name: '奔驰'
      }, {
        name: '柑橘'
      }, {
        name: '奥迪'
      }]
    }
  },
  computed: {
    items: function() {
      var _search = this.search
      if (_search) {
        return this.contract.filter(function(contract) {
          return Object.keys(contract).some(function(key) {
            return String(contract[key]).toLowerCase().indexOf(_search) > -1
          })
        })
      }
      return this.contract
    }
  },
  methods: {
    Contains(user) {
      if (this.SearchInputCopy === '') {
        return true
      } else {
        return user.id.includes(this.SearchInputCopy)
      }
    }

  }
}
</script>

<style scoped>

</style>
