import { useQuery } from "@tanstack/react-query";
import { ReplicaService } from "../services/replica.services";

export const useReplicas = () => {
    return useQuery({
        queryKey: ['replicas'],
        queryFn: ReplicaService.index,
        refetchInterval: 5000,
    });
};
