import React, { useEffect, useState } from "react";
import { ReplicaDetailResponse } from "../../types/response.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReplicaService } from "../../core/services/replica.services";
import { ServerStatus } from "../../types/server.types.d";

interface ServerActionsProps {
  server: ReplicaDetailResponse;
}

const ServerActions: React.FC<ServerActionsProps> = ({ server }) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, [server])

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await ReplicaService.changeStatus(server.id, server.status === ServerStatus.active ? ServerStatus.disabled : ServerStatus.active);
      setLoading(true);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['replicas', 'activity-logs'], });
    }
  },);

  return (
    <div>
      <button
        disabled={server.status === "inactive"}
        onClick={() => {
          mutate();
        }}
        className={`px-4 py-2 rounded-lg ${loading ? "bg-blue-500" : server.status === "active" ? "bg-red-500" : server.status === "inactive" ? "bg-gray-500" : "bg-green-400"} text-white mr-2`}
      >
        {loading ? "Loading" : server.status === "active" ? "Disable" : "Activate"}
      </button>
    </div>
  );
};

export default ServerActions;
