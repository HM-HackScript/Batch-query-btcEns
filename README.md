## batch-query-btcEns
> 在`https://gamma.io/ordinals` 注册 Btc域名时，可以利用工具在线查询域名是否被注册



### 目录结构

```shell
./
├── batch-query-btc-ens-macos
├── batch-query-btc-ens-win.exe
├── config.ini
├── names.txt
├── 已注册.txt
├── 未注册.txt
└── 查询异常.txt
```

- **config.ini** - 项目配置文件

```ini
proxy=http://127.0.0.1:7890 ;<optional> 配置请求代理
entry=names.txt             ;配置查询列表入口,txt文件，一行一个域名
```

- **names.txt** - 待查询列表默认入口文件，如果改名或指定其他文件请修改`config.ini > entry` 路径

```txt
testname1
testname2
...
```

- **batch-query-btc-ens-macos** - MacOS 脚本执行入口程序
- **batch-query-btc-ens-win.exe** -  Windows  脚本执行入口程序
- ***.txt** - 运行日志，对运行结果进行本地缓存。对重复查询已注册域名，会先从已注册缓存中初步过滤，减少无效请求



### 使用教程

1. 在 `github` 仓库的`release` 下载脚本运行包 [下载地址](https://github.com/HM-HackScript/Batch-query-btcEns.git)
2. 在本地解压缩，并检查项目文件结构是否完整
3. 按要求配置好`config.ini` 文件
4. 将需要查询的域名列表配置一行一个配置在`config.ini > entry`  指向的路径文件中，默认是`names.txt`
5. 执行程序
   - Mac 需要调出 `Terminal` 终端, cd 切换至脚本根目录，输入`./ batch-query-btc-ens-macos` 执行
   - Windiws 直接双击`batch-query-btc-ens-win.exe` 即可执行



### 注意说明

1. 脚本安全说明：本程序属于全开源程序，如果你有编程基础，可以检查代码逻辑在`node` 环境下自行执行或编译
2. 版本更新说明：版本号按标准` v-x.x.x` 进行版本定义
   - 小版本：常规更新，修复Bug、细节优化，一般仅需要替换系统对应的脚本执行入口程序即可，无需整包更新
   - 中版本：重大更新，增加或调整功能，除了替换系统对应的脚本执行入口程序外，需要对`config.ini` 做一定的修改，或者增减一些辅助文件
   - 大版本：全局更新，代码重构、框架修改，需要整个项目重新替换

3. 免责声明：本人脚本仅供参考学习，不做商用，任何不规范行为造成损失与本人无关
