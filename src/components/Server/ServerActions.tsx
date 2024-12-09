import React, { useState } from "react";

interface Server {
  id: number;
  name: string;
  status: string;
}

interface ServerActionsProps {
  server: Server;
  onStatusChange: (id: number, newStatus: string) => void;
  onRemoveServer: (id: number) => void;
}

const ServerActions: React.FC<ServerActionsProps> = ({
  server,
  onStatusChange,
  onRemoveServer,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const changeStatus = async () => {
    const newStatus = server.status === "active" ? "inactive" : "active"; // Toggle status
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/change-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: server.id,
          new_status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change replica status");
      }

      // Update status
      onStatusChange(server.id, newStatus);
      console.log(`Status of ${server.name} changed to ${newStatus}`);
    } catch (error) {
      console.error("Error changing status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeServer = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_APP_URL}/change-status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: server.id,
          new_status: "disabled", 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to disable replica");
      }

      // Remove the server from the UI
      onRemoveServer(server.id);
      console.log(`Server ${server.name} disabled.`);
    } catch (error) {
      console.error("Error disabling server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={changeStatus}
        className={`px-4 py-2 rounded-lg ${
          server.status === "active" ? "bg-yellow-500" : "bg-green-500"
        } text-white mr-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={isLoading}
      >
        {isLoading
          ? "Processing..."
          : server.status === "active"
          ? "Deactivate"
          : "Activate"}
      </button>

      <button
        onClick={removeServer}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        disabled={isLoading}
      >
        Remove
      </button>
    </div>
  );
};

export default ServerActions;
