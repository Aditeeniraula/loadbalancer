import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../App";

const Sidebar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        authContext?.setLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/home', { replace: true });
    }

    return (
        <div className="flex flex-col w-64 bg-gray-800 text-white fixed min-h-screen pl-5">
            <div className="text-2xl font-bold w-auto pt-3">Load Balancer</div>
            <div className="flex flex-col grow justify-between">
                <ul className="flex flex-col gap-10 pt-10">
                    <li>
                        <Link to="/dashboard" className="text-gray-300 hover:text-white">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/servers" className="text-gray-300 hover:text-white">
                            Servers
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" className="text-gray-300 hover:text-white">
                            Settings
                        </Link>
                    </li>

                </ul>
                <div>
                    <button onClick={handleLogout} className={'text-gray-300 hover:text-white pb-5'}>Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
