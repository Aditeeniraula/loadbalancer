
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import httpBase from "../../core/utils/axios.utils";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await httpBase().post(
        "forgot-password",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response) {
        toast.success("OTP sent to your email! Redirecting...");

        setTimeout(() => {
          navigate("/enter-otp");
        }, 2000);
      } else {
        toast.error("Error: Could not send OTP");
      }
    } catch (error: any) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Reset Password
        </h2>
        <Toaster />
        <form onSubmit={handleResetPasswordSubmit}>
          <p className="mb-4 text-gray-600">
            Enter your email to receive an OTP to reset your password.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Send OTP
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Remembered your password?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
