import { Navigate, Outlet } from "react-router-dom";
import { ProtectedRouteProps } from "../../utils/Types/Auth.types";
import { useAuth } from "../../hooks/useAuth";
import { Loader2 } from "lucide-react";

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { data, isLoading } = useAuth().currentUser(true);
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (!data?.data?.email) {
    // Not logged in → redirect to login
    console.log(data?.data?.email, "hrere");

    return <Navigate to="/login" replace />;
  }
  if (data?.data?.role && !allowedRoles.includes(data?.data?.role)) {
    // Logged in but not authorized
    console.log(allowedRoles, data?.data?.role);
    return <Navigate to="/" replace />;
  }

  // Authorized → render child routes
  return <Outlet />;
};
