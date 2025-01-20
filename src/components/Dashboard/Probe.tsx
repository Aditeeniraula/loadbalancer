import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProbeData, ProbeService } from "../../core/services/probe.services";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useProbeParameters } from "../../core/hooks/useProbeParameter";


const Probe = () => {

  const { data, status } = useProbeParameters();
  const queryClient = useQueryClient()

  const [formData, setFormData] = useState<ProbeData>({
    max_life_time: 1,
    pool_size: 16,
    probe_factor: 1.2,
    probe_remove_factor: 1,
    mu: 1,
    status: "inactive"
  });

  useEffect(() => {
    if (status === "success") {
      setFormData({
        ...formData,
        max_life_time: data?.max_life_time,
        pool_size: data?.pool_size,
        probe_factor: data?.probe_factor,
        probe_remove_factor: data?.probe_remove_factor,
        mu: data?.mu,
      });
    }

    if (status === "error") {
      setFormData({
        ...formData,
        max_life_time: 1,
        pool_size: 16,
        probe_factor: 1.2,
        probe_remove_factor: 1,
        mu: 1,
      })
    }
  }, [status])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const validate = () => {
    if (formData.max_life_time <= 0) {
      toast.error("Max life time must be greater than 0")
      return false
    }

    if (!Number.isInteger(formData.max_life_time)) {
      toast.error("Max life time must be an integer")
      return false
    }

    if (formData.pool_size <= 10) {
      toast.error("Pool size must be greater than 10")
      return false
    }

    if (!Number.isInteger(formData.pool_size)) {
      toast.error("Pool size must be an integer")
      return false
    }

    if (formData.probe_factor <= 0) {
      toast.error("Probe factor must be greater than 0")
      return false
    }

    if (formData.probe_remove_factor <= 0) {
      toast.error("Probe remove factor must be greater than 0")
      return false
    }

    if (!Number.isInteger(formData.probe_remove_factor)) {
      toast.error("Probe remove factor must be an integer")
      return false
    }

    if (formData.mu <= 0) {
      toast.error("Scale factor mu must be greater than 0")
      return false
    }

    if (!Number.isInteger(formData.mu)) {
      toast.error("Scale factor mu must be an integer")
      return false
    }

    return true
  }

  const { mutate } = useMutation({
    mutationFn: async () => {
      const res = await ProbeService.update(formData)

      return res.data
    }, onSuccess: () => {
      queryClient.invalidateQueries(["probe-parameters"])
      toast.success("Probe parameters updated successfully")
    },
    onError: (error: AxiosError) => {
      if (error) {
        console.log(error)
        toast.error(`${"Failed to update probe parameters"}`)
      }
    }
  });

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto">
        <h2 className="text-lg font-medium mb-3">
          Probe to Reduce Latency Parameters
        </h2>
        <form className="space-y-3" onSubmit={(e) => {
          e.preventDefault()
          if (!validate()) {
            return
          }
          mutate()
        }}>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Probe;
