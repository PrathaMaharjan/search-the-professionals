//if user already logged in no need to go to login page
//if user already logged in no need to go to login page
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface LoginGuardProps {
  children: JSX.Element;
}

const LoginGuard = ({ children }: LoginGuardProps) => {
  const token = localStorage.getItem("token");

  const user = localStorage.getItem("currentUser");

  if (token && user) {
    return <Navigate to="/home" replace />;
  } else {
    return children;
  }
};

export default LoginGuard;