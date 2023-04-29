export interface ILogin {
    accessToken: string;
    accessTokenExpiration: string;
    refreshToken: string;
    refreshTokenExpiration: string;
}

export interface IRefreshAccessToken {
    token: string;
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

export interface UserProps {
    username: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
    newPasswordConfirm?: string;
    biography?: string;
    firstName: string;
    lastName: string;
    personalPhoto: string;
    gender?: boolean;
    location?: string;
}

export interface ObjectStrings {
    [key: string]: string;
}