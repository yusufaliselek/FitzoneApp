
import { ILoginResponse } from "../types/Types";
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
            ConfigService.FitzoneApi().post('/Auth/CreateToken', form).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                reject(error.response.data)
            })
        })
    }

    public static async GetUsers(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/user').then((response) => {
                resolve(response.data)
            })
        })
    }

    public static async GetValues(): Promise<IGetData[]> {
        return new Promise<IGetData[]>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/WeatherForecast').then((response) => {
                resolve(response.data)
            })
        })
    }

    public static async GetProducts(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/Products').then((response) => {
                resolve(response.data)
            })
        })
    }

}



