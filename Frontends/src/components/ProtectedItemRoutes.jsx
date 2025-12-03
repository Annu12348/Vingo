import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedItemRoutes = ({ children }) => {
  const { cartItems } = useSelector((store) => store.Item);

  if (!cartItems || cartItems.length === 0) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedItemRoutes;
