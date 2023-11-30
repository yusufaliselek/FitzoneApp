import Cookies from "js-cookie";
import { FitzoneApi } from "../../services/fitzoneApi";
import clearTokens from "./ClearTokens";

const RefreshToken = async () => {

    if (!Cookies.get('token')) {
        return FitzoneApi.ResfreshAccessTokenByRefreshToken().then((response) => {
            Cookies.set('token', response.data.accessToken, { expires: new Date(response.data.accessTokenExpiration) });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiration) });
            console.log("Token yenilendi");
        }).catch((error) => {
            clearTokens();
            console.log(error);
        });
    }
}

export default RefreshToken;
