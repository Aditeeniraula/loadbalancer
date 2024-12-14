import React from "react";
import { Link } from "react-router";
import image from "/logo.webp";

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 to-purple-900 text-white">
            <nav className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 fixed top-0 left-0 w-full z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-white text-2xl font-bold">
                        Load Balancer
                    </Link>
                    <div className="flex space-x-4">
                        <Link
                            to="/login"
                            className="text-white px-4 py-2  hover:bg-black hover:opacity-50 rounded-lg transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-white px-4 py-2  hover:bg-black hover:opacity-50 rounded-lg transition"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center p-10 space-x-6 pt-40">
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                        Welcome to <br /> Load Balancer
                    </h1>
                    <p className="text-xl mb-6 leading-relaxed">
                        Our load balancing solution distributes traffic across multiple
                        servers to ensure optimal performance, efficiency, and reliability
                        for your applications. Balance your load and deliver fast results.
                    </p>
                    <button className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold">
                        Learn More
                    </button>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <div
                        className="bg-white rounded-lg p-4 shadow-lg flex justify-center items-center"
                        style={{ width: "450px", height: "300px" }}
                    >
                        <img src={image} alt="Load Balancer Diagram" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
