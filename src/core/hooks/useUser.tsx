import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/user.services";

export const useUsers = () => {
    return useQuery({
        queryKey: ['current-user'],
        queryFn: UserService.show,
    });
};
