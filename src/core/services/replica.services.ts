import { AxiosResponse } from "axios";
import { ReplicaDetailResponse, SuccessResponse } from "../../types/response.types";
import httpUtils from "../utils/http.utils";


export class ReplicaService {
    static async index() {
        const res: AxiosResponse<SuccessResponse<ReplicaDetailResponse[]>> = await httpUtils.get("get-replica");
        return res.data;
    }
}
