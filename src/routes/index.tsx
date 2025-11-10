/**
 * Application Routes
 * Defines all routes for the application
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../components/LandingPage';
import { RegistrationFlow } from '../components/RegistrationFlow';
import { PanchayatWebsite } from '../components/PanchayatWebsite';
import { SachivDashboard } from '../components/SachivDashboard';
import { Login } from '../components/Login';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { SuccessPage } from '../pages/SuccessPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<RegistrationFlow />} />
      <Route path="/panchayat/:subdomain" element={<PanchayatWebsite />} />
      <Route path="/panchayat-demo" element={<PanchayatWebsite />} />
      <Route path="/login" element={<Login />} />
      <Route path="/success" element={<SuccessPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SachivDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

