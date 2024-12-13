import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// 将useNavigate 通过组件的形式导入
const creatAxios = (
	navigate: (path: string) => void,
	config?: InternalAxiosRequestConfig
) => {
	// console.log('打印配置信息', import.meta.env)
	const instance: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_API_BASE_URL,
		timeout: import.meta.env.VITE_TIMEOUT,
		withCredentials: true, // default-false 跨域请求是否需要凭证
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		...config,
	});
	// 重写请求拦截器规则
	instance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			const token = "全局token，目前空着"; // 获取token
			// 在发送请求之前做些什么
			console.log("在发送请求之前做些什么呢？");
			config.headers.Authorization = token;
			return config;
		},
		(error: any) => {
			// 对请求错误做些什么
			console.log("对请求错误做些什么呢？");
			return Promise.reject(error);
		}
	);
	// 重写响应拦截器规则
	instance.interceptors.response.use(
		(response: any) => {
			// 对响应数据做点什么
			console.log("对响应数据做点什么呢？", response.data.msg);
			if (response.data.code !== 200) {
				// window.$message.error(response.data.msg);
				console.log("登录失败");
			} else {
				if (response.data.code === 403) {
					// 没有登录凭据 或者凭据过期  跳转到首页
					console.log("路由跳转");
					navigate("/");
				}
				// window.$message.success(response.data.msg);
				console.log("未登录或token过期");
			}
			return response;
		},
		(error: any) => {
			// 对响应错误做点什么
			console.log("对响应错误做点什么呢？", error);
			return Promise.reject(error);
		}
	);
	return instance;
};

export { creatAxios };
