import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayouts from '../Layouts/MainLayouts/MainLayouts';
import Home from '../pages/Home/Home';
import Register from '../Components/Registration/Register';
import LogIn from '../Components/Registration/LogIn';
import CommentPost from '../pages/Home/Contactus/CommentPost';
import AboutUs from '../pages/About/AboutUs';
import ContactUs from '../pages/Home/Contactus/ContactUs';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import Profile from '../pages/Dashboard/Profile';
import RoleManagement from '../pages/Role/RoleManagement';
import AdminRoute from './AdmminRoute';
import Unauthorized from '../Utilities/Unauthorized';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children:[
        {
            index:true,
            element:<Home></Home>
        },
        {
          path:'singUp',
          element:<Register></Register>
        },
        {
          path:'logIn',
          element:<LogIn></LogIn>
        },
        {
          path:'comments',
          element:<CommentPost></CommentPost>
        },
        {
          path:'about',
          element:<AboutUs></AboutUs>
        },
        {
          path:'contact',
          element:<ContactUs></ContactUs>
        }
    ]
  },
  {
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        path:"profile",
        element:<Profile></Profile>
      },
      {
      path: "role-management",
      element: (
        <AdminRoute>
          <RoleManagement />
        </AdminRoute>
      ),
    }

    ]
  }
  ,
   {
    path: "/unauthorized",
    element: <Unauthorized />, 
  },
]);


export default router;