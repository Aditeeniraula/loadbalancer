import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col fixed h-full">
      <div className="px-4 py-6 text-2xl font-bold">Load Balancer</div>
      <nav className="flex-1 px-4 py-2">
        <ul>
          <li className="py-2">
            <Link to="/dashboard" className="text-gray-300 hover:text-white">
              Dashboard
            </Link>
          </li>
          <li className="py-2">
            <Link to="/servers" className="text-gray-300 hover:text-white">
              Servers
            </Link>
          </li>
          <li className="py-2">
            <Link to="/settings" className="text-gray-300 hover:text-white">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
