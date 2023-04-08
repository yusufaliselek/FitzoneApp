export interface ILogin {
accessToken: string;
accessTokenExpiration: string;
refreshToken: string;
refreshTokenExpiration: string;
}

export interface ILoginResponse {
    data: ILogin;
    status: number;
    error: string;
}

export interface IMenu {
    title: string;
    icon?: JSX.Element;
    link: string;
}

export interface Account {
    user: string;
    password: string;
}