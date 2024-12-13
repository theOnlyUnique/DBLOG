import LoginImg from "../assets/more-leaves.png";
import { Card, Tabs, Input, Button } from "antd";
// 导入表格类型
import type { TabsProps } from "antd";
// 导入图标
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import React from "react";
const loginCSS: React.CSSProperties = {
	position: "relative",
	display: "flex",
	// width: "100vw",
	// height: "100vh",
	// backgroundImage: `url(${LoginImg})`,
	justifyContent: "center",
	// transform: translateX(-50%);
};

const cardCSS: React.CSSProperties = {
	position: "absolute",
	left: "50%",
	// top: "50%",
	transform: "translateX(-50%) translateY(50%)",
	display: "flex",
};

const cardItemCSS: React.CSSProperties = {
	display: "flex",
	minWidth: "10vw",
	maxWidth: "20vw",
	height: "35vh",
	alignItems: "stretch",
};

const tableItems: TabsProps["items"] = [
	{
		key: "1",
		label: "登录",
		children: (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Input
					placeholder="请输入用户名"
					prefix={<UserOutlined></UserOutlined>}
					style={{ marginBottom: "1%" }}
				/>
				<Input
					placeholder="请输入密码"
					prefix={<LockOutlined />}
					style={{ marginBottom: "1%" }}
				/>
				<Button
					onClick={handleLogin}
					style={{ justifyContent: "center" }}
					type="primary"
				>
					点击登录
				</Button>
			</div>
		),
	},
	{
		key: "2",
		label: "注冊",
		children: (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Input
					placeholder="请输入您的手机号"
					prefix={<PhoneOutlined />}
					style={{ marginBottom: "1%" }}
				/>
				<Input
					placeholder="请输入预注册用户名"
					prefix={<UserOutlined></UserOutlined>}
					style={{ marginBottom: "1%" }}
				/>
				<Input
					placeholder="请输入预注册密码"
					prefix={<LockOutlined />}
					style={{ marginBottom: "1%" }}
				/>
				<Input
					placeholder="请确认预注册密码"
					prefix={<LockOutlined />}
					style={{ marginBottom: "1%" }}
				/>
				<Button
					onClick={handleRegiest}
					style={{ justifyContent: "center" }}
					type="primary"
				>
					点击注冊
				</Button>
			</div>
		),
	},
];

function handleLogin() {
	console.log("点击登录");
}
function handleRegiest() {
	console.log("点击注册");
}
export default function Home() {
	function onChange(key: string) {
		console.log(key);
	}
	return (
		<div style={loginCSS}>
			<div style={cardCSS}>
				<Card style={cardItemCSS}>
					<img
						src={LoginImg}
						alt="图片加载失败"
						style={{ height: "100%", width: "100%", objectFit: "cover" }}
					/>
				</Card>
				<Card style={cardItemCSS} title="">
					<Tabs
						defaultActiveKey="1"
						items={tableItems}
						onChange={onChange}
						centered
					></Tabs>
				</Card>
			</div>
		</div>
	);
}
