import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';

export const GetUserIdFromToken = () => {
    const token = Cookies.get('token');
    if (token) {
        const decodedToken = decodeJwt(token);
        const userId = decodedToken.sub;
        return userId;
    }
    return null;
}