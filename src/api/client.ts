import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVICE || "http://localhost:3000"}/api`,
  withCredentials: true,
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      // config.headers가 AxiosHeaders 인스턴스일 수도 있고 아닐 수도 있음
      // 그래서 set 방식으로 추가 (Axios 1.x 이상에서 안전)
      if (config.headers && typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        // fallback: headers가 일반 객체인 경우(구버전 호환)
        (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            window.location.href = "/AdmMaster";
        }
        return Promise.reject(error);
    }
);

export default client;
