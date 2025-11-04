// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/ui/DashboardLayout';
import UserManagement from './pages/UserManagement';
import CoursesManagement from './pages/CoursesManagement';
import ProfessionManagement from './pages/ProfessionManagement';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/courses" element={<CoursesManagement />} />
          <Route path="/professions" element={<ProfessionManagement />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;