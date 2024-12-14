import { useQuery } from "@tanstack/react-query";
import { LogService } from "../services/logs.services";

export const useActivityLogs = () => {
    return useQuery({
        queryKey: ['activity-logs'],
        queryFn: LogService.index,
        refetchInterval: 5000,
    });
};
