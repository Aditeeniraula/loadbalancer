import { AxiosResponse } from "axios";
import httpUtils from "../utils/http.utils";
import { SuccessResponse, UserResponse } from "../../types/response.types";

export class UserService {
    static async show() {
        const res: AxiosResponse<SuccessResponse<UserResponse>> = await httpUtils.get("protected");
        return res.data;
    }

    static async update(id: number, data: {current_password: string, new_password: string}) {
        const res: AxiosResponse<SuccessResponse<any>> = await httpUtils.patch(`update/${id}`, data);
        return res.data;
    }
}
