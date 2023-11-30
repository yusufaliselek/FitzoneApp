import Cookies from "js-cookie";

const clearTokens = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    window.location.href = "/login";
}

export default clearTokens;