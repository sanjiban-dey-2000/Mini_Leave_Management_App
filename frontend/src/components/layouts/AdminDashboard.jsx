// src/components/layouts/AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                Overview
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                Reports
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className="block px-3 py-2 rounded hover:bg-gray-700"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 py-2 px-4 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
