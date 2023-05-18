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
              </p>
              <el-tabs @tab-click="handleClick" v-model="activeId">
                <el-tab-pane label="漏洞简介" name="first" style="white-space: pre-wrap">{{this.description}}</el-tab-pane>
                <el-tab-pane label="示例代码" name="second">
                  <codemirror ref="myCm"
                              v-model="this.sample"
                              :options='cmoption'
                               style="height: auto">
                  </codemirror>
                </el-tab-pane>
                <el-tab-pane label="相关论文" name="third">
                  <el-link :href="''+this.paperlink">{{this.paper}}</el-link>
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
import 'codemirror/addon/display/autorefresh'

export default {
  name: 'Demo',

  data() {
    return {
      tableData: [
        { date: 1, name: 'zs1' },
        { date: 2, name: 'zs2' }
      ],
      // tabPosition: 'left',
      activeId: 'first', // 默认显示第一页
      subjectList: [
        {title: '漏洞简介'},
        {title: '示例代码'},
        {title: '相关论文'}
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
      property: '可重入漏洞',
      title: '可重入漏洞',
      // Contractcontext: '',
      pos: 'first',
      description: '',
      sample: '',
      paperlink: '',
      paper: '',
      // paper: [{paperLink: ''}],
      // activeName: 'first',
      inputValue: '',
      SearchInput: '',
      SearchInputCopy: '',
      listObj: [
        { id: 1, name: 'zs1' },
        { id: 2, name: 'zs2' },
        { id: 3, name: 'zs3' },
        { id: 4, name: 'zs4' },
        { id: 5, name: 'zs5' },
        { id: 6, name: 'zs6' },
        { id: 7, name: 'zs7' },
        { id: 8, name: 'zs8' },
      ],
      search: '',
      contract: [{
        name: '可重入漏洞'
      }, {
        name: '整数溢出漏洞'
      }, {
        name: '异常处理漏洞'
      }, {
        name: '权限控制漏洞'
      }, {
        name: '拒绝服务漏洞'
      }, {
        name: '类型混乱漏洞'
      }, {
        name: '未知函数调用漏洞'
      }, {
        name: '以太冻结漏洞'
      },{
        name: '短地址漏洞'
      },{
        name: '以太丢失漏洞'
      }]
    }
  },
  created(){
    this.load()
  },
  computed: {
    analyse() {
      return analyse
    },
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
    change(name){
      // this.handleClick('漏洞检测',event)
      // this.$router.go(0)
      this.property = name
      // console.log(this.property)
      this.load()
      // console.log(this.pos)
      this.activeId = 'first'
      // console.log(this.pos)
    },
    // handleLeave(){
    //
    // },
    load(){
      // console.log('0')
      // this.handleClick(first,event)
      if(this.property == '可重入漏洞'){
        this.title = '可重入漏洞'
        this.description = '智能合约的执行方式不同于传统的程序语言。通常情况下，当调用非递归函数时，一次程序命令执行结束前，不会有新的执行命令进入。然而，Solidity智能合约具有独特的回调机制，这意味着恶意攻击者有可能在程序命令执行结束前再次进入被调用函数。\n' +
            '\n' +
            '与大多数程序语言类似，以太坊智能合约处理业务逻辑时也会进行跨合约的函数调用。但是，智能合约通常涉及到一些敏感操作，例如转账等。此外，智能合约的固有特性使得转账操作必定会触发接收方合约中的回调函数。如果外部调用被恶意攻击者利用，很可能会导致合约进一步执行危险操作。\n' +
            '\n' +
            '例如，攻击者可能会在其回调函数中设计恶意的攻击代码，递归调用受害者合约的转账函数以盗取以太币。因此，在编写智能合约时，必须格外注意重入攻击漏洞，并确保正确处理任何可能的异常情况，例如限制调用次数或避免调用外部合约中的函数。'
        this.sample = '该合约允许用户存款、提现和查询余额。但是，如果一个恶意用户在调用 withdraw 函数时向合约发送一个包含可执行代码的交易，那么该可执行代码将被插入到合约中，以及由于 msg.sender.call.value(amount)("") 行中的 call 函数的使用，将导致在每次调用 withdraw 函数时自动执行插入的代码。\n' +
            '\n' +
            '  ```solidity\n' +
            '  pragma solidity ^0.8.0;\n' +
            '  \n' +
            '  contract VulnerableContract {\n' +
            '      mapping (address => uint) public balances;\n' +
            '  \n' +
            '      function deposit() public payable {\n' +
            '          balances[msg.sender] += msg.value;\n' +
            '      }\n' +
            '  \n' +
            '      function withdraw(uint amount) public {\n' +
            '          require(balances[msg.sender] >= amount);\n' +
            '          msg.sender.call.value(amount)(""); // 通过调用方的地址，向调用方发送相应金额的以太币\n' +
            '  \n' +
            '          balances[msg.sender] -= amount;\n' +
            '      }\n' +
            '  \n' +
            '      function getBalance() public view returns (uint) {\n' +
            '          return balances[msg.sender];\n' +
            '      }\n' +
            '  \n' +
            '      function() external payable { // fallback函数\n' +
            '          if (msg.sender != address(this)) {\n' +
            '              deposit();\n' +
            '          }\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paperlink = 'https:doi.org/10.1109/IWBOSE50093.2020.9050260.'
        this.paper = 'N. Fatima Samreen and M. H. Alalfi, "Reentrancy Vulnerability Identification in Ethereum Smart Contracts," 2020 IEEE International Workshop on Blockchain Oriented Software Engineering (IWBOSE), London, ON, Canada, 2020, pp. 22-29, '
      }
      if(this.property == '整数溢出漏洞'){
        this.title = '整数溢出漏洞'
        this.description = '整数溢出漏洞是一种常见的漏洞，在许多程序中都可能存在。\n'+
        '\n'+
        '整数溢出一般分为上溢和下溢两种情况，在智能合约中则还包括乘法溢出、加法溢出和减法溢出三种类型。\n'+
        '\n'+
        '以太坊智能合约中，整数类型通常被指定为固定大小且无符号，表示整型变量只能存储在一定范围内的数值，超出这个范围会导致整数溢出错误。Solidity 语言的整型变量步长一般以 8 递增，支持从 uint8 到 uint256。以 uint8 类型为例，其变量长度为 8 位，支持存储的数字范围是[0, 255]。若试图将大小超过这个范围的数据存储到 uint8 类型变量中，以太坊虚拟机(Ethereum virtual machine,简称 EVM)将会自动截断高位，从而导致运算结果异常，产生整数溢出错误。智能合约整数溢出漏洞与其他程序不同，因其造成的损失极大且不可弥补。\n'+
        '\n'+
        '例如，美链 BEC 合约的整数溢出漏洞导致其代币价值瞬间归零。'
        this.sample = '在这个合约中，我们使用了一个 uint8 类型的变量 `balance` 来表示合约的余额。在 `deposit` 函数中，我们使用 `+=` 运算符来增加余额，而在 `withdraw` 函数中，我们使用 `require` 来确保余额足够，并使用 `-=` 运算符来减少余额。\n' +
            '\n' +
            '  然而，如果我们在 `deposit` 函数中传入一个大于 247 的值，则会发生整数溢出错误，因为 uint8 类型的变量只能存储 8 位二进制数，最大值为 255。当我们尝试将一个大于最大值的值存储到 uint8 类型的变量中时，EVM 会自动截断高位，从而导致运算结果异常，产生整数溢出错误。\n' +
            '\n' +
            '  攻击者可以利用这个漏洞来多次调用 `deposit` 函数，向合约中存入大量的数值，从而使 `balance` 变为 0，甚至变为负数。当合约中的 `balance` 变为 0 时，用户就无法再从合约中提取资金了，从而导致损失。\n' +
            '\n' +
            '  ```solidity\n' +
            '  pragma solidity ^0.8.0;\n' +
            '  \n' +
            '  contract IntegerOverflow {\n' +
            '      uint8 public balance = 0;\n' +
            '  \n' +
            '      function deposit(uint8 amount) public {\n' +
            '          balance += amount;\n' +
            '      }\n' +
            '  \n' +
            '      function withdraw(uint8 amount) public {\n' +
            '          require(balance >= amount);\n' +
            '          balance -= amount;\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paperlink = 'https://doi.org/10.1145/3377644.3377650'
        this.paper = 'Enmei Lai and Wenjun Luo. 2020. Static Analysis of Integer Overflow of Smart Contracts in Ethereum. In Proceedings of the 2020 4th International Conference on Cryptography, Security and Privacy (ICCSP 2020). Association for Computing Machinery, New York, NY, USA, 110–115.'
      }
      if(this.property == '异常处理漏洞'){
        this.description = '以太坊智能合约中，有 3 种情况会抛出异常：\n' +
            '\n' +
            '- 1)执行过程中的 *Gas*（即部署或执行智能合约的费用）消耗殆尽；\n' +
            '- 2)调用栈溢出；\n' +
            '- 3)执行语句中有 throw 命令。\n' +
            '\n' +
            '智能合约中通常使用 `assert()` 和 `require()` 函数来检查输入和状态，并在遇到错误时停止合约的执行。然而，如果在合约的执行过程中发生异常情况，如果没有合适地处理这些异常，攻击者可能会利用这些异常情况进行攻击。一般来说,如果被调用的合约抛出异常时，合约将会通过回滚的方式处理异常行为，即终止当前合约执行并恢复到上一步状态，同时返回一个错误标识符（即 False）。然而，当一个合约以不同的方式调用另一个合约时，以太坊智能合约却没有统一的方法处理异常，发起调用的合约可能无法获取被调用合约中的异常信息。例如，智能合约中的子调用发生异常时通常会自动向上级传播，但是一些底层调用函数（如 send,call,delegatecall）发生异常时只返回 False，而不抛出异常。因此仅仅根据有无异常抛出就判断合约执行是否成功是不安全的，在调用底层函数时必须严格检查返回值，并且对异常采用一致性的处理方式。\n' +
            '\n' +
            '智能合约异常处理漏洞的影响可能是灾难性的，攻击者可能会利用这些漏洞来进行重入攻击、算术溢出攻击、DoS攻击等等。'
        this.title = '异常处理漏洞'
        this.sample = '在这个示例合约中，有一个 `setValue` 函数用于设置 `value` 变量的值，并且只有合约的拥有者才能调用这个函数。有一个 `withdraw` 函数用于从合约中提取余额，并将余额转移给合约的拥有者。如果没有余额可用，则会抛出异常。\n' +
            '\n' +
            '  然而，在 `withdraw` 函数中，当余额提取失败时，它只是抛出一个错误消息，并没有处理异常。这意味着如果 `owner` 地址不是一个有效的地址，或者它没有实现一个可以接收转账的回调函数，这个函数将会失败，并且会让余额留在合约中。这可能导致安全问题，因为其他用户可能会利用这个未处理的异常来攻击合约。\n' +
            '\n' +
            '  ```solidity\n' +
            '  pragma solidity ^0.8.0;\n' +
            '  \n' +
            '  contract ExceptionHandling {\n' +
            '      uint public value;\n' +
            '      address public owner;\n' +
            '      \n' +
            '      constructor() {\n' +
            '          owner = msg.sender;\n' +
            '      }\n' +
            '      \n' +
            '      function setValue(uint newValue) public {\n' +
            '          require(msg.sender == owner, "Only owner can call this function");\n' +
            '          value = newValue;\n' +
            '          emit ValueSet(newValue);\n' +
            '      }\n' +
            '      \n' +
            '      function getValue() public view returns (uint) {\n' +
            '          return value;\n' +
            '      }\n' +
            '      \n' +
            '      function withdraw() public {\n' +
            '          require(msg.sender == owner, "Only owner can withdraw");\n' +
            '          require(address(this).balance > 0, "No balance to withdraw");\n' +
            '          (bool success, ) = owner.call{value: address(this).balance}("");\n' +
            '          require(success, "Withdrawal failed");\n' +
            '          emit Withdrawal(owner, address(this).balance);\n' +
            '      }\n' +
            '      \n' +
            '      function() external payable {\n' +
            '          revert("Fallback function called");\n' +
            '      }\n' +
            '      \n' +
            '      event ValueSet(uint newValue);\n' +
            '      event Withdrawal(address owner, uint amount);\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paperlink = 'https://doi.org/10.1145/3194113.3194115'
        this.paper = ' Sergei Tikhomirov, Ekaterina Voskresenskaya, Ivan Ivanitskiy, Ramil Takhaviev, Evgeny Marchenko, and Yaroslav Alexandrov. 2018. SmartCheck: static analysis of ethereum smart contracts. In Proceedings of the 1st International Workshop on Emerging Trends in Software Engineering for Blockchain (WETSEB \'18). Association for Computing Machinery, New York, NY, USA, 9–16. '
      }
      if(this.property == '权限控制漏洞'){
        this.title = '权限控制漏洞'
        this.description = '智能合约权限控制漏洞产生的最根本原因是未能明确或未仔细检查合约中函数的访问权限，从而允许恶意攻击者能进入本不该被其访问的函数或变量。权限控制漏洞主要体现在 2 个层面：\n' +
            '\n' +
            '- 1)合约代码层面。Solidity 智能合约函数和变量的访问限制有 4 种，即 public，private，external，internal。如果函数未使用这些标识符，那么默认情况下，智能合约函数的访问权限为 public，亦即该函数允许被本合约或其他合约的任何函数调用，这种情况可能导致该函数被攻击者恶意调用；\n' +
            '\n' +
            '- 2)合约逻辑层面。通常使用函数修饰器对函数或变量进行约束。例如，某些关键函数需要使用修饰器 *onlyOwner* 或 *onlyAdmin* 来约束，若未给这些函数添加修饰器，任何人都有权利访问并操纵这些关键函数，则很有可能导致关键函数被恶意攻击者操纵，从而进一步地破坏智能合约逻辑。'
        this.sample = '  在此示例中，`withdrawAll` 函数没有任何身份验证或授权机制，只要任何人调用该函数，就可以提取合约中的所有余额。\n' +
            '\n' +
            '  ```solidity\n' +
            '  pragma solidity ^0.8.0;\n' +
            '  \n' +
            '  contract VulnerableContract {\n' +
            '      address payable public owner;\n' +
            '      \n' +
            '      constructor() {\n' +
            '          owner = payable(msg.sender);\n' +
            '      }\n' +
            '      \n' +
            '      function deposit() public payable {\n' +
            '      }\n' +
            '      \n' +
            '      function withdrawAll() public {\n' +
            '          require(msg.sender == owner); // 无身份验证\n' +
            '          owner.transfer(address(this).balance);\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paperlink = 'https://doi.org/10.1145/3533767.3534372'
        this.paper = 'Ye Liu, Yi Li, Shang-Wei Lin, and Cyrille Artho. 2022. Finding permission bugs in smart contracts with role mining. In Proceedings of the 31st ACM SIGSOFT International Symposium on Software Testing and Analysis (ISSTA 2022). Association for Computing Machinery, New York, NY, USA, 716–727. '
      }
      if(this.property == '拒绝服务漏洞'){
        this.title = '拒绝服务漏洞'
        this.description = '拒绝服务(denial of service,简称 DOS)是以太坊智能合约常见的漏洞，攻击者通过破坏合约中原有的逻辑，消耗以太坊网络中的资源（如以太币和 *Gas*），从而使合约在一段时间内无法正常执行或提供正常服务。\n' +
            '\n' +
            '针对智能合约的 DoS 攻击方式通常有 3 种：\n' +
            '\n' +
            '- 1)通过(Unexpected)Revert 发动 DoS 攻击。当智能合约状态的改变由外部函数的执行结果决定并且这个执行一直失败时，若未对函数执行失败的情况进行处理，将会使智能合约处于容易遭到 DoS 攻击的状态；\n' +
            '\n' +
            '- 2)通过以太坊区块的 *Gas* 限制发动 DoS 攻击。以太坊网络中每个区块都设定了 *Gas* 上限，如果交易花费的 *Gas* 超过上限会导致交易失败。因此，即使没有受到恶意攻击，智能合约的运行也可能因为超过 *Gas* 限制而出现问题；更严重的情况是，若攻击者恶意操纵 *Gas* 消耗而导致其达到区块上限，则会使合约的交易过程以失败告终；\n' +
            '\n' +
            '- 3)合约 Owner 账户发动 DoS 攻击。很多智能合约都有 Owner 账户，其拥有开启或停止合约交易的权限，若没有保护好 Owner 账户，导致其被攻击者操控，很可能会使合约交易被永久冻结。'
        this.sample = '在上述示例中，`DenialOfService` 合约允许用户进行存款和提款操作。但是，合约的 fallback 函数是一个无限循环的提款操作，每次提取 1 ether，这将使得任何用户在尝试与该合约进行交互时都会失败，因为合约无法处理其他用户的交易。\n' +
            '\n' +
            '  因此，恶意用户可以利用该漏洞向 `DenialOfService` 合约发送交易，从而导致合约服务不可用，影响其他用户的正常交易。\n' +
            '\n' +
            '  ```solidity\n' +
            '  pragma solidity ^0.8.0;\n' +
            '  \n' +
            '  contract DenialOfService {\n' +
            '      mapping (address => uint256) public balances;\n' +
            '  \n' +
            '      function deposit() public payable {\n' +
            '          balances[msg.sender] += msg.value;\n' +
            '      }\n' +
            '  \n' +
            '      function withdraw(uint256 amount) public {\n' +
            '          require(balances[msg.sender] >= amount);\n' +
            '          balances[msg.sender] -= amount;\n' +
            '          (bool success, ) = msg.sender.call{value: amount}("");\n' +
            '          require(success, "Transfer failed.");\n' +
            '      }\n' +
            '  \n' +
            '      function() external payable {\n' +
            '          while (true) {\n' +
            '              withdraw(1 ether);\n' +
            '          }\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paper = '1. 赵淦森,谢智健,王欣明等.智能合约安全综述:漏洞分析[J].广州大学学报(自然科学版),2019,18(03):59-67.\n 2. 邱欣欣,马兆丰,徐明昆.以太坊智能合约安全漏洞分析及对策[J].信息安全与通信保密,2019,No.302(02):44-53.'
      }
      if(this.property == '类型混乱漏洞'){
        this.title = '类型混乱漏洞'
        this.description = '以太坊智能合约使用高级语言 Solidity 编写，它是强类型编程语言，会自动检查程序中是否有类型匹配错误，例如在变量赋值时，若把字符串赋值给整型变量则会产生类型匹配错误。然而，在智能合约中，有些情况即使类型不匹配，合约在执行过程中也不会引发异常。因此，开发人员有时候会默认合约可以自行检查程序中的类型匹配问题时，往往会忽视人工检查，从而导致意料之外的漏洞发生。'
        this.sample = '在这个合约中，`deposit()` 函数将接受一个以太币金额，将其转换为 `uint8` 类型，然后将其累加到一个名为 `amount` 的私有变量中。但如果发送的以太币数量大于 `uint8` 类型所能表示的最大值 255，会发生类型混淆，即只有低位字节将被存储，高位字节将被丢弃。这将导致合约的 `amount` 变量中存储的值比实际收到的以太币数量小，从而导致合约的不正确行为。\n' +
            '\n' +
            '  ```solidity\n' +
            '  pragma solidity ^0.8.0;\n' +
            '  \n' +
            '  contract TypeConfusion {\n' +
            '      address private owner;\n' +
            '      uint256 private amount;\n' +
            '  \n' +
            '      constructor() {\n' +
            '          owner = msg.sender;\n' +
            '          amount = 0;\n' +
            '      }\n' +
            '  \n' +
            '      function deposit() public payable {\n' +
            '          require(msg.value > 0, "Deposit amount should be greater than 0.");\n' +
            '          amount += uint8(msg.value);\n' +
            '      }\n' +
            '  \n' +
            '      function withdraw() public {\n' +
            '          require(msg.sender == owner, "Only owner can withdraw funds.");\n' +
            '          payable(msg.sender).transfer(amount);\n' +
            '          amount = 0;\n' +
            '      }\n' +
            '  \n' +
            '      function getBalance() public view returns (uint256) {\n' +
            '          return amount;\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paperlink = 'https://doi.org/10.1007/978-3-662-54455-6_8]'
        this.paper = 'Atzei N, Bartoletti M, Cimoli T. A survey of attacks on ethereum smart contracts (sok). In: Proc. of the Int’l Conf. on \n' +
            '\n' +
            '  principles of security and trust. Springer, Berlin, Heidelberg, 2017: 164-186.'
      }
      if(this.property == '未知函数调用漏洞'){
        this.title = '未知函数调用漏洞'
        this.description = '类似于大多数编程语言，智能合约通过函数名和函数参数类型确保函数的唯一性。当一个智能合约调用另一个合约中的函数时，若函数和参数类型无法匹配到被调用合约中的函数，此时将会默认调用该合约中的Fallback 函数。若是该 Fallback 函数中隐藏了攻击者设计的恶意操作，那么很可能会出现安全问题。'
        this.sample = ' 在本示例中，合约A的`bar`函数尝试调用合约B的名为`baz`的函数，但是由于函数名和函数参数类型不匹配，因此发生了未知函数调用漏洞。\n' +
            '\n' +
            '  ```solidity\n' +
            '  // 合约B\n' +
            '  contract ContractB {\n' +
            '      function foo(uint256 x) public returns (bool) {\n' +
            '          // ...\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  // 合约A\n' +
            '  contract ContractA {\n' +
            '      address contractBAddress;\n' +
            '  \n' +
            '      constructor(address _contractBAddress) public {\n' +
            '          contractBAddress = _contractBAddress;\n' +
            '      }\n' +
            '  \n' +
            '      function bar() public {\n' +
            '          // 在这里调用了一个未知函数\n' +
            '          contractBAddress.call(bytes4(keccak256("baz(uint256)")), 42);\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paperlink = 'https://doi.org/10.1145/3158136\n'
        this.paper = 'Shelly Grossman, Ittai Abraham, Guy Golan-Gueta, Yan Michalevsky, Noam Rinetzky, Mooly Sagiv, and Yoni Zohar. 2017. Online detection of effectively callback free objects with applications to smart contracts. Proc. ACM Program. Lang. 2, POPL, Article 48 (January 2018), 28 pages. '
      }
      if(this.property == '以太冻结漏洞'){
        this.title = '以太冻结漏洞'
        this.description = '智能合约以太冻结漏洞指的是攻击者通过某些方式在智能合约中冻结一定数量的以太币，从而导致智能合约无法正常运作，影响合约的功能和服务。转账操作是智能合约最重要且最独特的功能之一。智能合约可以接收以太币转账，也可以转账给其他合约地址。值得一提的是，一些合约自身不实现转账函数，而是通过 delegatecall 调用外部合约中的转账函数来实现转账功能。然而，若是这些提供转账函数的外部合约带有 Self-destruct 或 Suicide 等操作时，那么通过delegatecall 调用转账函数的合约很可能会发生因为被调用合约的自毁操作而导致自身以太币被冻结的情况。\n' +
            '\n' +
            '攻击者通过向智能合约发送一些恶意的交易，让智能合约的执行状态进入死循环，导致智能合约无法正常结束，因此无法继续提供服务，同时攻击者可以利用智能合约的这种异常状态，将其中的一定数量的以太币冻结在合约中，从而使得其他用户无法使用这些以太币。智能合约以太冻结漏洞的危害非常严重，可以导致合约无法正常运作，从而影响到合约中的用户和服务。'
        this.sample = '在本示例中，`EtherFreeze` 合约中的 `()` 函数是fallback函数，当智能合约收到无效函数调用时，就会调用fallback函数，因此它可以作为一种攻击合约的途径。攻击者可以向该合约发送无效的交易来触发fallback函数，然后进入死循环，从而使得合约无法正常运行，同时攻击者可以将以太币存入合约中，将其中的一定数量的以太币冻结在合约中。\n' +
            '\n' +
            '  ```solidity\n' +
            '  pragma solidity ^0.8.0;\n' +
            '  \n' +
            '  contract EtherFreeze {\n' +
            '      mapping(address => uint) public balances;\n' +
            '  \n' +
            '      function deposit() public payable {\n' +
            '          balances[msg.sender] += msg.value;\n' +
            '      }\n' +
            '  \n' +
            '      function withdraw() public {\n' +
            '          require(balances[msg.sender] > 0);\n' +
            '          require(msg.sender.call{value: balances[msg.sender]})();\n' +
            '          balances[msg.sender] = 0;\n' +
            '      }\n' +
            '  \n' +
            '      function () public payable {\n' +
            '          while (true) {\n' +
            '              deposit();\n' +
            '          }\n' +
            '      }\n' +
            '  }\n' +
            '  \n' +
            '  ```'
        this.paperlink = 'https://doi.org/10.1145/2976749.2978309'
        this.paper = 'Loi Luu, Duc-Hiep Chu, Hrishi Olickel, Prateek Saxena, and Aquinas Hobor. 2016. Making Smart Contracts Smarter. In Proceedings of the 2016 ACM SIGSAC Conference on Computer and Communications Security (CCS \'16). Association for Computing Machinery, New York, NY, USA, 254–269. '
      }
      if(this.property == '短地址漏洞'){
        this.title = '短地址漏洞'
        this.description = '智能合约短地址漏洞其实是利用了以太坊虚拟机自动补 0 的特性。在智能合约 ABI 规范中，输入的合约地址长度必须为 20 个字节，当地址长度小于 20 个字节时，以太坊虚拟机就会通过在末尾自动补 0 来满足地址长度的要求。然而，正是因为这个特性使得恶意攻击者有机可趁。例如，攻击者故意把账户地址少输一个字节，以太坊虚拟机解析时就会从下一个参数(即以太币数量)取缺少的编码位数对地址进行补全,然后在整串二进制码的末位补 0 至正常的编码位数，这就意味着以太币数量这个参数被左移了一个字节,此时若是执行的是转账操作，则可能使合约转出超出实际应该转发的以太币数量给攻击者。'
        this.sample = '在此示例中，`deposit` 函数用于向合约地址发送以太币，会将以太币存储在 `balances` 映射中对应的地址上。由于在存储地址时使用了按位与运算符 `&`，并将其结果与 0xFFFFFFF 进行比较，这将导致合约在存储地址时将其截断为只有 7 个字节，而且在比较时末尾自动填充了 0，从而将以太币存储在一个不属于他的地址上。当用户使用相同的短地址尝试提取存储在其中的以太币时，合约会检查 `balances` 映射中是否存在该地址，并尝试从中提取以太币，但实际上该地址已经被存储在了一个不同的地址上，这将导致用户无法成功提取以太币，从而导致他的资金被冻结。\n'+

        '```solidity\n'+
        'pragma solidity ^0.8.0;\n'+
        'contract ShortAddressAttack {\n'+
        '    mapping(address => uint256) public balances;\n'+
        '    function deposit() public payable {\n'+
        '        balances[address(msg.sender) & 0xFFFFFFF] += msg.value;\n'+
        '    }\n'+
        '    function withdraw(uint256 amount) public {\n'+
        '        require(balances[address(msg.sender) & 0xFFFFFFF] >= amount, "Insufficient balance");\n'+
        '        balances[address(msg.sender) & 0xFFFFFFF] -= amount;\n'+
        '        payable(msg.sender).transfer(amount);\n'+
        '    }\n'+
        '}\n'+
        '\n'+
        '```'
        this.paperlink = ''
        this.paper = '赵淦森,谢智健,王欣明等.智能合约安全综述:漏洞分析[J].广州大学学报(自然科学版),2019,18(03):59-67.'
      }
      if(this.property == '以太丢失漏洞'){
        this.title = '以太丢失漏洞'
        this.description = '智能合约转账以太币时必须指定接收方的合约地址，并且地址必须是规范的。若是接收方的合约地址是完全独立的空地址，即它们与任何其他用户或合约都没有关联，如果将以太币转账给这样的合约地址,将会导致以太币永远丢失。需要注意的是，这个漏洞只有在接收方地址为完全独立的空地址时才会发生，如果接收方地址是已经存在的账户地址，则不会出现以太丢失。'
        this.sample = '在此示例中，`transferTo`函数将所有以太币转移到指定地址，而在进行地址检查时没有检查接收地址是否为独立的空地址，这就存在一个漏洞。如果攻击者将空地址作为接收方地址，那么所有的以太币就会被转移到一个不存在的地址中，从而导致以太丢失。\n'+
        '```solidity\n'+
        'pragma solidity ^0.8.0;\n'+
        'contract VulnerableContract {\n'+
        '    address payable owner;\n'+
            
         '   constructor() {\n'+
         '       owner = payable(msg.sender);\n'+
         '   }\n'+
            
        '    function transferTo(address payable _receiver) external payable {\n'+
                '// 检查接收方是否为非空地址\n'+
          '      require(_receiver != address(0), "Invalid receiver address");\n'+

'                // 将所有的以太币发送到接收方地址\n'+
         '       _receiver.transfer(address(this).balance);\n'+
          '  }\n'+
            
         '   // 可以通过这个函数将合约中的以太币提取出来\n'+
          '  function withdraw() external {\n'+
         '      require(msg.sender == owner, "Unauthorized");\n'+
                
          '     owner.transfer(address(this).balance);\n'+
          '  }\n'+
        '}\n'+
        '```\n'
        this.paperlink = 'https://doi.org/10.1007/978-3-662-54455-6_8]'
        this.paper = 'Atzei N, Bartoletti M, Cimoli T. A survey of attacks on ethereum smart contracts (sok). In: Proc. of the Int’l Conf. on principles of security and trust. Springer, Berlin, Heidelberg, 2017: 164-186.'
      }
      if(this.property == '短地址漏洞'){
        this.title = ''
        this.description = ''
        this.sample = ''
        this.paperlink = ''
        this.paper = ''
      }
      if(this.property == '短地址漏洞'){
        this.title = ''
        this.description = ''
        this.sample = ''
        this.paperlink = ''
        this.paper = ''
      }
    },
    handleClick(tab, event) {
      console.log("tab:"+this.activeId)
    },
    Contains(user) {
      if (this.SearchInputCopy == '') {
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
  height: 10vh;
}
.rowstyle {
  background-color: #a3cad6;
}
</style>
