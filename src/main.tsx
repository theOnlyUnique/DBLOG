import { FC, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Root from "./routes/root.tsx";
import NavTest from "./routes/navTest.tsx";
import ShowState from "./routes/showState.tsx";
import ShowDemo from "./routes/demo.tsx";
import Login from "./routes/login.tsx";
import Home from "./routes/Home.tsx";
import FooterCopyright from "./routes/FooterCopyRight.tsx";
import "./index.css";

// 注入redux缓存
import { Provider } from "react-redux";

// redux
// import GlobalStore from "./store/global/store.tsx";
// import DemoStore from "./store/demo/store.tsx";
// import globalStore from "./store/store.tsx";
import { globalStore, persistor } from './store/store'; // 引入刚才创建的 store

// import TestStore from "./store/test/store.tsx";
// 添加路由
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
  ];
  
  export default articles;
const router = createBrowserRouter([
	{
		path: "/",
		element: <Home articles={articles} />,
	},
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
		<div className="layout">
			<header className="header" style={{minHeight: "10vh"}}>
				<TopMenu></TopMenu>
			</header>
			<main className="content" style={{minHeight: "80vh"}}>
				<Provider store={globalStore}>
					<PersistGate loading={null} persistor={persistor}>
						{/* <App /> */}
						<RouterProvider router={router} />
						<FloatButton.BackTop />
					</PersistGate>
				</Provider>
			</main>
			<footer className="footer" style={{minHeight: "10vh"}}>
				<FooterCopyright></FooterCopyright>
			</footer>
		</div>
	</StrictMode>
);
