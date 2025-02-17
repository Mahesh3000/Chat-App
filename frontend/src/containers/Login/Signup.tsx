import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        image: null as File | null,
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) submitData.append(key, value);
        });

        try {
            const response = await axios.post(
                "http://localhost:5001/auth/register",
                submitData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (response.status === 201) {
                navigate("/dashboard");
            } else {
                setError(response.data.message || "Sign up failed.");
            }
        } catch (error) {
            setError(
                axios.isAxiosError(error)
                    ? error.response?.data.message || "An error occurred."
                    : "Unexpected error."
            );
        }
    };

    return (
        <div className="containeryash">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {["username", "email", "password"].map((field) => (
                        <input
                            key={field}
                            type={field === "password" ? "password" : "text"}
                            className="form-control"
                            name={field}
                            value={formData[field as keyof typeof formData] as string}
                            onChange={handleChange}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            required
                        />
                    ))}
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                    {error && <div className="error-message">{error}</div>}
                    <Link to="/login" className="already-registered-text">
                        Go to Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
