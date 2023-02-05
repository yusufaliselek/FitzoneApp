import axios from "axios";

export class ConfigService {
  public static FitzoneApi() {
    return axios.create({
      baseURL: "https://localhost:7057/api",
      headers: {
        "Content-type": "application/json"
      }
    });
  }
}