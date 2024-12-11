import React from "react";
import { ReplicaDetailResponse } from "../../types/response.types";

interface ServerActionsProps {
  server: ReplicaDetailResponse;
}

const ServerActions: React.FC<ServerActionsProps> = ({ server }) => {
  const changeStatus = () => {
    console.log(`Changing status of ${server.name}`);
  };

  return (
    <div>
      <button
        disabled={server.status === "inactive"}
        onClick={changeStatus}
        className={`px-4 py-2 rounded-lg ${server.status === "active" ? "bg-red-500" : server.status === "inactive" ? "bg-gray-500" : "bg-green-400"} text-white mr-2`}
      >
        {server.status === "active" ? "Disable" : "Activate"}
      </button>
    </div>
  );
};

export default ServerActions;
