# 项目介绍
欢迎你来到我们未完成的srtp项目！如有其余疑问可以联系我们，1714499164（QQ），项目的gihub仓库为https://github.com/menci725/Smartbugs-Test_platform
该项目希望实现一个智能合约安全漏洞检测平台，具有漏洞检测、漏洞介绍、工具介绍和漏洞修复功能。
目前已实现漏洞介绍、工具介绍功能和部分漏洞检测功能，漏洞修复功能仅搭建了UI。


## 前端设计
该项目前端基于vue框架，使用axios实现跨域配置，默认接入后端为该服务器上的9091端口。
该项目的前端文件为SRTP/smart，可以直接运行或者在该目录下执行 npm install 命令及 npm run serve，目前已经关闭。


### 漏洞检测界面
漏洞检测界面文件为analyse.vue，引入Element UI及CodeMirror，目前仅支持 oyente 及 orisis 工具，输出格式已统一。
如果需要实现检测修改后的上传文件，建议修改传送给后端的文件，后端已实现相应的接口；如果需要实现漏洞标识，建议不使用CodeMirror，可以使用Table或者vue ace editor；


### 漏洞介绍界面
漏洞介绍界面文件为introduce.vue，引入Element UI，支持模糊搜索与论文链接。


### 工具介绍界面
工具介绍界面文件为tool.vue，同上。


### 漏洞修复界面
文件为repair.vue，功能目前未实现。


## 后端
此项目使用Springboot开发，是经典的controller，Service，DAO模式，utils 文件夹下是返回前端数据的统一格式类

```
ApiResult.success()
ApiResult.error()
```

返回给前端处理结果。

以及调用命令行的类，使用

```
CommandUtil.run(String command)
```

就可以调用对应的shell命令。

项目运行：使用IDEA打开后端工程SRTP_Backend，编辑运行/调试配置，将运行于选项设置为SSH服务器，选定项目路径和JDK 主路径，保存配置，点击运行，项目就会部署到服务器