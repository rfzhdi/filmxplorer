import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const { isLoggedIn } = useAuth(); // Ambil status dari Context

    if (!isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;