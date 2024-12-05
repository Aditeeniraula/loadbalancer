import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { httpBase } from "../../utils/axios.utils";

const EnterOTP: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOtpSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await httpBase().post(
        "forgot-password",
        {
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response) {
        toast.success("OTP verified successfully!");
        navigate("/reset-password");
      } else {
        toast.error("Invalid OTP, please try again.");
      }
    } catch (error: any) {
      toast.error("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Enter OTP
        </h2>
        <Toaster />
        <form onSubmit={handleOtpSubmit}>
          <p className="mb-4 text-gray-600">
            Enter the OTP sent to your email to proceed with resetting your
            password.
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Didn't receive the OTP?{" "}
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
};

export default EnterOTP;
