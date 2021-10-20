import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_BASE_URL}`,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    const status = error.response ? error.response.status : -1;
    const errorMessage = error.response ? error.response.data.error : -1;
    switch (status) {
      case 401:
        if (
          errorMessage === "SignatureVerificationException" ||
          errorMessage === "JWTDecodeException"
        ) {
          alert("세션이 유효하지 않습니다.");
          window.localStorage.removeItem("token");
          return (window.location.href = "/");
        } else if (errorMessage === "TokenExpiredException") {
          alert("세션이 만료되었습니다");
          window.localStorage.removeItem("token");
          return (window.location.href = "/");
        }
        break;
      case 403:
        alert("접근 권한이 없습니다.");
        return (window.location.href = "/");
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
