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

export interface IUserLicence {
    id: number;
    name: string;
    description: string;
    licenceDate: string;
    trainerUserId: string;
}

export interface UserProps {
    id: string;
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
    tckn?: string;
    profession?: string;
    birthdayDate?: string;
    qualification?: number;
    trainerLicenses: IUserLicence[];
    trainerClubs: any[];
    trainerCanEdit?: object;
}

export interface ObjectStrings {
    [key: string]: string;
}