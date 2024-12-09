import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { httpBase } from "../../utils/axios.utils";
import "react-toastify/dist/ReactToastify.css";

const Probe = () => {
  const [formData, setFormData] = useState({
    max_life_time: "",
    pool_size: "",
    probe_factor: "",
    probe_remove_factor: "",
    mu: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await httpBase().post(
        "/admin/update-prequal-parameters",
        formData
      );

      if (response) {
        toast.success("Replica added successfully!");
        setFormData({
          max_life_time: "",
          pool_size: "",
          probe_factor: "",
          probe_remove_factor: "",
          mu: "",
        });
      } else {
        toast.error(
          `Error: ${response.data.message || "Failed to add replica"}`
        );
      }
    } catch (error: any) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred while adding the replica.");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-3">
          Probe to Reduce Latency Parameters
        </h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Life Time
            </label>
            <input
              type="number"
              name="max_life_time"
              value={formData.max_life_time}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter max life time"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pool Size
            </label>
            <input
              type="number"
              name="pool_size"
              value={formData.pool_size}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter pool size"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Probe Factor
            </label>
            <input
              type="number"
              name="probe_factor"
              value={formData.probe_factor}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter probe factor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Probe Remove Factor
            </label>
            <input
              type="number"
              name="probe_remove_factor"
              value={formData.probe_remove_factor}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter probe remove factor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scale Factor Mu
            </label>
            <input
              type="number"
              name="mu"
              value={formData.mu}
              onChange={handleChange}
              className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter scale factor mu"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 px-3 text-sm rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Probe;
