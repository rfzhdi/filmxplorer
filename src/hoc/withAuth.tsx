import React from 'react';
import { Navigate } from 'react-router-dom';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return (props: P) => {
        const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

        if (!isAuthenticated) {
            alert("Access Denied! Please login first.");
            return <Navigate to="/" replace />;
        }

        return <WrappedComponent {...props} />;
    };
}