import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from './components/layouts/PublicLayout';
import LandingPage from './pages/LandingPage';
import PublicErrorPage from './pages/PublicErrorPage';
import AdminAuthPage from './pages/AdminAuthPage';
import AdminProtectRoute from './middleware/AdminProtectRoute';
import AdminDashboard from './components/layouts/AdminDashboard';
import AdminHome from './pages/AdminHome';
import EmployeeAuthPage from './pages/EmployeeAuthPage';
import EmployeeDashboard from './components/layouts/EmployeeDashboard';
import EmployeeHome from './pages/EmployeeHome';


const App = () => {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<PublicLayout/>,
      errorElement:<PublicErrorPage/>,
      children:[
        {
          path:"/",
          element:<LandingPage/>
        },
        {
          path:"/admin-login",
          element:<AdminAuthPage/>
        },
        {
          path:"/employee-login",
          element:<EmployeeAuthPage/>
        }
      ]
    },
    {
      path:"/admin_dashboard",
      element:<AdminDashboard/>,
       children: [
        {
          index: true,
          element: <AdminHome/>,
        },
      ]
    },
    {
      path:"/employee_dashboard",
      element:<EmployeeDashboard/>,
      children:[
        {
          index:true,
          element:<EmployeeHome/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router}/>
}

export default App;