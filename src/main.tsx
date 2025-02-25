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
	{
	  id: 1,
	  title: "React入门教程",
	  content: `
		# 什么是React？
		React是一个用于构建用户界面的JavaScript库，特别适合单页应用（SPA）。
		## 核心特性
		- 组件化开发
		- 虚拟DOM优化性能
		- 声明式编程
	  `,
	},
	{
		id: 2,
		title: "JavaScript基础语法",
		content: `
		  ## 变量声明
		  let x = 1; // 可变
		  const y = 2; // 不可变
		  ## 函数
		  function add(a, b) {
			  return a + b;
		  }
		`,
	  },
	  {
		id: 3,
		title: "JavaScript基础语法",
		content:"![](https://cdn.prod.website-files.com/65943d23dc44e6ce92eb6b67/65fc9f534c1398dac499304d_commercial_search-p-800.jpg)",
	  },
	  {
		id: 4,
		title: "JavaScript基础语法",
		content: `
		  ## 变量声明
		  let x = 1; // 可变
		  const y = 2; // 不可变
		  ## 函数
		  function add(a, b) {
			  return a + b;
		  }
		`,
	  },
	  {
		id: 5,
		title: "JS输出题",
		content: '"### 1.变量提升\n\n```javascript\nfunction() {\n    console.log(a);\n    var a = 1;\n    function a(){};\n    console.log(a);\n}\n```\n\n因为var和function都会进行变量提升，但是函数的提升优先，而且会将值进行提升\n\n但是var只会提升声明，赋值仍旧是在代码行所在位置\n\n当然，本例中js并不允许匿名函数直接执行，此时报错：SyntaxError: Function statements require a function name\n\n加上()变成匿名语句后调用()直接执行\n\n### 2.for in 操作符\n\n```javascript\nvar arr = [1,2,,4]\nfor(const item in arr){\n    console.log(item);\n}\n```\n\nfor in 操作符将数组对象自身的所有可枚举键直接打印出来\n\n（可以使用Array.prototype直接定义一个属性，\n\n也可以使用Object.defineProperty）\n\n所以这里不是输出值，而是输出可枚举的键，也就是0,1,3\n\n### 3.delete操作符\n\n见14\n\n### 4.鼠标的触发事件\n\n主要有：contextmenu（右键点击）、click、dblclick（左键双击）、mousedown、mouseout（鼠标移出边界） 、mouseover（鼠标移出到另一个元素）、mouseup（松开任意左右键）、mousemove（鼠标放置在某个元素）\n\n### 5.for...of操作符\n\n```javascript\nvar arr = [1,2,,4]\nfor(const item of arr){\n    console.log(item);\n}\n该操作符打印出数组的所有值，如果为empty，则显示未undefined\n```\n\n### 6.加法操作\n\n```javascript\nvar s = [\'1\',2,3].map((item) => item +1)\nconsole.log(s);\n```\n\n### 7.every操作符\n\n```javascript\n[].every( item => !item)\n```\n\n- 如果数组中所有元素都通过了回调函数的测试，则返回 `true`。\n- 如果有任何一个元素未通过测试，则返回 `false`。\n- 如果数组为空，则返回 `true`。\n\n### 8.Object.assign()\n\n```javascript\nconst obj1 = {\n    \'name\' :\'AAA\',\n}\nconst obj2 = {\n    \'id\': \'id0\',\n    \'name\' :\'BBB\',\n}\nconst obj3 = Object.assign(obj1,obj2, {\n    \n    \'name\' :\'CCC\',\n})\n\nconsole.log(obj1,obj2,obj3);\n```\n\n`Object.assign()` 是 JavaScript 中用于将所有可枚举属性从一个或多个源对象复制到目标对象的方法。它通常用于对象的浅拷贝、合并对象以及添加或覆盖对象的属性。\n\n```plain\nObject.assign(target, ...sources)\n```\n\n- **target**：目标对象，即要将属性复制到的对象。\n- **sources**：一个或多个源对象，其可枚举属性将被复制到目标对象。\n\n 返回目标对象。\n\n### 9.parseInt陷阱\n\n```javascript\nvar s = [\'1\',\'2\',\'3\'].map(parseInt)\n\nconsole.log(s);\n```\n\n这里面的parseInt实际上在map给定的三个参数(value,index,arr)中，那前两个值当做输入了\n\n想要达到效果应该使用Number构造函数，因为他只接受一个参数\n\n### \n\n### 11.三等号运算符\n\n```javascript\nconsole.log([] === []);\n```\n\n当 ===比较的是对象时，机会比较他们的地址，而非实际值\n\n但是基础类型是比较值\n\n### 12.Object.keys()方法\n\n`Object.keys()` 方法不会遍历出对象原型链上的属性。它只会返回一个数组，包含对象自身的（非继承的）所有可枚举属性的属性名。\n\n### 13.forEach中途插入值\n\n```javascript\nconst items = [1,2,3,4]\nitems.forEach( (item,index) => {\n    if (item === 3) {\n        items.splice(index,0,5);\n    }\n    console.log(item);\n})\n```\n\n很恶心\n\n### 14.delete的用法\n\n```javascript\nvar a = 1;\nb = 2;\nlet c = 3;\nconst d = 4;\n\nlet aaa = {\n    \'666\': 1\n}\nconsole.log(delete a);\nconsole.log(delete b);\nconsole.log(delete c);\nconsole.log(delete d);\nconsole.log(aaa);\n\nconsole.log(delete aaa[\'666\']);\nconsole.log(aaa);\n```\n\ndelete删除不存在的属性，返回true\n\n在成功删除时，它也将返回 `true`，否则将返回 `false`\n\n任何使用 [var](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var) 声明的属性不能从全局作用域或函数的作用域中删除，即使它们可能附加到[全局对象](https://developer.mozilla.org/zh-CN/docs/Glossary/Global_object)上，因为它们是不可配置的\n\n任何使用 [let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 或 [const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 声明的属性不能够从它被声明的作用域中删除，因为它们没有附加到任何对象上。\n\n### 15.找出代码中出现次数最多的字符\n\n```javascript\nfunction getMostFrequentChar(str) {\n    const charMap = new Map();\n\n    // 统计每个字符的出现次数\n    for (const char of str) {\n        charMap.set(char, (charMap.get(char) || 0) + 1);\n    }\n\n    let maxCount = 0;\n    let mostFrequentChar = \'\';\n\n    // 遍历 Map 找到出现次数最多的字符\n    for (const [char, count] of charMap) {\n        if (count > maxCount) {\n            maxCount = count;\n            mostFrequentChar = char;\n        }\n    }\n\n    return { total: str.length, character: mostFrequentChar, count: maxCount };\n}\n\n// 示例用法\nconst input = \\"hello world!\\";\nconst result = getMostFrequentChar(input);\n\nconsole.log(`总字符数: ${result.total}`);\nconsole.log(`出现次数最多的字符: \'${result.character}\'`);\nconsole.log(`出现次数: ${result.count}`);\n```\n\n使用Map类的get和set解决，并使用for of遍历map\n\n### 16.对象当做键名\n\n```javascript\nvar a = {}\nvar b = {\n    \'key\': \'b\'\n}\nvar c = {\n    \'key\': \'c\'\n}\na[b] = 123\na[c] = 456\n\nconsole.log(a[b]);\n```\n\n如果使用一个对象当做键名，那么会调用该对象的提toString()方法的结果当做key\n\n通常，普通对象的toString方法，得到的都是\\"object Object\\"\n\n### 17.赋值表达式的返回值\n\n```javascript\nlet a;\nconsole.log(a = 3);\nconsole.log(var b = 3); \n```\n\n赋值表达式，返回被赋值变量所代表的值\n\n### 18.var和let定义循环变量的区别\n\n```javascript\nfor (var i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 1)\n  }\n  \n  for (let i = 0; i < 3; i++) {\n    setTimeout(() => console.log(i), 1)\n  }\n  \n```\n\n### 19.箭头函数和常规函数的this指向\n\n```javascript\nconst shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2\n  },\n  perimeter: () => 2 * Math.PI * this.radius\n}\n\nshape.diameter()\nshape.perimeter()\n```\n\n如果一定要使用箭头函数,可以做成立即执行函数,并bind一个this进去\n\n```javascript\nconst objs = {\n    name: \'nihao\',\n    // that: this,\n    getName() {\n        return this.name\n    },\n    getOtherName: function() {\n        return (() =>this.name).bind(this)()\n    }\n}\n\nconsole.log(objs.getName());\nconsole.log(objs.getOtherName());\n```\n\n### 20.对象直接赋值的行为\n\n```javascript\nlet a = {\n    \\"small\\":0,\n}\nlet b;\nb = a;\nconsole.log(a === b);\nconsole.log(a.small === b.small);\n```\n\n### 21.模板字面量传值\n\n```javascript\nfunction getPersonInfo(one, two, three) {\n  console.log(one)\n  console.log(two)\n  console.log(three)\n}\n\nconst person = \'Lydia\'\nconst age = 21\n\ngetPersonInfo`${person} is ${age} years old`\n```\n\n如果使用模板字面量进行传值吗,那么第一个参数总是包含字符串的数组,其它参数才是传递的表达式的值\n\n### 22.作用域部分覆盖\n\n```javascript\n;(() => {\n  let x, y\n  try {\n    throw new Error()\n  } catch (x) {\n    ;(x = 1), (y = 2)\n    console.log(x)\n  }\n  console.log(x)\n  console.log(y)\n})()\n```\n\n这里面在catch当中,只覆盖了x,另一个y依旧是最上层的y的引用\n\n### 23.拓展运算符的用法\n\n```javascript\nconst str = \\"Lydia\\"\nconsole.log(...str);\nconsole.log([...str]);\nconsole.log(...[str]);\n\nfunction test(...arg) {\n    console.log(\'xxxxx\',arg);\n}\n\ntest(str)\n```\n\n### 24.生成器函数\n\n```javascript\nfunction* generator(i) {\n    yield i\n    yield i * 2\n    yield i * 10\n}\n\nconst gen = generator(10)\n\nvar status = gen.next()\nconsole.log(status.value,status.done)\nvar status = gen.next()\nconsole.log(status.value,status.done)\nvar status = gen.next()\nconsole.log(status.value,status.done)\nvar status = gen.next()\nconsole.log(status.value,status.done)\n```\n\n### 25.对象引用\n\n```javascript\nlet person = { name: \'Lydia\' }\nconst members = [person]\nperson = null\n\nconsole.log(members)\n```\n\n### 26.值传递与引用传递\n\n```javascript\nfunction getInfo(member, year) {\n  member.name = \'Lydia\'\n  year = \'1998\'\n}\n\nconst person = { name: \'Sarah\' }\nconst birthYear = \'1997\'\n\ngetInfo(person, birthYear)\n\nconsole.log(person, birthYear)\n```\n\n### 27.数组解构\n\n```javascript\nconst numbers = [1, 2, 3, 4, 5]\nconst [y] = numbers\n\nconsole.log(y)\n```\n\n### 28.yield传递参数\n\n```javascript\nfunction* startGame() {\n  const answer = yield \'Do you love JavaScript?\'\n  if (answer !== \'Yes\') {\n    return \\"Oh wow... Guess we\'re gone here\\"\n  }\n  return \'JavaScript loves you back ❤️\'\n}\n\nconst game = startGame()\nconsole.log(/* 1 */) // Do you love JavaScript?\nconsole.log(/* 2 */) // JavaScript loves you back ❤️\n```\n\n### 29.箭头函数与常规函数的原型区别\n\n```javascript\nfunction giveLydiaPizza() {\n  return \'Here is pizza!\'\n}\n\nconst giveLydiaChocolate = () => \\"Here\'s chocolate... now go hit the gym already.\\"\n\nconsole.log(giveLydiaPizza.prototype)\nconsole.log(giveLydiaChocolate.prototype)\n```\n\n### 30.短路求值特性\n\n```javascript\nconst one = false || {} || null\nconst two = null || false || \'\'\nconst three = [] || 0 || true\n\nconsole.log(one, two, three)\n```\n\n### 1. 逻辑与 (`&&`) 运算符\n\n**行为描述：**\n\n- 如果左侧操作数为“假值”（falsy），则整个表达式返回左侧操作数的值，右侧操作数不会被评估。\n- 如果左侧操作数为“真值”（truthy），则整个表达式返回右侧操作数的值。\n\n### 2. 逻辑或 (`||`) 运算符\n\n**行为描述：**\n\n- 如果左侧操作数为“假值”（falsy），则整个表达式返回右侧操作数的值，左侧操作数不会被评估。\n- 如果左侧操作数为“真值”（truthy），则整个表达式返回左侧操作数的值，右侧操作数不会被评估。\n\n### 31.Promise.resolve()方法\n\n```javascript\nconst p1 = Promise.resolve(117);\nconst p2 = Promise.resolve(p1);\nconst p3 = Promise.resolve(117);\nconsole.log(p1 == p2,p1 === p2,p1 === p3);\n```\n\nPromise.resolve如果传入一个非Promise或者一个非thenable的立即值,则返回一个填充该值的promise对象\n\n如果传入的是一个promise对象.那么就直接返回该对象\n\n\\"非thenable\\" 这个词通常是在讨论 JavaScript 中的 Promises 时使用的。一个 \\"thenable\\" 对象是一个具有 `then` 方法的对象，这个方法允许你为 Promise 链中的下一个步骤注册回调函数。简单来说，\\"thenable\\" 对象是可以被链接到 Promise 链中的对象。\n\n\\"非thenable\\" 则是指那些没有 `then` 方法的对象，它们不能被链接到 Promise 链中。在 JavaScript 中，几乎所有的对象都是非 thenable 的，除非它们显式地实现了 `then` 方法。\n\n### 32.Proxy对象代理下的this指向\n\n```javascript\nconst obj = {\n    flag: \'Jhon\',\n    func: function() {\n        console.log(this);\n        console.log(this.flag);\n    }\n};\nconst p = new Proxy(obj, {});\np.func();\nobj.func();\n```\n\n### 33.请问在严格和非严格模式下，下列 JS 代码最终输出的结果分别是（）\n\n```javascript\nfunction func(a) {\n  console.log(a === arguments[0]);\n  a = 2;\n  console.log(a === arguments[0]);\n};\nfunc(1);\n```\n\n在严格模式下，不论参数如何变化，arguments 对象都不会随之改变\n\n在非严格模式下，命名参数的变化会同步更新到 arguments 对象中，\n\n## 34.执行下列程序，输出结果为（）\n\n```javascript\nvar a = 1;\nfunction fn(){\n    var a = 2;\n    function a(){console.log(3);}\n    return a;\n    function a(){console.log(4);}\n}\nvar b = fn();\nconsole.log(b);\n```\n\n函数的变量提升比var变量更高,所以都会被var覆盖"'

	  }
		  
  ];

