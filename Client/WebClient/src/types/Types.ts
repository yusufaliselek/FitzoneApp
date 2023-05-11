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

export interface ITrainerClub {
    id: number;
    name: string;
    description: string;
    trainerUserId: string;
    role: string;
    entryDate: string;
    leaveDate: string;
}

export interface ITrainerCanEdit {
    id: number;
    isFounder: boolean;
    canAddTrainerUser: boolean;
    canEditTrainerUser: boolean;
    canDeleteTrainerUser: boolean;
    canAddTraining: boolean;
    canEditTraining: boolean;
    canDeleteTraining: boolean;
    canAddMember: boolean;
    canEditMember: boolean;
    canDeleteMember: boolean;
    canDefineProgram: boolean;
    trainerUserId: string;
}

export interface ITrainerUserProps {
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
    phoneNumber?: string;
    qualification?: number;
    trainerLicences: IUserLicence[];
    trainerClubs: ITrainerClub[];
    trainerCanEdit?: ITrainerCanEdit;
}

export interface ObjectStrings {
    [key: string]: string;
}