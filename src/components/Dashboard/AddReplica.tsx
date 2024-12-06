import React, { useState } from "react";

const AddReplica = () => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    healthcheck_endpoint: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/admin/add-replica", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Replica added successfully!");
      } else {
        alert(`Error: ${data.message || "Failed to add replica"}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred while adding the replica.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-3">Add Replica</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Replica Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter replica name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Replica URL
          </label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter replica URL"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Health Check Route
          </label>
          <input
            type="text"
            name="healthcheck_endpoint"
            value={formData.healthcheck_endpoint}
            onChange={handleChange}
            className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter health check route"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-1 px-3 text-sm rounded-md hover:bg-blue-600"
        >
          Add Replica
        </button>
      </form>
    </div>
  );
};

export default AddReplica;
