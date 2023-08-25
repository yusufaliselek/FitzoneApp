import Cookies from "js-cookie";
import { FitzoneApi } from "../../services/fitzoneApi";

const RefreshToken = () => {
    if (!Cookies.get('token')) {
        return FitzoneApi.ResfreshAccessTokenByRefreshToken().then((response) => {
            Cookies.set('token', response.data.accessToken, { expires: new Date(response.data.accessTokenExpiration) });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiration) });
            console.log("Token yenilendi");
            return true;
        }).catch((error) => {
            console.log(error)
            return false;
        });
    }
}

export default RefreshToken;