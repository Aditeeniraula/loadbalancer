import { useQuery } from "@tanstack/react-query";
import { StatisticsService } from "../../services/statistics.services";

export const useStatistics = () => {
    return useQuery({
        queryKey: ['statistics'],
        queryFn: StatisticsService.getStatistics,
        refetchInterval: 5000,
    });
};
