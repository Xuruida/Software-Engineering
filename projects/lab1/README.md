# lab1

使用HTML+CSS制作计时器界面

## csslint

利用csslint检查css风格。
### 操作步骤

按如下方式操作：
```shell
npm install -g csslint
csslint style.css
```

即可在命令行看到错误信息，再根据错误修改即可。
### 常见报错

- 0不应当有单位。（即0px改为0）
- height不能和上下padding同时存在；width不能和左右padding同时存在。
- 每个class中属性应当以字典序排序。
  
## htmllint

利用htmllint检查HTML风格。

贴一个好懂一点的链接：[点我看grunt实例](https://my.oschina.net/mdxlcj/blog/1626534)

grunt入门：[快速入门](https://www.gruntjs.net/getting-started)

grunt-htmllint：[npm上的grunt-htmlllint](https://www.npmjs.com/package/grunt-htmllint)

### 操作步骤

阅读了以上几个网页后，按以下步骤：
- 在仓库根目录下执行：
  
```shell
cd projects/lab1
mkdir grunt
cd grunt
npm install -g grunt-cli
npm install grunt --save-dev
npm install grunt-htmllint --save-dev
```

- 添加Gruntfile.js（如仓库中所示）
- 在目录下执行指令`grunt`，即可在命令行看到错误信息，再根据错误修改即可。
  
### 常见报错

- 结尾必须是lf（很扯，但是不得不改）
- style必须以下划线形式命名（很烦）
- 其他的小错误 （例如：存在连续的空格等）