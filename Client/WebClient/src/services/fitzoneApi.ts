
import Cookies from "js-cookie";
import { IGetTrainerPermissionById, ILoginResponse, ITrainerDetails } from "../types/Types";
import { ConfigService } from "./configService"

export interface IGetData {
    date: string;
    tempratureC: number;
    tempratureF: number;
    summary: string;
}

export class FitzoneApi {

    public static async Login(email: string, password: string): Promise<ILoginResponse> {
        return new Promise<any>((resolve, reject) => {
            const form = new FormData();
            form.append('email', email);
            form.append('password', password);
            ConfigService.FitzoneApi().post('/Auth/login', form).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    public static async ResfreshAccessTokenByRefreshToken(): Promise<ILoginResponse> {
        return new Promise<any>((resolve, reject) => {
            const form = new FormData();
            form.append('token', String(Cookies.get('refreshToken')));
            ConfigService.FitzoneApi().post('/Auth/CreateTokenByRefreshToken', form).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    public static async GetUserById(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/User/GetById?userId=' + id).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    // Trainer Detail

    // GetTrainerDetailByIdAsync
    public static async GetTrainerDetailById(id: string): Promise<ITrainerDetails> {
        return new Promise<ITrainerDetails>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/TrainerDetail/GetById?id=' + id).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    // GetTrainerDetailByTrainerIdAsync
    public static async GetTrainerDetailByTrainerId(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/TrainerDetail/GetByTrainerId?trainerId=' + id).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    /////// Trainer Permission - Start ///////

    // GetAllTrainerPermission
    public static async GetAllTrainerPermission(): Promise<{ data: IGetTrainerPermissionById[], errors: any }> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/TrainerPermission/GetAll').then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    // CreateTrainerPermission
    public static async CreateTrainerPermission(data: IGetTrainerPermissionById): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().post('/TrainerPermission/Create', data).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    // UpdateTrainerPermission
    public static async UpdateTrainerPermission(data: IGetTrainerPermissionById): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().put('/TrainerPermission/Update', data).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    // Delete Trainer Permission
    public static async DeleteTrainerPermission(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().delete('/TrainerPermission/Delete?id=' + id).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    // Get Trainers By Trainer Permission Id
    public static async GetTrainersByTrainerPermissionId(id: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/TrainerPermission/GetTrainersByTrainerPermissionId?trainerPermissionId=' + id).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }



}



