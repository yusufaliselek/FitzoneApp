import axios from "axios";
import Cookies from "js-cookie";
import API_LINK from "../utils/constants/apiLink";

export class ConfigService {

  public static FitzoneApi() {
    return axios.create({
      baseURL: API_LINK,
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
      }
    });
  }
}