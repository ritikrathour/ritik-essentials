import { Navigate, Outlet } from "react-router-dom";
import { ProtectedRouteProps } from "../../utils/Types/Auth.types";
import { useAuth } from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const user = useAuth().currentUser(true);
  if (user?.isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (!user?.data?.email) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }
  if (user?.data?.role && !allowedRoles.includes(user?.data?.role)) {
    // Logged in but not authorized
    return <Navigate to="/" replace />;
  }

  // Authorized → render child routes
  return <Outlet />;
};
