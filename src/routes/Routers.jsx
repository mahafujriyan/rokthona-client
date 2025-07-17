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
        }
    ]
  },
]);


export default router;