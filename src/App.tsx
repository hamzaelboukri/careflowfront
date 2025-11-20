import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'

// Public pages
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
// Protected pages
import Dashboard from './pages/Dashboard'
// import Profile from './pages/Profile'
import AppointmentList from './pages/appointments/AppointmentList'
import AppointmentNew from './pages/appointments/AppointmentNew'
import AppointmentDetail from './pages/appointments/AppointmentDetail'
import PatientList from './pages/patients/PatientList'
import PatientDetail from './pages/patients/PatientDetail'
import UserList from './pages/users/UserList'
import UserDetail from './pages/users/UserDetail'
import PrescriptionList from './pages/prescriptions/PrescriptionList'
import PrescriptionDetail from './pages/prescriptions/PrescriptionDetail'
import LabOrderList from './pages/lab-orders/LabOrderList'
import LabOrderDetail from './pages/lab-orders/LabOrderDetail'
import DocumentsList from './pages/documents/DocumentsList'
import DocumentDetail from './pages/documents/DocumentDetail'
import ConsultationList from './pages/consultations/ConsultationList'
import ConsultationNew from './pages/consultations/ConsultationNew'
import MedicalRecordDetail from './pages/medical-records/MedicalRecordDetail'

import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes - redirect to dashboard if already logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* Auth routes without redirect (for password reset flow) */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            
            {/* Appointments */}
            <Route path="/appointments" element={<AppointmentList />} />
            <Route path="/appointments/new" element={<AppointmentNew />} />
            <Route path="/appointments/:id" element={<AppointmentDetail />} />
            
            {/* Patients - Medical staff and admin only */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR', 'NURSE']} />}>
              <Route path="/patients" element={<PatientList />} />
              <Route path="/patients/:id" element={<PatientDetail />} />
            </Route>
            
            {/* Users - Admin only */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<UserDetail />} />
            </Route>
            
            {/* Prescriptions */}
            <Route path="/prescriptions" element={<PrescriptionList />} />
            <Route path="/prescriptions/:id" element={<PrescriptionDetail />} />
            
            {/* Lab Orders */}
            <Route path="/lab-orders" element={<LabOrderList />} />
            <Route path="/lab-orders/:id" element={<LabOrderDetail />} />
            
            {/* Documents */}
            <Route path="/documents" element={<DocumentsList />} />
            <Route path="/documents/:id" element={<DocumentDetail />} />
            
            {/* Consultations - Medical staff only */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR', 'NURSE']} />}>
              <Route path="/consultations" element={<ConsultationList />} />
              <Route path="/consultations/new" element={<ConsultationNew />} />
              <Route path="/medical-records/:patientId" element={<MedicalRecordDetail />} />
            </Route>
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
