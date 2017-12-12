# A Google Mirror Extension For Google Chrome.
> 一个可以快速打开 Google 镜像的 chrome 扩展。

> 镜像url均收集自网络，不保证所有url完全可用。无法打开镜像地址时，多试几次，总有能打开的😝。

> 写的比较烂，大神勿喷，要是能给出指导意见就感激不尽了。

## 克隆仓库
你可以克隆本仓库至本地。`git clone https://github.com/xiaoyaozi1010/googleMirror.git`.

## 安装插件
- 打开chrome，并打开扩展程序页面：`chrome://extensions/`
- 开启开发者模式，选中页面左上角`开发者模式`复选框
- 加载已解压的扩展程序，导航至上步克隆后的代码仓库内，选中`extension`文件夹，点击`添加`按钮
- 此时chrome地址栏右侧会出现一个翻转的Googl，点击之后经过短暂加载，即可跳转至可用的Google镜像地址

## 代码修改
- 安装依赖：仓库根目录执行 `npm install`
- 全局安装 [Typescript](https://www.typescriptlang.org/)，建议直接使用vscode修改仓库代码（见下方使用vscode）。
- 执行 webpack -w，如果未安装webpack，请先 `npm install webpack -g`
- 修改src目录下源代码后执行，tsc xxx.ts
- 修改后的代码会被编译至`extension/dist`目录内
- 刷新chrome扩展程序页面即可生效。

## 使用 vscode
- 如未安装vscode，请前往下载 [vscode](https://code.visualstudio.com/)
- vscode 打开仓库根目录
- 菜单选择： `任务` - `运行任务` - `tsconfig.json`任务，此时vscode会监听tsconfig指定的ts文件改变。
- 终端内`cd`到仓库根目录，执行`npm run dev`，启动自动编译即可。 





