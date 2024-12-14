import React from "react";
import ServerTable from "../../components/Server/ServerTable";

const Servers: React.FC = () => {
    return (
        <div className="flex min-h-screen">
            <div className="flex-1 bg-gray-100 ml-64">
                <header className="bg-white shadow-md p-4">
                    <h1 className="text-3xl font-semibold">Server</h1>
                </header>

                <main className="p-6">
                    <ServerTable />
                </main>
            </div>
        </div>
    );
};

export default Servers;
