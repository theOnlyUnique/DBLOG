import { useNavigate } from "react-router-dom";
import { creatAxios } from "./axios";

const YourComponent = () => {
	const navigate = useNavigate();

	const axiosInstance = creatAxios(navigate);

	// 之后你可以使用 axiosInstance 发送请求
	return <div>...</div>;
};
