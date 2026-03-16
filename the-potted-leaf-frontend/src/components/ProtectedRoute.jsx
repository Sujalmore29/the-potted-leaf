import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    if(!token){
        navigate("/login");
        return null;
    }
  return children;
}

export default ProtectedRoute