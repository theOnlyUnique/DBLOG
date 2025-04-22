import { FC, StrictMode, useRef } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Root from "./routes/root.tsx";
import NavTest from "./routes/navTest.tsx";
import ShowState from "./routes/showState.tsx";
import ShowDemo from "./routes/demo.tsx";
import Login from "./routes/login.tsx";
import Home from "./routes/Home.tsx";
import FooterCopyright from "./routes/FooterCopyRight.tsx";
import Article from "./routes/markdown/article.tsx"
import "./index.css";
// import "./Layout.css"
import 'prismjs/themes/prism.css'; // 你可以选择其他主题，如 'prism-okaidia.css', 'prism-dark.css' 等
// 注入redux缓存
import { Provider } from "react-redux";

// redux
// import GlobalStore from "./store/global/store.tsx";
// import DemoStore from "./store/demo/store.tsx";
// import globalStore from "./store/store.tsx";
import { globalStore, persistor } from './store/store'; // 引入刚才创建的 store

// import TestStore from "./store/test/store.tsx";
// 添加路由
import { createBrowserRouter, RouterProvider,BrowserRouter, Routes, Route } from "react-router-dom";
// import FloatButton from "antd/es/float-button/FloatButton";
import { FloatButton } from 'antd';
import { PersistGate } from "redux-persist/integration/react";
import TopMenu from "./routes/topMenu.tsx";
// data.js
const articles = [
	// {
	//   id: 1,
	//   title: "React入门教程",
	//   content: `
	// 	# 什么是React？
	// 	React是一个用于构建用户界面的JavaScript库，特别适合单页应用（SPA）。
	// 	## 核心特性
	// 	- 组件化开发
	// 	- 虚拟DOM优化性能
	// 	- 声明式编程
	//   `,
	// },
	// {
	// 	id: 2,
	// 	title: "JavaScript基础语法",
	// 	content: `
	// 	  ## 变量声明
	// 	  let x = 1; // 可变
	// 	  const y = 2; // 不可变
	// 	  ## 函数
	// 	  function add(a, b) {
	// 		  return a + b;
	// 	  }
	// 	`,
	//   },
	  {
		id: 3,
		title: "JavaScript基础语法",
		content:"![](https://cdn.prod.website-files.com/65943d23dc44e6ce92eb6b67/65fc9f534c1398dac499304d_commercial_search-p-800.jpg)",
	  },
	//   {
	// 	id: 4,
	// 	title: "JavaScript基础语法",
	// 	content: `
	// 	  ## 变量声明
	// 	  let x = 1; // 可变
	// 	  const y = 2; // 不可变
	// 	  ## 函数
	// 	  function add(a, b) {
	// 		  return a + b;
	// 	  }
	// 	`,
	//   },
	  {
		id: 5,
		title: "JS输出题",
		content: '### 1.变量提升\n\n```javascript\nfunction() {\n    console.log(a);\n    var a = 1;\n    function a(){};\n    console.log(a);\n}\n```\n\n因为var和function都会进行变量提升，但是函数的提升优先，而且会将值进行提升\n\n但是var只会提升声明，赋值仍旧是在代码行所在位置\n\n当然，本例中js并不允许匿名函数直接执行，此时报错：SyntaxError: Function statements require a function name\n\n加上()变成匿名语句后调用()直接执行\n\n### 2.for in 操作符\n\n```javascript\nvar arr = [1,2,,4]\nfor(const item in arr){\n    console.log(item);\n}\n```\n\nfor in 操作符将数组对象自身的所有可枚举键直接打印出来\n\n（可以使用Array.prototype直接定义一个属性，\n\n也可以使用Object.defineProperty）\n\n所以这里不是输出值，而是输出可枚举的键，也就是0,1,3\n\n### 3.delete操作符\n\n见14\n\n### 4.鼠标的触发事件\n\n主要有：contextmenu（右键点击）、click、dblclick（左键双击）、mousedown、mouseout（鼠标移出边界） 、mouseover（鼠标移出到另一个元素）、mouseup（松开任意左右键）、mousemove（鼠标放置在某个元素）\n\n### 5.for...of操作符\n\n```javascript\nvar arr = [1,2,,4]\nfor(const item of arr){\n    console.log(item);\n}\n该操作符打印出数组的所有值，如果为empty，则显示未undefined\n```\n\n### 6.加法操作\n\n```javascript\nvar s = [\'1\',2,3].map((item) => item +1)\nconsole.log(s);\n```\n\n### 7.every操作符\n\n```javascript\n[].every( item => !item)\n```\n\n- 如果数组中所有元素都通过了回调函数的测试，则返回 `true`。\n- 如果有任何一个元素未通过测试，则返回 `false`。\n- 如果数组为空，则返回 `true`。\n\n### 8.Object.assign()\n\n```javascript\nconst obj1 = {\n    \'name\' :\'AAA\',\n}\nconst obj2 = {\n    \'id\': \'id0\',\n    \'name\' :\'BBB\',\n}\nconst obj3 = Object.assign(obj1,obj2, {\n    \n    \'name\' :\'CCC\',\n})\n\nconsole.log(obj1,obj2,obj3);\n```\n\n`Object.assign()` 是 JavaScript 中用于将所有可枚举属性从一个或多个源对象复制到目标对象的方法。它通常用于对象的浅拷贝、合并对象以及添加或覆盖对象的属性。\n\n```plain\nObject.assign(target, ...sources)\n```\n\n- **target**：目标对象，即要将属性复制到的对象。\n- **sources**：一个或多个源对象，其可枚举属性将被复制到目标对象。\n\n 返回目标对象。\n\n### 9.parseInt陷阱\n\n```javascript\nvar s = [\'1\',\'2\',\'3\'].map(parseInt)\n\nconsole.log(s);\n```\n\n这里面的parseInt实际上在map给定的三个参数(value,index,arr)中，那前两个值当做输入了\n\n想要达到效果应该使用Number构造函数，因为他只接受一个参数\n\n### \n\n### 11.三等号运算符\n\n```javascript\nconsole.log([] === []);\n```\n\n当 ===比较的是对象时，机会比较他们的地址，而非实际值\n\n但是基础类型是比较值\n\n### 12.Object.keys()方法\n\n`Object.keys()` 方法不会遍历出对象原型链上的属性。它只会返回一个数组，包含对象自身的（非继承的）所有可枚举属性的属性名。\n\n### 13.forEach中途插入值\n\n```javascript\nconst items = [1,2,3,4]\nitems.forEach( (item,index) => {\n    if (item === 3) {\n        items.splice(index,0,5);\n    }\n    console.log(item);\n})\n```\n\n很恶心\n\n### 14.delete的用法\n\n```javascript\nvar a = 1;\nb = 2;\nlet c = 3;\nconst d = 4;\n\nlet aaa = {\n    \'666\': 1\n}\nconsole.log(delete a);\nconsole.log(delete b);\nconsole.log(delete c);\nconsole.log(delete d);\nconsole.log(aaa);\n\nconsole.log(delete aaa[\'666\']);\nconsole.log(aaa);\n```\n\ndelete删除不存在的属性，返回true\n\n在成功删除时，它也将返回 `true`，否则将返回 `false`\n\n任何使用 [var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var) 声明的属性不能从全局作用域或函数的作用域中删除，即使它们可能附加到[全局对象](https://developer.mozilla.org/zh-CN/docs/Glossary/Global_object)上，因为它们是不可配置的\n\n任何使用 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 或 [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 声明的属性不能够从它被声明的作用域中删除，因为它们没有附加到任何对象上。\n\n### 15.找出代码中出现次数最多的字符\n\n```javascript\nfunction getMostFrequentChar(str) {\n    const charMap = new Map();\n\n    // 统计每个字符的出现次数\n    for (const char of str) {\n        charMap.set(char, (charMap.get(char) || 0) + 1);\n    }\n\n    let maxCount = 0;\n    let mostFrequentChar = \'\';\n\n    // 遍历 Map 找到出现次数最多的字符\n    for (const [char, count] of charMap) {\n        if (count > maxCount) {\n            maxCount = count;\n            mostFrequentChar = char;\n        }\n    }\n\n    return { total: str.length, character: mostFrequentChar, count: maxCount };\n}\n\n// 示例用法\nconst input = \\"hello world!\\";\nconst result = getMostFrequentChar(input);\n\nconsole.log(`总字符数: ${result.total}`);\nconsole.log(`出现次数最多的字符: \'${result.character}\'`);\nconsole.log(`出现次数: ${result.count}`);\n```\n\n使用Map类的get和set解决，并使用for of遍历map\n\n### 16.对象当做键名\n\n```javascript\nvar a = {}\nvar b = {\n    \'key\': \'b\'\n}\nvar c = {\n    \'key\': \'c\'\n}\na[b] = 123\na[c] = 456\n\nconsole.log(a[b]);\n```\n\n如果使用一个对象当做键名，那么会调用该对象的提toString()方法的结果当做key\n\n通常，普通对象的toString方法，得到的都是\\"object Object\\"\n\n### 17.赋值表达式的返回值\n\n```javascript\nlet a;\nconsole.log(a = 3);\nconsole.log(var b = 3); \n```\n\n赋值表达式，返回被赋值变量所代表的值\n\n### 18.var和let定义循环变量的区别\n\n```javascript\nfor (var i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 1)\n  }\n  \n  for (let i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 1)\n  }\n  \n```\n\n### 19.箭头函数和常规函数的this指向\n\n```javascript\nconst shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2\n  },\n  perimeter: () => 2 * Math.PI * this.radius\n}\n\nshape.diameter()\nshape.perimeter()\n```\n\n如果一定要使用箭头函数,可以做成立即执行函数,并bind一个this进去\n\n```javascript\nconst objs = {\n    name: \'nihao\',\n    // that: this,\n    getName() {\n        return this.name\n    },\n    getOtherName: function() {\n        return (() =>this.name).bind(this)()\n    }\n}\n\nconsole.log(objs.getName());\nconsole.log(objs.getOtherName());\n```\n\n### 20.对象直接赋值的行为\n\n```javascript\nlet a = {\n    \\"small\\":0,\n}\nlet b;\nb = a;\nconsole.log(a === b);\nconsole.log(a.small === b.small);\n```\n\n### 21.模板字面量传值\n\n```javascript\nfunction getPersonInfo(one, two, three) {\n  console.log(one)\n  console.log(two)\n  console.log(three)\n}\n\nconst person = \'Lydia\'\nconst age = 21\n\ngetPersonInfo`${person} is ${age} years old`\n```\n\n如果使用模板字面量进行传值吗,那么第一个参数总是包含字符串的数组,其它参数才是传递的表达式的值\n\n### 22.作用域部分覆盖\n\n```javascript\n;(() => {\n  let x, y\n  try {\n    throw new Error()\n  } catch (x) {\n    ;(x = 1), (y = 2)\n    console.log(x)\n  }\n  console.log(x)\n  console.log(y)\n})()\n```\n\n这里面在catch当中,只覆盖了x,另一个y依旧是最上层的y的引用\n\n### 23.拓展运算符的用法\n\n```javascript\nconst str = \\"Lydia\\"\nconsole.log(...str);\nconsole.log([...str]);\nconsole.log(...[str]);\n\nfunction test(...arg) {\n    console.log(\'xxxxx\',arg);\n}\n\ntest(str)\n```\n\n### 24.生成器函数\n\n```javascript\nfunction* generator(i) {\n    yield i\n    yield i * 2\n    yield i * 10\n}\n\nconst gen = generator(10)\n\nvar status = gen.next()\nconsole.log(status.value,status.done)\nvar status = gen.next()\nconsole.log(status.value,status.done)\nvar status = gen.next()\nconsole.log(status.value,status.done)\nvar status = gen.next()\nconsole.log(status.value,status.done)\n```\n\n### 25.对象引用\n\n```javascript\nlet person = { name: \'Lydia\' }\nconst members = [person]\nperson = null\n\nconsole.log(members)\n```\n\n### 26.值传递与引用传递\n\n```javascript\nfunction getInfo(member, year) {\n  member.name = \'Lydia\'\n  year = \'1998\'\n}\n\nconst person = { name: \'Sarah\' }\nconst birthYear = \'1997\'\n\ngetInfo(person, birthYear)\n\nconsole.log(person, birthYear)\n```\n\n### 27.数组解构\n\n```javascript\nconst numbers = [1, 2, 3, 4, 5]\nconst [y] = numbers\n\nconsole.log(y)\n```\n\n### 28.yield传递参数\n\n```javascript\nfunction* startGame() {\n  const answer = yield \'Do you love JavaScript?\'\n  if (answer !== \'Yes\') {\n    return \\"Oh wow... Guess we\'re gone here\\"\n  }\n  return \'JavaScript loves you back ❤️\'\n}\n\nconst game = startGame()\nconsole.log(/* 1 */) // Do you love JavaScript?\nconsole.log(/* 2 */) // JavaScript loves you back ❤️\n```\n\n### 29.箭头函数与常规函数的原型区别\n\n```javascript\nfunction giveLydiaPizza() {\n  return \'Here is pizza!\'\n}\n\nconst giveLydiaChocolate = () => \\"Here\'s chocolate... now go hit the gym already.\\"\n\nconsole.log(giveLydiaPizza.prototype)\nconsole.log(giveLydiaChocolate.prototype)\n```\n\n### 30.短路求值特性\n\n```javascript\nconst one = false || {} || null\nconst two = null || false || \'\'\nconst three = [] || 0 || true\n\nconsole.log(one, two, three)\n```\n\n### 1. 逻辑与 (`&&`) 运算符\n\n**行为描述：**\n\n- 如果左侧操作数为“假值”（falsy），则整个表达式返回左侧操作数的值，右侧操作数不会被评估。\n- 如果左侧操作数为“真值”（truthy），则整个表达式返回右侧操作数的值。\n\n### 2. 逻辑或 (`||`) 运算符\n\n**行为描述：**\n\n- 如果左侧操作数为“假值”（falsy），则整个表达式返回右侧操作数的值，左侧操作数不会被评估。\n- 如果左侧操作数为“真值”（truthy），则整个表达式返回左侧操作数的值，右侧操作数不会被评估。\n\n### 31.Promise.resolve()方法\n\n```javascript\nconst p1 = Promise.resolve(117);\nconst p2 = Promise.resolve(p1);\nconst p3 = Promise.resolve(117);\nconsole.log(p1 == p2,p1 === p2,p1 === p3);\n```\n\nPromise.resolve如果传入一个非Promise或者一个非thenable的立即值,则返回一个填充该值的promise对象\n\n如果传入的是一个promise对象.那么就直接返回该对象\n\n\\"非thenable\\" 这个词通常是在讨论 JavaScript 中的 Promises 时使用的。一个 \\"thenable\\" 对象是一个具有 `then` 方法的对象，这个方法允许你为 Promise 链中的下一个步骤注册回调函数。简单来说，\\"thenable\\" 对象是可以被链接到 Promise 链中的对象。\n\n\\"非thenable\\" 则是指那些没有 `then` 方法的对象，它们不能被链接到 Promise 链中。在 JavaScript 中，几乎所有的对象都是非 thenable 的，除非它们显式地实现了 `then` 方法。\n\n### 32.Proxy对象代理下的this指向\n\n```javascript\nconst obj = {\n    flag: \'Jhon\',\n    func: function() {\n        console.log(this);\n        console.log(this.flag);\n    }\n};\nconst p = new Proxy(obj, {});\np.func();\nobj.func();\n```\n\n### 33.请问在严格和非严格模式下，下列 JS 代码最终输出的结果分别是（）\n\n```javascript\nfunction func(a) {\n  console.log(a === arguments[0]);\n  a = 2;\n  console.log(a === arguments[0]);\n};\nfunc(1);\n```\n\n在严格模式下，不论参数如何变化，arguments 对象都不会随之改变\n\n在非严格模式下，命名参数的变化会同步更新到 arguments 对象中，\n\n## 34.执行下列程序，输出结果为（）\n\n```javascript\nvar a = 1;\nfunction fn(){\n    var a = 2;\n    function a(){console.log(3);}\n    return a;\n    function a(){console.log(4);}\n}\nvar b = fn();\nconsole.log(b);\n```\n\n函数的变量提升比var变量更高,所以都会被var覆盖'
	  },
	  {
		id: 6,
		title: 'JavaScript基础语法(一)',
		content: '# 一、基本语法\n\n## 1.1语句\n\nJavaScript 程序的执行单位为行（line），也就是一行一行地执行。一般情况下，每一行就是一个语句。\n\n表达式不需要分号结尾。一旦在表达式后面添加分号，则 JavaScript 引擎就将表达式视为语句，这样会产生一些没有任何意义的语句。\n\n## 1.2变量\n\n变量是对“值”的具名引用。变量就是为“值”起名，然后引用这个名字，就等同于引用这个值。变量的名字就是变量名。\n\nJavaScript 的变量名区分大小写，`A`和`a`是两个不同的变量。\n\n如果只是声明变量而没有赋值，则该变量的值是`undefined`。\n\nJavaScript 引擎的工作方式是，先解析代码，获取所有变量的声明（也就是感知其存在，但是没值），然后再一行一行地运行。\n\n这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。\n\n如果换成let，程序会直接报错，而不是undefined\n\n## 1.3标识符\n\n标识符（identifier）指的是用来识别各种值的合法名称。最常见的标识符就是变量名，以及后面要提到的函数名\n\n简单说，标识符命名规则如下。\n\n- 第一个字符，可以是任意 Unicode 字母（包括英文字母和其他语言的字母），以及美元符号（`$`）和下划线（`_`）。\n- 第二个字符及后面的字符，除了 Unicode 字母、美元符号和下划线，还可以用数字`0-9`。\n\n也就意味着可以用中文^_^\n\n## 1.4注释\n\n源码中被 JavaScript 引擎忽略的部分就叫做注释，它的作用是对代码进行解释。JavaScript 提供两种注释的写法：一种是单行注释，用`//`起头；另一种是多行注释，放在`/*`和`*/`之间。\n\n此外，由于历史上 JavaScript 可以兼容 HTML 代码的注释，所以`<!--`和`-->`也被视为合法的单行注释。\n\n需要注意的是，`-->`只有在行首，才会被当成单行注释，否则会当作正常的运算。\n\n```plain\nx = 1; <!-- x = 2;\n --> x = 3;\n```\n\n## 1.5区块\n\nJavaScript 使用大括号，将多个相关的语句组合在一起，称为“区块”（block）。\n\n在 JavaScript 语言中，单独使用区块并不常见，区块往往用来构成其他更复杂的语法结构，比如`for`、`if`、`while`、`function`等。\n\n对于`var`命令来说，JavaScript 的区块不构成单独的作用域（scope）。也就是说，定义在大括号内的var依旧是可用的\n\n## 1.6条件语句\n\nJavaScript 提供`if`结构和`switch`结构，完成条件判断，即只有满足预设的条件，才会执行相应的语句。\n\nJavaScript 还有一个三元运算符（即该运算符需要三个运算子）`?:`，也可以用于逻辑判断。\n\n需要注意的是，`switch`语句后面的表达式，与`case`语句后面的表示式比较运行结果时，采用的是严格相等运算符（`===`），而不是相等运算符（`==`），这意味着比较时不会发生类型转换。\n\n## 1.7循环语句\n\n主要有while和for循环语句，次要的有do...while\n\n## 1.8标签\n\nJavaScript 语言允许，语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置，标签的格式如下。\n\n```plain\nlabel:\n   语句\n```\n\n标签可以是任意的标识符，但不能是保留字，语句部分可以是任意语句。\n\n获得了一个标签，就相当于是拿到了标签最外层环境引用，可以直接跳过或者终止上层执行环境，而不必要从里面开始中止'
	  },
	  {
		id: 7,
		title: "JavaScript基础语法(二)",
		content:'# 二、基本数据类型\n\n| 序号 | 数据类型  | 举例               | 备注             |\n| ---- | --------- | ------------------ | ---------------- |\n| 1    | number    | 整数或小数等字面量 | 实际底层全是小数 |\n| 2    | string    |                    |                  |\n| 3    | boolean   |                    |                  |\n| 4    | Symbol    |                    | ES6              |\n| 5    | BigInt    |                    | ES6              |\n| 6    | object    |                    |                  |\n| 7    | undefined |                    |                  |\n| 8    | null      |                    |                  |\n\n## 2.1基本介绍\n\n通常，数值、字符串、布尔值这三种类型，合称为原始类型（primitive type）的值\n\n对象则称为合成类型（complex type）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。\n\n至于`undefined`和`null`，一般将它们看成两个特殊值。\n\n对象是最复杂的数据类型，又可以分成三个子类型：\n\n**狭义的对象**（object）、**数组**（array）、**函数**（function）\n\n## 2.2类型确定\n\nJavaScript 有三种方法，可以确定一个值到底是什么类型。\n\n- `typeof`运算符\n- `instanceof`运算符\n- `Object.prototype.toString`方法\n\n其中，typrof会将object（字典和数组）和null都当做object\n\ntypeof可以访问未定义的变量而不报错，所以可以用于检测变量是否存在\n\n```javascript\n// 错误的写法\nif (v) {\n  // ...\n}\n// ReferenceError: v is not defined\n\n// 正确的写法\nif (typeof v === \\"undefined\\") {\n  // ...\n}\n```\n\n## 2.3基本方法\n\n（1）parseInt()\n\n`parseInt`方法用于将字符串转为整数。\n\n如果字符串头部有空格，空格会被自动去除。\n\n如果`parseInt`的参数不是字符串，则会先转为字符串再转换。\n\n字符串转为整数的时候，是一个个字符依次转换，如果遇到不能转为数字的字符，就不再进行下去，返回已经转好的部分。\n\n如果字符串的第一个字符不能转化为数字（后面跟着数字的正负号除外），返回`NaN`。\n\n对于那些会自动转为科学计数法的数字，`parseInt`会将科学计数法的表示方法视为字符串，因此导致一些奇怪的结果。\n\n（2）parseFloat()\n\n`parseFloat`方法用于将一个字符串转为浮点数。\n\n其他很多特性和parseInt保持一致\n\n这些特点使得`parseFloat`的转换结果不同于`Number`函数。\n\n```javascript\nparseFloat(true)  // NaN\nNumber(true) // 1\n\nparseFloat(null) // NaN\nNumber(null) // 0\n\nparseFloat(\'\') // NaN\nNumber(\'\') // 0\n\nparseFloat(\'123.45#\') // 123.45\nNumber(\'123.45#\') // NaN\n```\n\n（3）isNaN()\n\n`isNaN`方法可以用来判断一个值是否为`NaN`。\n\n但是，`isNaN`只对数值有效，如果传入其他值，会被先转成数值。比如，传入字符串的时候，字符串会被先转成`NaN`，所以最后返回`true`，这一点要特别引起注意。\n\n也就是说，`isNaN`为`true`的值，有可能不是`NaN`，而是一个字符串。\n\n（4）isFinite()\n\n`isFinite`方法返回一个布尔值，表示某个值是否为正常的数值。\n\n除了`Infinity`、`-Infinity`、`NaN`和`undefined`这几个值会返回`false`，对于其他的数值都会返回`true`。',
	  },

	  {
		id: 8,
		title: "JavaScript基础语法(六)",
		content:'# 六、函数\n\n## 6.1函数的声明\n\n函数有三种声明方式：function命令、函数表达式和Function构造函数\n\n```javascript\n// 形式1\nfunction print(s) {\n  console.log(s);\n}\n\n// 形式2\nvar print = function(s) {\n  console.log(s);\n};\n\n// 形式3\nvar add = new Function(\n  \'x\',\n  \'y\',\n  \'return x + y\'\n);\n// 等同于\nfunction add(x, y) {\n  return x + y;\n}\n```\n\n`Function`构造函数可以不使用`new`命令，返回结果完全一样。\n\n## 6.2函数的本质\n\nJavaScript 语言将函数看作一种值，与其它值（数值、字符串、布尔值等等）地位相同。凡是可以使用值的地方，就能使用函数。\n\n比如，可以把函数赋值给变量和对象的属性，也可以当作参数传入其他函数，或者作为函数的结果返回。\n\n函数只是一个可以执行的值，此外并无特殊之处。\n\n函数本身也是一个值，也有自己的作用域。它的作用域与变量一样，就是其声明时所在的作用域，与其运行时所在的作用域无关。\n\n函数执行时所在的作用域，是定义时的作用域，而不是调用时所在的作用域。\n\n## 6.3传值方式\n\n函数参数如果是原始类型的值（数值、字符串、布尔值），传递方式是传值传递（passes by value）。\n\n这意味着，在函数体内修改参数值，不会影响到函数外部。\n\n如果函数参数是复合类型的值（数组、对象、其他函数），传递方式是传址传递（pass by reference）。\n\n也就是说，传入函数的原始值的地址，因此在函数内部修改参数，将会影响到原始值。\n\n注意，如果函数内部修改的，不是参数对象的某个属性，而是替换掉整个参数，这时不会影响到原始值。\n\n## 6.4闭包\n\n前面提到，JavaScript 有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。\n\n如果出于种种原因，需要**得到函数内的局部变量**。正常情况下，这是办不到的，只有通过变通方法才能实现。那就是在函数的内部，再定义一个函数。\n\n闭包就是能够读取其他函数内部变量的函数。\n\n由于在 JavaScript 语言中，只有函数内部的子函数才能读取内部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。\n\n（1）闭包最大的特点，就是它可以“记住”诞生的环境！\n\n（2）闭包可以看作是函数内部作用域的一个接口。',
	  },
	  {
		id: 9,
		title: "JavaScript基础语法(七)",
		content:'# 七、数组\n\n数组（array）是按次序排列的一组值。每个值的位置都有编号（从0开始），整个数组用方括号表示。\n\n## 7.1数组的本质\n\n本质上，数组属于一种特殊的对象。`typeof`运算符会返回数组的类型是`object`。数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串。\n\n\n\n## 7.2数组的长度\n\nJavaScript 使用一个32位整数，保存数组的元素个数。这意味着，数组成员最多只有 4294967295 个（232 - 1）个，也就是说`length`属性的最大值就是 4294967295。\n\n`length`属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员数量会自动减少到`length`设置的值，多余的元素会被删除。当`length`属性设为大于数组个数时，读取新增的位置都会返回`undefined`。\n\n由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响`length`属性的值。\n\n## 7.2数组的遍历\n\n数组有如下几种遍历方法：for循环、for...in 遍历、forEach\n\n如果数组的某个位置元素为空，则forEach、for...in 遍历、Object.keys方法都会直接跳过该位置\n\n注意：空位就是数组没有这个元素，所以不会被遍历到，而`undefined`则表示数组有这个元素，值是`undefined`，所以遍历不会跳过。',
	  },
	  {
		id: 10,
		title: "JavaScript基础语法(八)",
		content:'# 八、运算符\n\n运算符是处理数据的基本方法，用来从现有的值得到新的值。JavaScript 提供了多种运算符，覆盖了所有主要的运算。\n\n大体分为：**算数运算符**、**比较运算符**、**布尔运算符**和**二进制运算符**。\n\n其他的还有：void运算符和逗号运算符\n\n## 8.1算数运算符\n\nJavaScript 共提供10个算术运算符，用来完成基本的算术运算。减法、乘法、除法运算法比较单纯，就是执行相应的数学运算。重点是加法运算符。\n\n### 8.1.1运算规则\n\n（1）对于加法运算符\n\n加法运算符是在运行时决定，到底是执行相加，还是执行连接。也就是说，运算子的不同，导致了不同的语法行为，这种现象称为“重载”（overload）。\n\n数值和布尔值和字符串相加会被拼接，变成字符串\n\n而数值和数值相加会直接运算\n\n运算顺序从左到右执行，遵循优先级，但是指数运算符是从右到左。\n\n（2）对于其他运算符\n\n其他算术运算符（比如减法、除法和乘法）都不会发生重载。它们的规则是：所有运算子一律转为数值，再进行相应的数学运算。\n\n### 8.1.2对象的加法\n\n如果运算子是对象，必须先转成原始类型的值，然后再相加。\n\n那么如何将非原始类型转成原始类型的值呢？？？\n\n首先，自动调用对象的`valueOf`方法。这时再自动调用对象的`toString`方法，将其转为字符串。\n\nPS:如果valueOf就是原始类型，那么则不会调用toString\n\n如果运算子是Date实例，那么执行顺序会进行翻转\n\n### 8.1.3数值运算符和负数值运算符\n\n数值运算符（`+`）同样使用加号，但它是一元运算符（只需要一个操作数）。作用在于可以将任何值转为数值（与`Number`函数的作用相同）\n\n负数值运算符（`-`），也同样具有将一个值转为数值的功能，只不过得到的值正负相反。\n\n连用两个负数值运算符，等同于数值运算符。\n\n## 8.2比较运算符\n\n比较运算符用于比较两个值的大小，然后返回一个布尔值，表示是否满足指定的条件。\n\nJavaScript 一共提供了8个比较运算符。这八个比较运算符分成两类：**相等比较**和**非相等比较**。两者的规则是不一样的，对于非相等的比较，算法是先看两个运算子是否都是字符串，如果是的，就按照字典顺序比较（实际上是比较 Unicode 码点）；否则，将两个运算子都转成数值，再比较数值的大小。\n\n比较运算符可以比较各种类型的值，不仅仅是数值。\n\n### 8.2.1非相等运算符\n\n（1）字符串之间的比较\n\nJavaScript 引擎内部首先比较首字符的 Unicode 码点。如果相等，再比较第二个字符的 Unicode 码点，以此类推。\n\n由于所有字符都有 Unicode 码点，因此汉字也可以比较。\n\n（2）非字符串之间的比较\n\n如果两个运算子之中，至少有一个不是字符串，需要分成以下两种情况。\n\n两个运算子都是原始类型：先转换成数值再比较\n\n其中一个及以上不是原始类型：如果运算子是对象，会转为原始类型的值，再进行比较。和之前加法类似，首先调用valueOf方法，如果得到的结果还不是原始类型，那么就再调用toString\n\n### 8.2.2相等运算符\n\n相等运算符分为`==`和`===`,其中双等于只比较数值，全等于还会额外校验类型是否相等\n\n两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个地址。\n\n`undefined`和`null`与自身严格相等。\n\n## 8.3布尔运算符\n\n布尔运算符用于将表达式转为布尔值，一共包含四个运算符。\n\n其拥有短路机制，多个表达式全部通过时，返回最后一个表达式的值\n\n## 8.4二进制位运算符\n\n二进制位运算符用于直接对二进制位进行计算，一共有7个。\n\n即，或(|)、与(&)、否(~)、异或(^)、左移(<<)、右移(>>)、头部补零的右移运算符(>>>)\n\n在 JavaScript 内部，数值都是以64位浮点数的形式储存，但是做位运算的时候，是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数。\n\n可以对0进行或操作，获取对应数字的32位的整数部分\n\n也可以对一个小数进行两次取反操作，也可以得到对应数字的32位的整数部分\n\n也可以对一个小数左移或者右移0位，获取一个32位的整数',
	  },
	  {
		id: 11,
		title: "JavaScript基础语法(十一)",
		content:'# 十一.DOM\n\n## 11.1DOM概述\n\nDOM 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作\n\n浏览器会根据 **DOM 模型**，将结构化文档（比如 HTML 和 XML）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的**对外接口**。\n\nDOM 只是一个接口规范，可以用各种语言实现。\n\n节点有七种类型,每种类型都是原生的节点对象Node的子对象,其对应的枚举值如下:\n\n| 序号 | 类型             | 含义                                 | DOM类型值 | Node枚举常量                |\n| ---- | ---------------- | ------------------------------------ | --------- | --------------------------- |\n| 1    | Document         | 整个文档树的顶层节点，代表整个文档。 | 9         | Node.DOCUMENT_NODE          |\n| 2    | DocumentType     | doctype标签（比如<!DOCTYPE html>）   | 10        | Node.ELEMENT_NODE           |\n| 3    | Element          | 网页的各种HTML标签                   | 1         | Node.ATTRIBUTE_NODE         |\n| 4    | Attr             | 网页元素的属性                       | 2         | Node.TEXT_NODE              |\n| 5    | Text             | 标签之间或标签包含的文本             | 3         | Node.DOCUMENT_FRAGMENT_NODE |\n| 6    | Comment          | 注释                                 | 8         | Node.DOCUMENT_TYPE_NODE     |\n| 7    | DocumentFragment | 文档的片段                           | 11        | Node.COMMENT_NODE           |\n\n一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 DOM 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，又像一棵树。\n\n文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 HTML 网页的顶层容器标签`<html>`。\n\n## 11.2Node对象原型接口\n\n### 11.2.1Node.prototype.nodeType\n\n用于判断节点的类型,主要类型见上一节\n\n### 11.2.2Node.prototype.nodeName\n\n`nodeName`属性返回节点的名称。\n\n| 序号 | 类型             | 含义         | 节点名称           | 备注 |\n| ---- | ---------------- | ------------ | ------------------ | ---- |\n| 1    | document         | 文档节点     | #document          |      |\n| 2    | element          | 元素节点     | 大写的标签名       |      |\n| 3    | attr             | 属性节点     | 属性的名称         |      |\n| 4    | text             | 文本节点     | #text              |      |\n| 5    | DocumentFragment | 文档片断节点 | #document-fragment |      |\n| 6    | DocumentType     | 文档类型节点 | 文档的类型         |      |\n| 7    | Comment          | 注释节点     | #comment           |      |\n\n### 11.2.3Node.prototype.nodeValue\n\n`nodeValue`属性返回一个字符串，表示当前节点本身的文本值，该属性可读写。\n\n只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，其他类型的节点一律返回`null`。\n\n也只有这三类节点可以设置`nodeValue`属性的值，其他类型的节点设置无效。\n\n### 11.2.4Node.prototype.textContent\n\n`textContent`属性,自动忽略当前节点内部的 HTML 标签,返回当前节点和它的所有后代节点的文本内容。\n\n该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。\n\n自动对 HTML 标签转义。这很适合用于用户提供的内容,因为这样可以防止XSS。\n\n对于文本节点（text）、注释节点（comment）和属性节点（attr），`textContent`属性的值与`nodeValue`属性相同。文档节点（document）和文档类型节点（doctype）的`textContent`属性为`null`。\n\n如果要读取整个文档的内容，可以使用`document.documentElement.textContent`。\n\n### 11.2.5Node.prototype.baseURI\n\n`baseURI`属性返回一个字符串，表示当前网页的绝对路径。浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读。\n\n该属性的值一般与当前网址的 URL（即`window.location`属性）保持一致，但是可以使用 HTML 的`<base>`标签，改变baseURI属性的值。\n\n### 11.2.6Node.prototype.ownerDocument\n\n`Node.ownerDocument`属性返回当前节点所在的顶层文档对象，即`document`对象。\n\n`document`对象本身的`ownerDocument`属性，返回`null`。\n\n### 11.2.7Node.prototype.nextSibling\n\n`Node.nextSibling`属性返回紧跟在当前节点后面的第一个同级节点。\n\n如果当前节点后面没有同级节点，则返回`null`。\n\n### 11.2.8Node.prototype.previousSibling\n\n`previousSibling`属性返回当前节点前面的、距离最近的一个同级节点。\n\n如果当前节点前面没有同级节点，则返回`null`。\n\n### 11.2.9Node.prototype.parentNode\n\n`parentNode`属性返回当前节点的父节点。\n\n对于一个节点来说，它的父节点只可能是三种类型：**元素节点**（element）、**文档节点**（document）和**文档片段节点**（documentfragment）。\n\n文档节点（document）和文档片段节点（documentfragment）的父节点都是`null`。\n\n那些生成后还没插入 DOM 树的节点，父节点也是`null`。\n\n### 11.2.10Node.prototype.parentElement\n\n`parentElement`属性返回当前节点的父元素节点。\n\n如果当前节点没有父节点，或者父节点类型不是元素节点，则返回`null`。\n\n`parentElement`属性相当于把文档节点（document）和文档片段节点（documentfragment）都排除了。\n\n### 11.2.11Node.prototype.firstChild和Node.prototype.lastChild\n\n`firstChild`属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回`null`。\n\n`lastChild`属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回`null`。\n\n### 11.2.12Node.prototype.childNodes\n\n`childNodes`属性返回一个类似数组的对象（`NodeList`集合），成员包括当前节点的所有子节点。\n\n`NodeList`对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。\n\n### 11.2.13Node.prototype.isConnected\n\n`isConnected`属性返回一个布尔值，表示当前节点是否在文档之中。\n\n## 11.3dom方法\n\n### 11.3.1Node.prototype.appendChild()\n\n`appendChild()`方法接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。\n\n返回值就是被插入文档的那个节点。\n\n如果参数节点是 DOM 已经存在的节点，`appendChild()`方法会将其从原来的位置，移动到新位置。\n\n果`appendChild()`方法的参数是`DocumentFragment`节点，那么插入的是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值是一个空的`DocumentFragment`节点。\n\n### 11.3.2Node.prototype.hasChildNodes()\n\n`hasChildNodes`方法返回一个布尔值，表示当前节点是否有子节点,没有参数。\n\n注意，子节点包括所有类型的节点，并不仅仅是元素节点。哪怕节点只包含一个空格，`hasChildNodes`方法也会返回`true`。\n\n判断一个节点有没有子节点，有许多种方法，下面是其中的三种。\n\n- `node.hasChildNodes()`\n- `node.firstChild !== null`\n- `node.childNodes && node.childNodes.length > 0`\n\n### 11.3.3Node.prototype.cloneNode()\n\n`cloneNode`方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点。\n\n该方法有一些使用注意点。\n\n（1）克隆一个节点，会拷贝该节点的所有属性，但是会丧失`addEventListener`方法和`on-`属性（即`node.onclick = fn`），添加在这个节点上的事件回调函数。\n\n（2）该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如`Node.appendChild`这样的方法添加到文档之中。\n\n（3）克隆一个节点之后，DOM 有可能出现两个有相同`id`属性（即`id=\\"xxx\\"`）的网页元素，这时应该修改其中一个元素的`id`属性。如果原节点有`name`属性，可能也需要修改。\n\n### 11.3.4Node.prototype.insertBefore()\n\n`insertBefore`方法用于将某个节点插入父节点内部的指定位置。\n\n`insertBefore`方法接受两个参数，第一个参数是所要插入的节点`newNode`，第二个参数是**父节点**`parentNode`内部的一个子节点`referenceNode`。`newNode`将插在`referenceNode`这个子节点的前面。返回值是插入的新节点`newNode`。\n\n如果`insertBefore`方法的第二个参数为`null`，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点。\n\n注意，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。\n\n不存在`insertAfter`方法,可以用`insertBefore`方法结合`nextSibling`属性模拟。\n\n如果要插入的节点是`DocumentFragment`类型，那么插入的将是`DocumentFragment`的所有子节点，而不是`DocumentFragment`节点本身。返回值将是一个空的`DocumentFragment`节点。\n\n### 11.3.5Node.prototype.removeChild()\n\n`removeChild`方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。\n\n被移除的节点依然存在于内存之中，但不再是 DOM 的一部分。\n\n所以，一个节点移除以后，依然可以使用它，比如插入到另一个节点下面。\n\n### 11.3.6Node.prototype.replaceChild()\n\n`replaceChild`方法用于将一个新的节点，替换当前节点的某一个子节点。\n\n`replaceChild`方法接受两个参数，第一个参数`newChild`是用来替换的新节点，第二个参数`oldChild`是将要替换走的子节点。\n\n返回值是替换走的那个节点`oldChild`。\n\n### 11.3.7Node.prototype.contains()\n\n`contains`方法返回一个布尔值，用于检测某个节点是否在当前节点的子孙里面,表示参数节点是否满足以下三个条件之一:\n\n- 参数节点为当前节点。\n- 参数节点为当前节点的子节点。\n- 参数节点为当前节点的后代节点。\n\n### 11.3.8Node.prototype.compareDocumentPosition()\n\n`compareDocumentPosition`方法的用法，与`contains`方法完全一致，但是返回一个六个比特位的二进制值，表示参数节点与当前节点的关系。\n\n| 序号 | 二进制 | 数值 | 含义                                         | 备注 |\n| ---- | ------ | ---- | -------------------------------------------- | ---- |\n| 1    | 000000 | 0    | 两个节点相同                                 |      |\n| 2    | 000001 | 1    | 两个节点不在同一个文档                       |      |\n| 3    | 000010 | 2    | 参数节点在当前节点的前面                     |      |\n| 4    | 000100 | 4    | 参数节点在当前节点的后面                     |      |\n| 5    | 001000 | 8    | 参数节点包含当前节点                         |      |\n| 6    | 010000 | 16   | 当前节点包含参数节点                         |      |\n| 7    | 100000 | 32   | 没有关系，或是两个节点在同一元素的两个属性。 |      |\n\n### 11.3.9Node.prototype.isEqualNode()，Node.prototype.isSameNode()\n\n`isEqualNode`方法返回一个布尔值，用于检查两个节点的类型相同、属性相同、子节点是否相同。\n\n`isSameNode`方法返回一个布尔值，表示两个节点是否为同一个节点\n\n### 11.3.10Node.prototype.normalize()\n\n`normalize`方法用于清理当前节点内部的所有文本节点（text）。\n\n它会去除空的文本节点，并且将相邻的文本节点合并成一个,由dom对象主动调用,原地函数\n\n该方法是`Text.splitText`的逆方法\n\n### 11.3.11Node.prototype.getRootNode()\n\n`getRootNode()`方法返回当前节点所在文档的根节点`document`，与`ownerDocument`属性的作用相同。\n\n但是该方法在document本身调用的时候.会返回自己\n\n而`ownerDocument`则会返回null',
	  },
	  
		  
  ];

