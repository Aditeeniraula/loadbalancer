import React, { useState } from "react";
import { ReplicaData, ReplicaService } from "../../core/services/replica.services";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const AddReplica = () => {
  const [formData, setFormData] = useState<ReplicaData>({
    name: "",
    url: "",
    health_check_endpoint: "",
  });

  const validate = () => {
    if (!formData.name) {
      toast.error("Replica name is required")
      return "error"
    }

    if (!formData.health_check_endpoint) {
      toast.error("Health check route is required")
      return "error"
    }

    return "success"
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await ReplicaService.store(formData)
      return res
    },
    onSuccess: () => {
      toast.success("Replica added successfully!")
      setFormData({
        name: "",
        url: "",
        health_check_endpoint: "",
      })
    },
    onError: (error: AxiosError) => {
      toast.error(`${error?.response?.data?.message || "Failed to add replica"}`)
    }
  })

  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-3">Add Replica</h2>
      <form className="space-y-3" onSubmit={(e) => {
        e.preventDefault();
        if (validate(formData.url) !== "success") {
          return
        }
        mutate()
      }}>
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
            name="health_check_endpoint"
            value={formData.health_check_endpoint}
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
