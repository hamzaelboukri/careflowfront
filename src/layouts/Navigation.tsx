import { useAuth } from '../contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  User,
  Activity,
  Clock
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'patient':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'appointments', label: 'My Appointments', icon: Calendar },
          { id: 'book', label: 'Book Appointment', icon: Clock },
          { id: 'records', label: 'Medical Records', icon: FileText },
        ];
      case 'doctor':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'calendar', label: 'My Calendar', icon: Calendar },
          { id: 'patients', label: 'Patients', icon: Users },
          { id: 'records', label: 'Medical Records', icon: FileText },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Activity },
          { id: 'appointments', label: 'All Appointments', icon: Calendar },
          { id: 'users', label: 'Users', icon: Users },
          { id: 'reports', label: 'Reports', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="bg-white shadow-lg border-r border-gray-200">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-blue-600">Careflow</h1>
          <p className="text-sm text-gray-600 mt-1">Medical Management</p>
        </div>

        <div className="flex-1 py-6">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      currentView === item.id
                        ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 rounded-full p-2 mr-3">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}