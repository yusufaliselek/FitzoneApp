import axios from "axios";
import Cookies from "js-cookie";

export class ConfigService {

  public static FitzoneApi() {
    return axios.create({
      baseURL: "https://localhost:7165/api",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
  }
}