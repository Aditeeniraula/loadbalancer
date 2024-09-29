import React from "react";
import Sidebar from "./Sidebar";
import { Server, ServerStatus } from "../@types/server.types.d.ts";

interface ServerProps {
  servers: Server[];
  setServers: React.Dispatch<React.SetStateAction<Server[]>>;
}

const Servers: React.FC<ServerProps> = ({ servers, setServers }) => {
  const addServer = () => {
    const newServer: Server = {
      id: servers.length + 1,
      name: `Server ${servers.length + 1}`,
      status: ServerStatus.inactive,
    };
    setServers([...servers, newServer]);
  };

  const removeServer = (id: number) => {
    setServers(servers.filter((server) => server.id !== id));
  };

  const toggleStatus = (id: number) => {
    setServers(
      Object(servers).map((server: Server) =>
        server.id === id
          ? {
              ...server,
              status:
                server.status === ServerStatus.inactive ? "Inactive" : "Active",
            }
          : server
      )
    );
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 ml-64 bg-gray-100">
        <header className="bg-white shadow-md p-4">
          <h1 className="text-3xl font-semibold">Servers</h1>
        </header>

        <main className="p-6">
          <button
            onClick={addServer}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
          >
            Add Server
          </button>

          <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Server Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((server) => (
                <tr key={server.id}>
                  <td className="border px-4 py-2">{server.id}</td>
                  <td className="border px-4 py-2">{server.name}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-lg ${
                        server.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      } text-white`}
                    >
                      {server.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => toggleStatus(server.id)}
                      className={`px-4 py-2 rounded-lg ${
                        server.status === "active"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      } text-white mr-2`}
                    >
                      {server.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => removeServer(server.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Servers;
