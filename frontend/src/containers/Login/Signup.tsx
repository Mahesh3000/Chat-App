import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const [error, setError] = useState<string | null>(null);

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setProfilePic(file)
        }
    }

    console.log('file', profilePic);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        if (profilePic) {
            formData.append('profilePic', profilePic);
        }


        try {
            const response = await axios.post('http://localhost:4000/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                navigate('/login');
            }
            else {
                setError(response.data.message || "Sign up failed. Please try again.");
            }
        } catch (error: unknown) {
            console.error('Error during signup:', error);

            if (axios.isAxiosError(error)) {
                // Check if the error has a response
                if (error.response) {
                    // Error response data structure example: { message: "Some error message" }
                    setError(error.response.data.message || "An error occurred during signup. Please try again.");
                } else {
                    // If no response, maybe a network error
                    setError("Network error. Please check your internet connection.");
                }
            } else {
                // If the error isn't an AxiosError, handle it as a generic error
                setError("An unexpected error occurred. Please try again.");
            }

        }
    };


    return (
        <div className="containeryash">
            <div className="signup-form">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                    <input
                        type="file"
                        className="form-control"
                        id="profilePic"
                        name="profilePic"
                        onChange={handleProfilePicChange}
                        accept="image/*"
                    />
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    {error && <div className="error-message">{error}</div>}
                    <Link to="/login" className="already-registered-text">Go to Login</Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;