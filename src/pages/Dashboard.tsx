import { useAuthStore } from '../stores/authStore'
import { PatientDashboard } from '../components/Dahsboard/PatientDashboard'
import { DoctorDashboard } from '../components/Dahsboard/DoctorDashboard'
import { AdminDashboard } from '../components/Dahsboard/AdminDashboard'

const Dashboard = () => {
  const user = useAuthStore((state: any) => state.user)
  
  // Determine which dashboard to show based on user role
  const renderDashboard = () => {
    if (!user) {
      return <div>Loading...</div>
    }

    const roleName = user.roleId?.name || user.role || 'Patient'
    
    switch (roleName.toLowerCase()) {
      case 'patient':
        return <PatientDashboard />
      case 'doctor':
        return <DoctorDashboard />
      case 'superadmin':
      case 'clinicadmin':
      case 'admin':
        return <AdminDashboard />
      default:
        return <PatientDashboard />
    }
  }

  return <>{renderDashboard()}</>
}

export default Dashboard
