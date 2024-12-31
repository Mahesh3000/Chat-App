import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    element: JSX.Element; // The component to render when authenticated
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Check for token

    if (!isAuthenticated) {
        return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    return element; // Render the provided element if authenticated
};

export default ProtectedRoute;
