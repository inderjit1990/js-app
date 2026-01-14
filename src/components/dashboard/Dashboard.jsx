import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats] = useState({
    totalProjects: 12,
    activeTasks: 24,
    completedTasks: 156,
    teamMembers: 8,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <span className="text-xl font-bold text-indigo-600">YourApp</span>
          <div className="hidden md:flex space-x-4">
            {['overview', 'projects', 'tasks', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-lg font-medium capitalize ${
                  activeTab === tab
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* USER PROFILE & LOGOUT */}
        <div className="flex items-center space-x-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="ml-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* WELCOME SECTION */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600">Here's what's happening with your projects today.</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Total Projects" value={stats.totalProjects} icon="📊" trend="+2 this month" />
              <StatCard title="Active Tasks" value={stats.activeTasks} icon="✅" trend="12 due this week" />
              <StatCard title="Completed" value={stats.completedTasks} icon="🎯" trend="+18 this week" />
              <StatCard title="Team Members" value={stats.teamMembers} icon="👥" trend="2 active now" />
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <ul className="space-y-4">
                <ActivityItem text="Task completed: Design mockups" time="2 hours ago" />
                <ActivityItem text="New project created: Mobile App" time="5 hours ago" />
                <ActivityItem text="Team meeting scheduled" time="1 day ago" />
              </ul>
            </div>
          </div>
        )}

        {activeTab !== 'overview' && (
          <div className="text-center py-20 text-gray-500">
            <h2 className="text-xl font-semibold capitalize">{activeTab} Content</h2>
            <p>This section is under construction.</p>
          </div>
        )}
      </main>
    </div>
  );
};

// --- HELPER SUB-COMPONENTS (Keep code clean) ---

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-xs text-green-600 mt-2 font-medium">{trend}</p>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <li className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
    <span className="text-gray-700">{text}</span>
    <span className="text-gray-400">{time}</span>
  </li>
);

export default Dashboard;