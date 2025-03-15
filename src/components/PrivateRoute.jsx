import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
