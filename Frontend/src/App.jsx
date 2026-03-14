import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/AuthPages/Auth";
import User from "./Pages/UserPages/User";
import Admin from "./Pages/AdminPages/Admin";
import ProtectedRoute from "../Components/ProtectedRoute";
import RoleRoute from "../Components/roleRoute";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Auth />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RoleRoute role="admin">
                <Admin />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;