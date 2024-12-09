import React, { useState, useEffect } from "react";
import ServerActions from "./ServerActions";
import { httpBase } from "../../utils/axios.utils";

interface Server {
  id: number;
  name: string;
  status: string;
}

const ServerTable: React.FC = () => {
  const [serverTable, setServerTable] = useState<Server[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the server data
  const fetchLogs = async () => {
    try {
      const response = await httpBase().get("get-replica");
      setServerTable(response.data.data);
    } catch (error: any) {
      console.error(error);
      setError("Failed to fetch server data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();

    const intervalId = setInterval(fetchLogs, 5000); 
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Update server status in the table
  const handleStatusChange = (id: number, newStatus: string) => {
    setServerTable((prevServers) =>
      prevServers.map((server) =>
        server.id === id ? { ...server, status: newStatus } : server
      )
    );
  };

  // Remove server from the table
  const handleRemoveServer = (id: number) => {
    setServerTable((prevServers) =>
      prevServers.filter((server) => server.id !== id)
    );
  };

  if (loading) return <div className="text-center py-6">Loading logs...</div>;
  if (error) return <div className="text-center py-6 text-red-500">{error}</div>;

  return (
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
        {serverTable.map((server) => (
          <tr key={server.id} className="border-b hover:bg-gray-50">
            <td className="border px-4 py-2">{server.id}</td>
            <td className="border px-4 py-2">{server.name}</td>
            <td className="border px-4 py-2">
              <span
                className={`px-2 py-1 rounded-lg ${
                  server.status === "active" ? "bg-green-500" : "bg-red-500"
                } text-white`}
              >
                {server.status}
              </span>
            </td>
            <td className="border px-4 py-2">
              <ServerActions
                server={server}
                onStatusChange={handleStatusChange}
                onRemoveServer={handleRemoveServer}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServerTable;
