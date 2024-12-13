import { FC, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Root from "./routes/root.tsx";
import NavTest from "./routes/navTest.tsx";
import ShowState from "./routes/showState.tsx";
import ShowDemo from "./routes/demo.tsx";
import Login from "./routes/login.tsx";

import "./index.css";

// 注入redux缓存
import { Provider } from "react-redux";

// redux
// import GlobalStore from "./store/global/store.tsx";
// import DemoStore from "./store/demo/store.tsx";
import globalStore from "./store/store.tsx";

// import TestStore from "./store/test/store.tsx";
// 添加路由
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Login />,
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
		<Provider store={globalStore}>
			{/* <App /> */}
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
