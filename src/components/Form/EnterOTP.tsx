import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EnterOTP: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();

  const handleOTPSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      toast.error("OTP must be a 6-digit number!");
      return;
    }

    localStorage.setItem("otp", otp);

    toast.success("OTP verified! Redirecting...");
    setTimeout(() => {
      navigate("/reset-password");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Enter OTP
        </h2>
        <Toaster />
        <form onSubmit={handleOTPSubmit}>
          <p className="mb-4 text-gray-600">
            Please enter the 6-digit OTP sent to your email.
          </p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            maxLength={6}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Didn’t receive the OTP?{" "}
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default EnterOTP;
