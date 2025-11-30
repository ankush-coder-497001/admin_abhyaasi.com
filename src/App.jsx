// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./components/ui/DashboardLayout";
import ProtectedRoute from "./utils/ProtectedRoute";
import UserManagement from "./pages/UserManagement";
import CoursesManagement from "./pages/CoursesManagement";
import ProfessionManagement from "./pages/ProfessionManagement";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      {/* toaster setup */}
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/courses" element={<CoursesManagement />} />
            <Route path="/professions" element={<ProfessionManagement />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