const shits = [
	{
		'id': 1,
		'title': '永雏塔菲',
		'avatar': 'http://www.qidong.tech/yctf.jpg',
		'text': 'Bilibili虚拟偶像,英文名为Taffy,故称塔菲.二次元浓度++...',
	},
	{
		'id': 2,
		'title': '我是奶龙',
		'avatar': 'http://www.qidong.tech:5173/resource/undefined.jpg',
		'text': '诞生于深圳的奶龙,以其呆萌的形象与魔性的鬼畜,迅速走红...',
	},
	{
		'id': 3,
		'title': '尖尖哇嘎乃',
		'avatar': 'http://www.qidong.tech:5173/resource/xiaoba.png',
		'text': '日漫吉伊卡娃中的台词,意为什么都不知道啊,配合小八不太聪明的样子迅速走红...',
	},
	{
		'id': 4,
		'title': '奶龙',
		'avatar': 'http://www.qidong.tech/yctf.jpg',
		'text': '我是奶龙,我是奶龙,我是最强奶龙。',
	},
	{
		'id': 5,
		'title': '奶龙',
		'avatar': 'http://www.qidong.tech/yctf.jpg',
		'text': '我是奶龙,我是奶龙,我是最强奶龙。',
	},
	{
		'id': 6,
		'title': '奶龙',
		'avatar': 'http://www.qidong.tech/yctf.jpg',
		'text': '我是奶龙,我是奶龙,我是最强奶龙。',
	},
	
	

] 
import AboutAuthor from "./routes/normal/AboutAuthor.tsx"
import AboutProject from "./routes/normal/AboutProject.tsx"
import ConcatMe from "./routes/normal/ConcatMe.tsx"
import FindShit from "./routes/normal/FindShit.tsx"
import FriendChain from "./routes/normal/FriendChain.tsx";
import FrontSource from "./routes/normal/FrontSource.tsx";
import { WindowSizeProvider } from "./utils/windowContext/win.tsx";


createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter >
			<Provider store={globalStore}>
				<PersistGate loading={null} persistor={persistor}>
					<WindowSizeProvider>
						<div className="layout">
							<header className="header" style={{}}>
								<TopMenu></TopMenu>
							</header>
							<main  className="content" style={{minHeight: "90vh",maxHeight: "90vh", overflow:"auto",backgroundColor:'darkgray'}}>
									{/* <App /> */}
									{/* <RouterProvider router={router} /> */}
									<div style={{maxWidth:'800px',margin:'auto',}}>
										<Routes>
											<Route path="/" element={<Home articles={articles} />} />
											<Route path="/home" element={<Home articles={articles} />} />
											<Route path="/article" element={<Article />} />
											<Route path="/find-shit" element={<FindShit celebrityList={shits} />} />
											<Route path="/about-project" element={<AboutProject />} />
											{/* <Route path="/about-author" element={<AboutAuthor />} /> */}
											<Route path="/concat-me" element={<ConcatMe />} />
											{/* 新增两个模块的路由映射 */}
											<Route path="/front-source" element={<FrontSource />} />
											<Route path="/friend-chain" element={<FriendChain />} />
											
										</Routes>
									</div>
									<FloatButton.BackTop />
							</main>
							<footer className="footer" style={{minHeight: "10vh"}}>
								<FooterCopyright></FooterCopyright>
							</footer>
						</div>
					</WindowSizeProvider>
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
