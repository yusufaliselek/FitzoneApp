import { Form } from "react-router-dom";
import { ConfigService } from "./configService"

export interface IGetData {
    date: string;
    tempratureC: number;
    tempratureF: number;
    summary: string;
}

export class FitzoneApi {

    public static async GetValues(): Promise<IGetData[]> {
        return new Promise<IGetData[]>((resolve, reject) => {
            ConfigService.FitzoneApi().get('/WeatherForecast').then((response) => {
                resolve(response.data)
            })
        })
    }

    public static async CreateTraining({ name }: { name: string }): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const form = new FormData();
            form.append("name", name);
            ConfigService.FitzoneApi().post('/Training', form).then((response) => {
                resolve(response.data)
            })
        })
    }

}



