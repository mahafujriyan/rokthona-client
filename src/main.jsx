import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './routes/Routers.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Layouts/AuthProvider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
           <RouterProvider router={router} />
             <Toaster position="top-center" reverseOrder={false} />
      </QueryClientProvider>
    
    </AuthProvider>
  </StrictMode>
)
