import { useState, FC } from "react";
import { Link } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// 添加组件库
import { Button } from "antd";

const App: FC = () => {
	const [count, setCount] = useState<number>(0);
	function handleClick() {
		setCount(count + 1);
	}
	return (
		<>
			<div>岁月诗史</div>
			<p className="read-the-docs">劉啓東's BLOG (⊙o⊙)？</p>
			<div>
				<p>刘启东的岁数：{count}</p>
				<Button type="primary" onClick={handleClick}>
					点我加一岁
				</Button>
			</div>
			<div>
				<Link to="/"> 点我跳转到主页</Link>
			</div>
		</>
	);
};

export default App;
