<template>
  <div>
    <div class="codemirror">
      <codemirror ref="myCm"
                  v-model="formData.queryText"
                  :options="cmOptions"
                  @ready="onCmReady"
                  @focus="onCmFocus"
                  @input="onCmCodeChange">
      </codemirror>
    </div>
  </div>
</template>
<script>
import 'codemirror/mode/sql/sql.js'
// theme css
import 'codemirror/theme/solarized.css'
// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// closebrackets
import 'codemirror/addon/edit/closebrackets.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/emacs.js'

//自动提示

import 'codemirror/addon/hint/show-hint.css';

import 'codemirror/addon/hint/show-hint.js';

import 'codemirror/addon/hint/sql-hint.js';

export default {
  data() {
    return {
      formData:{
        queryText:''
      },
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/x-mysql',

        extraKeys: {"Ctrl": "autocomplete"},   //自动提示配置

        lineWrapping: true,    // 自动换行
        theme: 'solarized light'
      }
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  methods:{
    showSQL(val){
      this.formData.queryText = val?val:''
    },
    onCmReady(cm) {
      this.codemirror.setSize("-webkit-fill-available", "auto")
    },
    onCmFocus(cm) {
      // console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.formData.queryText = newCode
      this.$emit('codeChange',this.formData.queryText)
    }
  }
}
</script>
<style scoped>
.codemirror {
  height: 200px;
  min-height: 300px;
}
.codemirror >>> .CodeMirror-scroll {
  min-height: 180px;
}
</style>