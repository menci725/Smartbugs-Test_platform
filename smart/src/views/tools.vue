<template>
<div class="htmlbackground">
  <el-container style="height:98.5%;width:99%;direction: vertical;position: absolute;">  
    <el-aside style="width: 30vh;height: 100%">
      <el-menu :default-active="this.$route.path" router style="color: blue;height: 100%;" class="htmlbackground">
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
        <div id="app">
            <input v-model="search">
            <el-menu class="htmlbackground">
              <li v-for="item in items">
                <el-menu-item @click="change(item.name)">
                  <span v-html="item.name"  />
                </el-menu-item>
              </li>
            </el-menu>
          </div>
      </el-col>
 
      <el-col :span="15" style="margin-left: 20vh">
        <el-card>

<div>
  <h1> {{this.title}} </h1>
</div>
<p>
  <!--                {{this.Contractcontext}}-->
</p>

<el-tabs @tab-click="handleClick" v-model="activeId">
  <el-tab-pane label="工具简介" name="first">{{this.description}}</el-tab-pane>

  <el-tab-pane label="工具链接" name="third">
    <el-link :href="''+this.paperlink">{{this.paperlink}}</el-link>
    </el-tab-pane>
</el-tabs>

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
import analyse from "@/views/analyse.vue";

export default {
  name: "tools",
  data() {
    return {
      tableData: [
        {date: 1, name: 'zs1'},
        {date: 2, name: 'zs2'}
      ],
      cmoption: {
        autoRefresh: true,
        scrollbarStyle: null,
        activeName: 'second',
        mode: 'text/x-java',
        theme: 'eclipse',
        autofocus: false,
        readOnly: false,
        lineNumbers: true,
        smartIndent: true,
        autoCloseBrackets: true

      },
      activeId: 'first',
      property: 'Slither',
      title: 'Slither',
      // Contractcontext: '',
      pos: 'first',
      description: '',
      sample: '',
      paperlink: '',
      // paper: [{paperLink: ''}],
      // activeName: 'first',
      inputValue: '',
      SearchInput: '',
      SearchInputCopy: '',
      listObj: [
        {id: 1, name: 'zs1'},
        {id: 2, name: 'zs2'},
        {id: 3, name: 'zs3'},
        {id: 4, name: 'zs4'},
        {id: 5, name: 'zs5'},
        {id: 6, name: 'zs6'},
        {id: 7, name: 'zs7'},
        {id: 8, name: 'zs8'},
        {id: 9, name: 'zs9'},
        {id: 10, name: 'zs10'},
        {id: 11, name: 'zs11'},
        {id: 12, name: 'zs12'},
      ],
      search: '',
      contract: [{
        name: 'Slither'
      }, {
        name: 'Vandal'
      }, {
        name: 'Smartcheck'
      }, {
        name: 'SaferSC'
      }, {
        name: 'DR-GCN'
      }, {
        name: 'ContractFuzzer'
      },{
        name: 'Securify'
      },{
        name: 'KEVM framework'
      },{
        name: 'Isabelle/HOL'
      },{
        name: 'Oyente'
      },{
        name: 'ReChecker'
      },{
        name: 'TeEther'
      }]
    }
  },
  created(){
    this.load()
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
    },
  },
  methods:{
    change(name){
      // this.pos = 'first'
      this.property = name
      this.activeId = 'first'
      this.load()
    },
    load(){
      if(this.property == 'KEVM framework'){
        this.title = 'KEVM framework'
        this.description = 'KEVM 是一种形式化分析的框架，它利用 *K* 框架构建了基于 EVM 字节码栈的可执行形式化规范，提供了 EVM 的规范、参考解释器以及用于程序分析和验证的工具。'
        this.paperlink = 'https://github.com/kframework/evm-semantics\n'
      }
      if(this.property == 'Securify'){
        this.title = 'Securify'
        this.description = 'Securify 是一种用于以太坊智能合约的静态安全分析器，具有可伸缩、完全自动化、准确率高等特性，其通过分析合约的依赖图以及从代码中提取精确的语义信息来检查合约的合规性与安全漏洞。'
        this.paperlink = 'https://github.com/eth-sri/securify2'
      }
      if(this.property == 'ContractFuzzer'){
        this.title = 'ContractFuzzer'
        this.description = 'ContractFuzzer 是第一个基于模糊测试的以太坊智能合约安全漏洞的动态分析方法，其基于智能合约 ABI 规范生成模糊测试用例并定义测试方案来检测安全漏洞。首先，ContractFuzzer 对EVM 进行配置并记录智能合约运行时的行为，然后通过分析这些日志并检测漏洞。'
        this.paperlink = 'https://github.com/gongbell/ContractFuzzer'
      }
      if(this.property == 'Slither'){
        this.title = 'Slither'
        this.description = 'Slither 是一种以太坊智能合约的静态分析框架，它将智能合约 Solidity 源代码转换为SlithIR 的中间表示，SlithIR 使用静态单一分配(SSA)形式和精简指令集来简化合约分析过程，同时保留了Solidity 源代码转换为 EVM 字节码时丢失的语义信息。'
        this.paperlink = 'https://github.com/crytic/slither'
      }
      if(this.property == 'Vandal'){
        this.title = 'Vandal'
        this.description = 'Vandal 是一种 EVM 字节码层面的智能合约静态分析工具，它由一个分析管道和一个反编译器组成。该反编译器执行抽象解释，以逻辑关系的形式将字节码转换为更高级别的中间表示(IR)，然后使用新颖的逻辑驱动方法检测合约漏洞。'
        this.paperlink = 'https://github.com/usyd-blockchain/vandal'
      }
      if(this.property == 'Smartcheck'){
        this.title = 'Smartcheck'
        this.description = 'SmartCheck 是一种可扩展的智能合约静态分析工具，它将智能合约 Solidity 源代码转换为基于 XML 的中间表示，然后利用 XPath 的模式来检测智能合约漏洞。'
        this.paperlink = 'https://github.com/smartdec/smartcheck'
      }
      if(this.property == 'SaferSC'){
        this.title = 'SaferSC'
        this.description = 'SaferSC 是第一个基于深度学习的智能合约漏洞检测模型，其基于 Maian 划分的 3 类合约漏洞，实现了比 Maian 更高的检测准确率。此外，SaferSC 在智能合约操作码(operation code,简称 opcode)层面进行分析，利用 LSTM 网络构建了以太坊操作码序列模型，实现了精准地智能合约漏洞检测。'
        this.paperlink = 'https://github.com/wesleyjtann/Safe-SmartContracts'
      }
      if(this.property == 'DR-GCN'){
        this.title = 'DR-GCN'
        this.description = 'DR-GCN 是第一个利用合约图(contract graph)的方式来检测智能合约漏洞方法，其将智能合约源代码转换为具有高语义表示的合约图结构，并利用图卷积神经网络构建了安全漏洞检测模型。DR-GCN 支持 2 个平台（即以太坊和维特链）的智能合约漏洞分析。'
        this.paperlink = 'https://github.com/Messi-Q/GraphDeeSmartContract'
      }
      if(this.property == 'Isabelle/HOL'){
        this.title = 'Isabelle/HOL'
        this.description = 'Isabelle/HOL 是一种 EVM 字节码级别的形式化验证方法，其通过将字节码序列构造成直线代码块或将合约拆分成基本块，并在此基础上创建逻辑程序进行推理验证。'
        this.paperlink = 'https://doi.org/10.1145/3167084'
      }
      if(this.property == 'Oyente'){
        this.title = 'Oyente'
        this.description = 'Oyente 是最早的智能合约漏洞静态检测工具之一，其在合约控制流图的基础上利用符号执行的方法检测智能合约漏洞。Oyente 以智能合约字节码和以太坊状态作为输入，模拟 EVM 并且遍历合约的不同执行路径。'
        this.paperlink = 'https://doi.org/10.1145/2976749.2978309'
      }
      if(this.property == 'TeEther'){
        this.title = 'TeEther'
        this.description = 'TeEther 是一种智能合约静态分析工具，区别于一般的漏洞检测工具，它考虑了智能合约漏洞自动识别以及合约生成方法，并通过分析合约字节码查找关键的执行路径以检测合约的安全问题。'
        this.paperlink = 'https://github.com/nescio007/teether'
      }
      if(this.property == 'ReChecker'){
        this.title = 'ReChecker'
        this.description = 'ReChecker 是第一个基于深度学习的智能合约可重入漏洞检测方法，其通过将智能合约Solidity 源代码转换为合约块(contract snippet)的形式，捕获了合约中基本的语义信息和控制流依赖信息。ReChecker 利用双向长短期记忆模型(Bidirectional Long Short-Term Memory,简称 BLSTM)和注意力机制(Attention)实现了以太坊智能合约可重入漏洞的自动化检测。'
        this.paperlink = 'https://github.com/Messi-Q/ReChecker'
      }
    },
    Contains(user) {
      if (this.SearchInputCopy === '') {
        return false
      } else {
        return user.id.includes(this.SearchInputCopy)
      }
    }
  }
}
</script>

<style scoped>
html,body {
  margin: 0;
  height: 100%;
}
.htmlbackground{
background: linear-gradient(white,#cedee1);
}
.el-container{
height: 100%;
background: linear-gradient(white,#cedee1);
}
.CodeMirror {
border: 1px solid #eee;
height: auto;
}
.el-aside{
height: 100%;
}
.el-menu{
height: 100%;
}
.CodeMirror-scroll {
height: auto;
overflow-y: hidden;
overflow-x: auto;
}
.el-header{
height: 10vh;
}
.el-footer{
background-color: white;
height: 100%;
}
.rowstyle {
background-color: #a3cad6;
}
</style>