import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from './components/layouts/PublicLayout';
import LandingPage from './pages/LandingPage';
import PublicErrorPage from './pages/PublicErrorPage';
import AdminAuthPage from './pages/AdminAuthPage';


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
        }
      ]
    }
  ]);

  return <RouterProvider router={router}/>
}

export default App;