import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = cookies.get("auth-token");
  return isAuth ? children : <Navigate to="/notAuth" />;
};

export default PrivateRoute;
