import React from "react";
import ServerActions from "./ServerActions";
import { ReplicaDetailResponse } from "../../types/response.types";
import { capitalizeFirstLetter } from "../../core/utils/helper.utils";
import { useReplicas } from "../../core/hooks/useReplicas";

const ServerTable: React.FC = () => {
  const { data, status } = useReplicas();

  return data?.data && status === 'success' && (
    <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Replica Name</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {Object(data.data).map((item: ReplicaDetailResponse, index: number) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">
              <span
                className={`px-2 py-1 rounded-lg ${item.status === "active" ? "bg-green-500" : "bg-red-500"
                  } text-white`}
              >
                {capitalizeFirstLetter(item.status)}
              </span>
            </td>
            <td className="border px-4 py-2">
              <ServerActions server={item} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServerTable;
