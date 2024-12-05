import React from "react";

function Probe() {
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-3">
          Probe to Reduce Latency Parameters
        </h2>
        <form className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Life
            </label>
            <input
              type="number"
              className="mt-1 block w-full px-2 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter max life"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pool Size
            </label>
            <input
              type="number"
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
      </div>
    </div>
  );
}

export default Probe;
