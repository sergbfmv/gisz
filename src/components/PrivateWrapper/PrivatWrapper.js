import { Navigate, Outlet } from "react-router-dom";

const PrivateWrapper = ({ isLogin }) => {
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateWrapper