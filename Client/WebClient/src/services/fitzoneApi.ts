
import Cookies from "js-cookie";
import { decodeJwt } from 'jose';
import { ILoginResponse, ITrainerDetails } from "../types/Types";
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

}



