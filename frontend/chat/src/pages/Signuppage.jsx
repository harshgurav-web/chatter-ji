import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../store/Zustand";

function Signuppage() {
    const navigate = useNavigate();

    const { signup, isLoading, error } = useAuthStore();

    const [formData, setFormData] = useState({
        fullname: "",
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

        const success = await signup(
            formData.fullname,
            formData.email,
            formData.password
        );

        if (success) {
            navigate("/");
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
                            Create Account
                        </h1>

                        <p className="mt-2 opacity-70">
                            Join the conversation.
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-error border-2 border-base-content">
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
                                    FULL NAME
                                </span>
                            </label>

                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                placeholder="Your name"
                                minLength={3}
                                required
                                className="input input-bordered w-full border-2 border-base-content"
                            />
                        </div>

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
                                placeholder="Minimum 6 characters"
                                minLength={6}
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
                                "CREATE ACCOUNT"
                            )}
                        </button>
                    </form>

                    <div className="divider font-bold">
                        OR
                    </div>

                    <p className="text-center">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="link link-secondary font-bold"
                        >
                            LOGIN
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
}

export default Signuppage;