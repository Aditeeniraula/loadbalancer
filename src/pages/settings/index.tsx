import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { UserService } from "../../core/services/user.services";
import { useUsers } from "../../core/hooks/fetch/useUser";

const Settings: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { data: user, isFetched } = useUsers()

    const { mutate } = useMutation({
        mutationFn: async () => {
            if (!isFetched || !user || !user.data || Array.isArray(user?.data)) {
                return;
            }

            const res = await UserService.update(user?.data.id, {
                current_password: currentPassword,
                new_password: newPassword,
            })

            return res.data
        }, onSuccess: () => {
            toast.success("Password changed successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        },
        onError: (error: any) => {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    })

    const validate = () => {
        if (newPassword.length < 0 || confirmPassword.length < 0) {
            return "Password cannot be empty"
        }

        if (currentPassword.length < 0) {
            return "Current Password cannot be empty"
        }

        if (newPassword.length < 8) {
            return "Password must be at least 8 characters long"
        }

        if (newPassword !== confirmPassword) {
            return "Passwords do not match"
        }
        return "success"
    };

    useEffect(() => {
        console.log("confirmPassword", confirmPassword)
        console.log("newPassword", newPassword)
        console.log("current_password", currentPassword)
    }, [confirmPassword])

    return (
        <div className="flex-1 p-8">
            <form onSubmit={(e) => {
                e.preventDefault();
                const error = validate();
                if (error !== "success") {
                    toast.error(error);
                    return;
                }

                mutate();
            }} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Settings
                </h2>
                <section className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700">
                        Change Password
                    </h3>
                </section>
                <section className="mb-8">
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="mt-2 p-2 block w-full rounded-md border solid black 2px shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-2 p-2 block w-full rounded-md border solid black 2px shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-2 p-2 block w-full rounded-md border solid black 2px shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <input type='submit' value='Change Password'
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    />
                </section>
            </ form>
        </div>
    );
};

export default Settings;