const shits = [
	{
		'title': '毒液',
		'avatar': 'http://www.qidong.tech/yctf.jpg',
		'text': '我是毒液,我是毒液,我是最强毒液。',
	},
	{
		'title': '毒液',
		'avatar': 'http://www.qidong.tech/yctf.jpg',
		'text': '我是毒液,我是毒液,我是最强毒液。',
	},
	{
		'title': '毒液',
		'avatar': 'http://www.qidong.tech/yctf.jpg',
		'text': '我是毒液,我是毒液,我是最强毒液。',
	},
	

] 
import AboutAuthor from "./routes/normal/AboutAuthor.tsx"
import AboutProject from "./routes/normal/AboutProject.tsx"
import ConcatMe from "./routes/normal/ConcatMe.tsx"
import FindShit from "./routes/normal/FindShit.tsx"
const router = ([
	{
		path: "/",
		element: <Home articles={articles} />,
	},
	{
		path: "/home",
		element: <Home articles={articles} />,
	},
	{
		path: "/article",
		element: <Article />,
	},
	{
		path: "/find-shit",
		element: <Article />,
	},
	{
		path: "/about-project",
		element: <Article />,
	},
	{
		path: "/about-author",
		element: <Article />,
	},
	/////
	{
		path: "/hello",
		element: <App />,
	},
	{
		path: "/navTest",
		element: <NavTest />,
	},
	{
		path: "/showState",
		element: <ShowState />,
	},
	{
		path: "/demo",
		element: <ShowDemo />,
	},

]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter >
			<Provider store={globalStore}>
				<PersistGate loading={null} persistor={persistor}>
					<div className="layout">
						<header className="header" style={{}}>
							<TopMenu></TopMenu>
						</header>
						<main  className="content" style={{minHeight: "90vh",maxHeight: "90vh",overflow:"auto"}}>
								{/* <App /> */}
								{/* <RouterProvider router={router} /> */}
								<Routes>
									<Route path="/" element={<Home articles={articles} />} />
									<Route path="/home" element={<Home articles={articles} />} />
									<Route path="/article" element={<Article />} />
									<Route path="/find-shit" element={<FindShit celebrityList={shits} />} />
									<Route path="/about-project" element={<AboutProject />} />
									<Route path="/about-author" element={<AboutAuthor />} />
									<Route path="/concat-me" element={<ConcatMe />} />
								</Routes>
								<FloatButton.BackTop />
						</main>
						<footer className="footer" style={{minHeight: "10vh"}}>
							<FooterCopyright></FooterCopyright>
						</footer>
					</div>
					
					
				</PersistGate>
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
