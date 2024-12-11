import { AxiosResponse } from "axios";
import { StatisticsResponse, SuccessResponse } from "../../types/response.types";
import httpUtils from "../utils/http.utils";


export class StatisticsService {
    static async getStatistics() {
        const res: AxiosResponse<SuccessResponse<StatisticsResponse>> = await httpUtils.get("get-statistics");
        return res.data;
    }
}
