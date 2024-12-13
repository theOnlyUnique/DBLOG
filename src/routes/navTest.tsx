import { useState } from "react";
import { Input, Button } from "antd";
import { /*Link*/ useNavigate } from "react-router-dom";
export default function NavTest() {
	// 实例化路由对象
	const navigate = useNavigate();
	const [message, setMsg] = useState("");
	function handleChange(e: any) {
		console.log("数据改变", e.target.value);
		setMsg(e.target.value);
	}

	function jumpNav() {
		// useNavigate是类似于Linux的，如果不加/ ，那么就是相对路径
		// replace: true 将顶部元素替换为/{message}
		navigate("/" + message, { replace: true });
		// navigate(-1);  // 回退到栈的上一个元素
		// navigate("/" + message); // 跳转到/{message} 里面，并且在栈的末尾追加该路由
	}
	return (
		<>
			<div>导航测试</div>
			<Input value={message} onChange={handleChange} />
			{/* <Link to={'/' + message}> 点我送你去： /{message}</Link> */}
			<Button onClick={jumpNav}>点我送你去： /{message}</Button>
		</>
	);
}
