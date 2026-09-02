import { useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

import useAuthStore from "../store/Zustand";

function Loginpage() {
    const navigate = useNavigate();

    const {
        login,
        isLoading,
        error,
    } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await login(
            formData.email,
            formData.password
        );

        if (success) {
            toast.success("Login successful!");
            navigate("/");
        } else {
            toast.error(error || "Login failed");
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="card bg-base-100 border-4 border-base-content shadow-[8px_8px_0px_0px]">
                <div className="card-body">

                    <div className="text-center mb-4">
                        <div className="badge badge-secondary mb-3">
                            CHAT APP
                        </div>

                        <h1 className="text-4xl font-black uppercase">
                            Welcome Back
                        </h1>

                        <p className="mt-2 opacity-70">
                            Login to continue chatting.
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-error border-2 border-base-content mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="label">
                                <span className="label-text font-bold">
                                    EMAIL
                                </span>
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                                className="input input-bordered w-full border-2 border-base-content"
                            />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text font-bold">
                                    PASSWORD
                                </span>
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Your password"
                                required
                                className="input input-bordered w-full border-2 border-base-content"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary w-full border-2 border-base-content text-lg font-black shadow-[4px_4px_0px_0px] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner" />
                            ) : (
                                "LOGIN"
                            )}
                        </button>
                    </form>

                    <div className="divider font-bold">
                        OR
                    </div>

                    <p className="text-center">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="link link-secondary font-bold"
                        >
                            SIGN UP
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Loginpage;