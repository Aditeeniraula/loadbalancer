import { AxiosResponse } from "axios";
import { ProbeResponse, SuccessResponse } from "../../types/response.types";
import httpUtils from "../utils/http.utils";

export interface ProbeData {
    max_life_time: number;
    pool_size: number;
    probe_factor: number;
    probe_remove_factor: number;
    mu: number;
    status: string;
}

export class ProbeService {
    static async show() {
        const res: AxiosResponse<SuccessResponse<ProbeResponse>> = await httpUtils.get("get-prequal-parameters");
        return res.data.data as ProbeResponse;
    }

    static async update(data: ProbeData) {
        const res: AxiosResponse<SuccessResponse<any>> = await httpUtils.post("update-prequal-parameters", data);
        return res.data;
    }
}
