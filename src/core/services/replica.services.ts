import { AxiosResponse } from "axios";
import { ReplicaDetailResponse, SuccessResponse } from "../../types/response.types";
import httpUtils from "../utils/http.utils";
import { ServerStatus } from "../../types/server.types";


export interface ReplicaData {
    name: string
    url: string
    health_check_endpoint: string
}

export class ReplicaService {
    static async index() {
        const res: AxiosResponse<SuccessResponse<ReplicaDetailResponse[]>> = await httpUtils.get("get-replica");
        return res.data;
    }

    static async store(data: ReplicaData) {
        const res: AxiosResponse<SuccessResponse<any>> = await httpUtils.post("add-replica",data);

        return res.data;
    }

    static async changeStatus(id: number, status: ServerStatus) {
        const res: AxiosResponse<SuccessResponse<any>> = await httpUtils.patch("change-status", {
            id: id,
            status: status,
        });

        return res.data;
    }
}
