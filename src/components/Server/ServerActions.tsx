import React from "react";

interface Server {
  id: number;
  name: string;
  status: string;
}

interface ServerActionsProps {
  server: Server;
}

const ServerActions: React.FC<ServerActionsProps> = ({ server }) => {
  const changeStatus = () => {
    console.log(`Changing status of ${server.name}`);
  };

  const removeServer = () => {
    console.log(`Removing ${server.name}`);
  };

  return (
    <div>
      <button
        onClick={changeStatus}
        className={`px-4 py-2 rounded-lg ${
          server.status === "active" ? "bg-yellow-500" : "bg-green-500"
        } text-white mr-2`}
      >
        {server.status === "active" ? "Deactivate" : "Activate"}
      </button>
      <button
        onClick={removeServer}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Remove
      </button>
    </div>
  );
};

export default ServerActions;
