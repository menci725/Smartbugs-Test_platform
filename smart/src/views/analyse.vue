<template>
<div class="htmlbackground">
 <el-container style="height:98.5%;width:99%;direction: vertical;position: absolute;">  
   <el-aside style="width: 30vh;height: 100%">
     <el-menu :default-active="this.$route.path" router style="background-color: linear-gradient(white,#a3cad6);color: blue;" class="htmlbackground">
       <el-menu-item index="/analyse" :route="{path: '/analyse'}">
        <i class="el-icon-edit"></i>
        <span slot="title">智能合约安全漏洞分析</span>
       </el-menu-item>
       <el-menu-item index="/introduce" :route="{path:'/introduce'}">
        <i class="el-icon-warning"></i>
         <span slot="title">安全漏洞</span>
       </el-menu-item>
       <el-menu-item index="/tools" :route="{path:'/tools'}">
        <i class="el-icon-s-opportunity"></i>
         <span slot="title">检测工具</span>
       </el-menu-item>
       <el-menu-item index="/repair" :route="{path:'/repair'}">
        <i class="el-icon-scissors"></i>
        <span slot="title">漏洞修复</span>
       </el-menu-item>
     </el-menu>
   </el-aside>


   <el-main>
    <el-container>
    <el-header>
      <el-image :src="require('@/components/image.jpg')" style="width: 5vh;height: 5vh;margin-top: 5px;"></el-image>
      <span style="font-size: xxx-large;font-family: 华文行楷;z-index: 1;">智能合约安全漏洞分析系统</span>
    </el-header>

    <el-main>
     <el-col :span="5">
      <td>
       <span>
         项目工程管理
       </span>
      </td>
       <td>
       <el-upload
          action="http://10.214.242.226:9098/srtp/filesave"
          :on-success="filesuploadsuccess"
          ref="upload"
          :show-file-list="false">
          <el-button style="margin-left: 2vh" size="small"><i class="el-icon-upload"></i></el-button>
        </el-upload>
      </td>
       <div id='app2'>
          <div v-for="(v,i) in filelist" v-bind:key="i">
              <el-button type="text" v-model="filelist[i]" @click="show(i)">
               <span>{{ filelist[i] }}</span>
              </el-button>
              <button @click="del(i)">-</button>
          </div>
        </div>

     </el-col>

     <el-col :span="9" style="margin-left: 10px">
             <div class="codemirror">
               <codemirror ref="myCm"
                           v-model="this.text"
                           :options="cmOptions"
                           @ready="onCmReady"
                           @focus="onCmFocus"
                           @input="onCmCodeChange">
               </codemirror>
               </div>
               <!-- <div class="container">
                <editor
                  ref="aceEditor"
                  v-model="content"
                  @init="editorInit"
                  width="300"
                  height="400"
                  lang="javascript"
                  :theme="eclipse"
                  :options="{
                    enableBasicAutocompletion: true,
                    enableSnippets: true,
                    enableLiveAutocompletion: true,
                    tabSize:6,
                    fontSize:14,
                    showPrintMargin:true, 
                  }"
                  :rowClassName="setbackground"
                ></editor>
              </div> -->



             <div style="margin-top: 10px">
               <el-dropdown @command = "handlecommand">
                  <span class="el-dropdown-link">
                    {{ this.toolname }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="oyente">oyente</el-dropdown-item>
                    <el-dropdown-item command="osiris">osiris</el-dropdown-item>
                    <el-dropdown-item command="mythril">mythril</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

               <el-button type="primary" plain size="small" @click="handletest">
                  检测
               </el-button>
             </div>
     </el-col>

     <el-col :span="9" style="margin-left: 10px">
             <el-card>
               <el-col>
                 <span>分析结果</span>
               </el-col>
               <el-divider></el-divider>
               <el-col>
                 <span style="white-space: pre-wrap">{{this.res}}</span>
               </el-col>
             </el-card>
     </el-col>
    </el-main>
     <el-footer>
       <el-link :href="''" style="margin-top: 2vh">联系我们</el-link>
       <el-link :href="''" style="margin-top: 2vh;margin-left: 10vh;">网站授权</el-link>
       <el-link :href="''" style="margin-top: 2vh;margin-left: 10vh">反馈建议</el-link>
     </el-footer>
    </el-container>
   </el-main>



 </el-container>
</div>
</template>

<script>
import 'codemirror/mode/sql/sql.js'
import 'codemirror/theme/solarized.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/emacs.js'
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import axios from 'axios';
import CodeMirror from 'codemirror';
CodeMirror.defineMode('cert', () => ({
  token: (stream, state) => {
    const cmCustomCheckStreamFn = streamWrapper => {
      // 自定义关键字和样式
      const customKeyWords = [['BEGIN', 'begin-style'], ['END', 'end-style']];
      for (let i = 0; i < customKeyWords.length; i++) {
        if (streamWrapper.match(customKeyWords[i][0])) { return customKeyWords[i][1]; }
      }
      return '';
    };

    const ret = cmCustomCheckStreamFn(stream);
    if (ret.length > 0) return ret;

    stream.next();
    return null;
  }
}));
// var editor = ace.edit("editor");
// editor.setHighlightActiveLine(false);

export default {
  name: 'analyse',
  components: {
    editor: require("vue2-ace-editor")
  },
  data() {
    return {
      activeNames: ['1'],
      formData:{
        queryText:''
      },
      activeId: '',
      data:[],
      ints: '',
      index: 0,
      filelist: [],
      res:'',
      filename: '',
      text: '//此处为您上传的合约',
      toolname: 'oyente',
      cmOptions: { // 配置项
			      tabSize: 4, // 制表符的宽度
            mode: 'java', // 使用的模式
            // theme: 'material', // 主题黑色
            theme: 'darcula', // 主题白色
            lineNumbers: true, // 是否显示行号
            lineWrapping: true, // 是否应滚动或换行以显示长行
            extraKeys: { 'Ctrl': 'autocomplete' },
            lineWiseCopyCut: true, // 在没有选择的情况下进行复制或剪切将复制或剪切有光标的整行。
            showCursorWhenSelecting: true, 
            maxHighlightLength: Infinity, 
            matchBrackets: true, // 光标匹配括号
            line: true,
            readOnly: false,
		  },
      content: "",
      theme:'',
      num:0,
      arr:[ //将brace/theme文件夹下的所有主题名字拷贝出来
        'ambiance',
        'chaos',
        'chrome',
        'clouds',
        'clouds_midnight',
        'cobalt',
        'crimson_editor',
        'dawn',
        'dracula',
        'dreamweaver',
        'eclipse',
        'github',
        'gob',
        'gruvbox',
        'idle_fingers',
        'iplastic',
        'katzenmilch',
        'kr_theme',
        'kuroir',
        'merbivore',
        'merbivore_soft',
        'monokai',
        'mono_industrial',
        'pastel_on_dark',
        'solarized_dark',
        'solarized_light',
        'sqlserver',
        'terminal',
        'textmate',
        'tomorrow',
        'tomorrow_night',
        'tomorrow_night_blue',
        'tomorrow_night_bright',
        'tomorrow_night_eighties',
        'twilight',
        'vibrant_ink',
        'xcode',
      ]
    }
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    }
  },
  mounted() {
    this.editorInit();
    this.theme = this.arr[0]
    console.log(this.$refs.aceEditor.editor.setValue('设置的初始值'))
  },
  methods: {
    editorInit() {//初始化
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/javascript"); //language
      // require("brace/theme/tomorrow_night");
      for (let i = 0; i < this.arr.length; i++) {//方便看哪个主题好看，循坏加载了所有主题，通过点击按钮切换
        require("brace/theme/"+this.arr[i])
      }
      require("brace/snippets/javascript"); //snippet
    },
    getValue(){//获取编辑器中的值
      console.log('编辑器中的值：'+this.$refs.aceEditor.editor.getValue())
      console.log('编辑器中第一个换行符的位置：'+this.$refs.aceEditor.editor.getValue().indexOf('\n'))
    },
    del(i){
         event.currentTarget.parentNode.style.display='none';
         console.log("ac:"+this.activeId+"  id:"+i)
         if(activeId == i)
         this.text = ""
         this.onCmCodeChange(this.text)
    },
    createNode(ele){
          this.index++;
          this.filelist.push(ele);
    },
    show(i){
      console.log("i:"+this.filelist[i])
      axios.post('http://10.214.242.226:9098/srtp/contentsavefile?filename='+this.filelist[i]+'.sol').then(res => {
        console.log("flag")
        this.text = res.data.data
        this.filename = this.filelist[i]
        console.log("upload:"+this.text);
      })
      this.onCmCodeChange(this.text)
      this.activeId = i
    },
    handleChange(val) {
      console.log(val);
    },
    handlecommand(command){
      if(command == "oyente"){
        this.toolname = "oyente"
      }
      if(command == "osiris"){
        this.toolname = "osiris"
      }
      if(command == "mythril"){
        this.toolname = "mythril"
      }
      // this.filelist.push(this.filename)
    },
    showSQL(val){
      this.text = val?val:''
    },
    onCmReady(cm) {
      this.codemirror.setSize("-webkit-fill-available", "auto")
    },
    onCmFocus(cm) {
    },
    onCmCodeChange(newCode) {
      // console.log("text:"+this.text)
      // console.log('this is new code', newCode)
      this.text = newCode
      this.$emit('codeChange',this.text)
    },
    filesuploadsuccess(res,file){
      this.filename = res.result.replace(".sol","")
      this.createNode(this.filename)
      console.log("file:"+this.filename)
      axios.post('http://10.214.242.226:9098/srtp/contentsavefile/?filename='+this.filename+'.sol').then(res => {
        console.log("flag")
        this.text = res.data.data
        console.log("upload:"+this.text);
      })
      // this.text = reader.onload.text;
      this.onCmCodeChange(this.text)
    },
    handletest(){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        console.log(this.filename+this.toolname);
      axios.post('http://10.214.242.226:9098/srtp/smartbugfilecheck/'+this.filename+'.sol/'+this.toolname).then(result=>
      {
        if(this.toolname == "oyente" || this.toolname == "osiris"){
        this.res = result.data.data
 //       this.res = this.res.replace("{\n","")
 //       this.res = this.res.replace("}","")
        }
        if(this.toolname == "mythril"){
          var temp = JSON.parse(JSON.stringify(result.data.data.issues))
          this.res.clear()
          for(var i = 0;i < temp.length;i++){
            this.res.add(check(temp.swc-id),"True")
          }
        }

        loading.close();
      })
    },
    check(swcid){
      if(swcid == 112){
        return "Delegatecall"
      }
      if(swcid == 111){
        return "use aborted function"
      }
      if(swcid == 110){
        return "wrong declaration"
      }
      if(swcid == 109){
        return "uninitialized pointer"
      }
      if(swcid == 108){
        return "state variable visibility"
      }
      if(swcid == 107){
        return "reentrancy"
      }
      if(swcid == 106){
        return "unprotected SELFDESTRUCT"
      }
      if(swcid == 105){
        return "unprotected wallet" 
      }
      if(swcid == 104){
        return "unchecked return value"
      }
      if(swcid == 103){
        return "floating progma"
      }
      if(swcid == 102){
        return "old version"
      }
      if(swcid == 101){
        return "integer overflow or underflow"
      }
      if(swcid == 100){
        return "function visibility"
      }
    },
    backfn(index,type){
    let colorList =  [
        ['#f37575', '#f54d4d'],
        ['#6382fe', '#5173ff'],
        ['#1fc1d4', '#03b1c1'],
        ['#6670fa', '#a46df1'],
        ['#f88a5d', '#f65a49'],
        ['#52e6be', '#26cd9c'],
    ];
    let flag = index;
    let color = "";
    if (index >= colorList.length) {
        flag = index - colorList.length;
    }
    if(type == 'r'){
        color = colorList[flag][0]
    }else {
        color = colorList[flag][1]
    }
    return color}
  }
}
</script>

<style scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.htmlbackground{
  background: linear-gradient(white,#cedee1);
}
.el-container{
  height: 100%;
  margin: 0px;
  background: linear-gradient(white,#cedee1);
}
.el-menu{
  height: 100%;
  background-color: #cedee1;
}

.codemirror {
   height: auto;
   min-height: 300px;
   /* theme: 'solarized light'; */
 }
.codemirror >>> .CodeMirror-scroll {
  min-height: 450px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
.el-header{
  height: 10vh;
}
.el-footer{
  background-color: white;
  height: 10vh;
}
.rowstyle {
  background-color: #a3cad6;
}
</style>
