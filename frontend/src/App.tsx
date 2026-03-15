import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { ProtectedRoute, RoleBasedRoute } from './routes/ProtectedRoutes.tsx';

// Pages
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import LandingPage from './pages/LandingPage.tsx';
import UserDashboard from './pages/UserDashboard.tsx';
import ViewSlots from './pages/ViewSlots.tsx';
import MyAppointments from './pages/MyAppointments.tsx';
import ProviderDashboard from './pages/provider/ProviderDashboard.tsx';
import SetAvailability from './pages/provider/SetAvailability.tsx';
import DailySchedule from './pages/provider/DailySchedule.tsx';
import Layout from './components/Layout.tsx';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              {/* USER Routes */}
              <Route element={<RoleBasedRoute allowedRole="USER" />}>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/services/:id" element={<ViewSlots />} />
                <Route path="/appointments" element={<MyAppointments />} />
              </Route>

              {/* SERVICE_PROVIDER Routes */}
              <Route element={<RoleBasedRoute allowedRole="SERVICE_PROVIDER" />}>
                <Route path="/provider/dashboard" element={<ProviderDashboard />} />
                <Route path="/provider/services/:id/availability" element={<SetAvailability />} />
                <Route path="/provider/schedule" element={<DailySchedule />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
