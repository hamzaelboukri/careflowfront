import { Users, Calendar, TrendingUp, AlertTriangle, User, CheckCircle } from 'lucide-react';

export function AdminDashboard() {

  const systemStats = [
    { label: 'Total Users', value: '1,247', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Appointments Today', value: '89', change: '+5%', icon: Calendar, color: 'green' },
    { label: 'Revenue This Month', value: '$45,890', change: '+18%', icon: TrendingUp, color: 'purple' },
    { label: 'System Alerts', value: '3', change: '0%', icon: AlertTriangle, color: 'red' },
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'New patient registration',
      user: 'Sarah Johnson',
      time: '5 minutes ago',
      type: 'registration',
    },
    {
      id: '2',
      action: 'Appointment scheduled',
      user: 'Dr. Michael Chen',
      time: '12 minutes ago',
      type: 'appointment',
    },
    {
      id: '3',
      action: 'Medical record updated',
      user: 'Dr. Emily Davis',
      time: '1 hour ago',
      type: 'record',
    },
  ];

  const systemAlerts = [
    {
      id: '1',
      message: 'Server maintenance scheduled for tonight at 2 AM',
      type: 'maintenance',
      priority: 'medium',
    },
    {
      id: '2',
      message: 'Payment gateway temporarily unavailable',
      type: 'payment',
      priority: 'high',
    },
    {
      id: '3',
      message: 'Backup completed successfully',
      type: 'backup',
      priority: 'low',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-green-100 text-green-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      case 'red':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and management</p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`rounded-lg p-3 ${getColorClasses(stat.color)}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      {activity.type === 'registration' && <User className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'appointment' && <Calendar className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'record' && <CheckCircle className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-600">by {activity.user}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                View All Activity
              </button>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">System Alerts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-3 border rounded-lg ${
                      alert.priority === 'high' 
                        ? 'bg-red-50 border-red-200' 
                        : alert.priority === 'medium'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <AlertTriangle 
                        className={`h-4 w-4 mr-2 ${
                          alert.priority === 'high' 
                            ? 'text-red-600' 
                            : alert.priority === 'medium'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`} 
                      />
                      <p className={`text-sm font-medium ${
                        alert.priority === 'high' 
                          ? 'text-red-800' 
                          : alert.priority === 'medium'
                          ? 'text-yellow-800'
                          : 'text-green-800'
                      }`}>
                        {alert.message}
                      </p>
                    </div>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${
                      alert.priority === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : alert.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {alert.priority} priority
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Manage Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Users className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Manage Users</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Calendar className="h-8 w-8 text-green-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">View Schedule</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">Reports</span>
              </button>
              <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <AlertTriangle className="h-8 w-8 text-red-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">System Health</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}