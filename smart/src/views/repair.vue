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
              

               <el-button type="primary" plain size="small" @click="handletest">
                  修复
               </el-button>
             </div>
     </el-col>

     <el-col :span="9" style="margin-left: 10px">
             <el-card>
               <el-col>
                 <span>修复结果</span>
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


