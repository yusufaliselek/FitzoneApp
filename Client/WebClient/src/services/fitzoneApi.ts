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
            ConfigService.FitzoneApi().get('/WeatherForecast').then((response)=> {
                resolve(response.data)
            })
        })
    }

}



