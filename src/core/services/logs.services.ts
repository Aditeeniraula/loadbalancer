import { AxiosResponse } from "axios";
import { ActivityLogResponse, SuccessResponse } from "../../types/response.types";
import httpUtils from "../utils/http.utils";


export class LogService {
    static async index() {
        const res: AxiosResponse<SuccessResponse<ActivityLogResponse[]>> = await httpUtils.get("activity-logs");
        return res.data;
    }
}
