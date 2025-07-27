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
import Donner from '../pages/DashboardData/Donner/Donner';
import MyDonationRequest from '../pages/DashboardData/Donner/MyDonationRequest';
import CreateDonation from '../pages/DashboardData/Donner/CreateDonation';
import EditRequest from '../pages/DashboardData/Donner/EditRequest';
import Admin from '../pages/DashboardData/Admin/Admin';
import AllUsers from '../pages/DashboardData/Admin/AllUsers';
import AllRequest from '../pages/DashboardData/Admin/AllRequest';
import ContentMangment from '../pages/DashboardData/Admin/ContentMangment';

import PrivateRoute from './PrivateRoute';
import DonationPublic from '../pages/DonationRequestPublic/DonationPublic';
import AdminOrVolenter from './AdminOrVolenter';
import PaymentHistory from '../pages/Funding/PaymentHistory';
import CreatePayment from '../pages/Funding/CreatePayment';
import VolunteerRoute from './VlounterRoute';
import Volunteers from '../pages/DashboardData/Volenters/Volunteers';
import ViewRequest from '../pages/DashboardData/Donner/ViewRequest';
import SearchDonner from '../pages/Search/SearchDonner';
import AddBlog from '../pages/Blog/AddBlog';
import BlogDetail from '../pages/Blog/BlogDetails';
import PublicBlogList from '../pages/Blog/PublicBlogList';
import ViewDonation from '../pages/DonationRequestPublic/ViewDonation';

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
          path:'public-donation',
          element:<DonationPublic></DonationPublic>

        },
        { path:'publicView/:id',
          element:<PrivateRoute>
            <ViewDonation></ViewDonation>
          </PrivateRoute>

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
        },
        {path:'search',
          element:<SearchDonner></SearchDonner>

        },
        {
          
              path: '/blogs',
              element: <PublicBlogList />
       },
       {
        path:'/blog/:id',
        element:<BlogDetail></BlogDetail>

       },
                    
       
      
        {
          path:'/create-payment',
          element:<CreatePayment></CreatePayment>
        },
          
    ]
  },
  {
    path:'/dashboard',
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        index : true,
        element:<Donner></Donner>

      },
      {
        path:"profile",
        element:<Profile></Profile>
      },
      {
        path:'my-donation-requests',
        element:<MyDonationRequest></MyDonationRequest>

      },
      {
        path:'create-donation-request',
        element:<CreateDonation></CreateDonation>

      },
      
    {
      path: 'edit-request/:id',
      element: <EditRequest />
    },
    {path:'request/:id',
      element:<ViewRequest></ViewRequest>

    },
  
    {
      path:"admin-dashboard",
      element:(
        <AdminRoute>
          <Admin></Admin>
        </AdminRoute>
      )

    },
    {path:'volunteers-dashboard',
      element:<VolunteerRoute>
        <Volunteers></Volunteers>
      </VolunteerRoute>

    },
    {
      path:'all-users',
      element:(
        <AdminRoute>
          <AllUsers></AllUsers>
        </AdminRoute>
      )

    },
    {
      path:"all-donation-request",
      element:
        <AdminOrVolenter>
          <AllRequest></AllRequest>
        </AdminOrVolenter>
      

    },
    {
      path:'payment-history',
      element:<PaymentHistory></PaymentHistory>
    },
    
      {
      path: "role-management",
      element: (
        <AdminRoute>
          <RoleManagement />
        </AdminRoute>
      ),
    },
  
  
      // ✅ Blog/Content Management
      { path: 'content-management', element: <ContentMangment /> },
      { path: 'content-management-addBlog', element: <AddBlog /> },
      { path: 'edit-blog/:id', element: <BlogDetail /> },
    
   


    ]
  }
  ,
   {
    path: "/unauthorized",
    element: <Unauthorized />, 
  },
]);


export default router;