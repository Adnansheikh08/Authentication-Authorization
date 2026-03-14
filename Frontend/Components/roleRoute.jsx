import { Navigate } from "react-router-dom";

export default function RoleRoute({ children, role }) {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    return (
        <div>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
        </div>
    );
  }

  return children;
}