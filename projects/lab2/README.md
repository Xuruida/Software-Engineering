# lab2

使用JS完善lab1中计时器的功能。

CSSLint与HTMLLint见lab1下README.md

## ESLint

使用ESLint检测app.js中的风格。

[Github ESLint](https://github.com/eslint/eslint/)

[ESLint使用简介](https://www.jianshu.com/p/933b6b6a84c9)

### 操作步骤

（以本仓库实例为例）在仓库根目录下执行：

```shell
cd projects/lab2/grunt
npm install -g eslint
eslint --init
eslint ../PB17000209/app.js -c../grunt/.eslintrc.js
```

即可实现检查。

由于--init选项下可选项目太多，并不知道评测机器希望的选项，还未对代码进行修改。

