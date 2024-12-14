import { useQuery } from "@tanstack/react-query";
import { ProbeService } from "../services/probe.services";

export const useProbeParameters = () => {
    return useQuery({
        queryKey: ['prequal-parameters'],
        queryFn: ProbeService.show,
        refetchInterval: 5000,
    });
};
