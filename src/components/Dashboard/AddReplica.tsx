import React from "react";

const AddReplica = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
      <h2 className="text-lg font-medium mb-3">Add Replica</h2>
      <form className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Replica Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter replica name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Replica URL
          </label>
          <input
            type="url"
            className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter replica URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Health Check Route
          </label>
          <input
            type="text"
            className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter health check route"
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
