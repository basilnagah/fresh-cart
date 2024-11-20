import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Layout from './components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NotFound from './pages/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home/Home'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import UserProvider from './context/user.context'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Cart from './pages/Cart/Cart'
import CartProvider from './context/Cart.context'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import VerifyCode from './pages/verifyCode/verifyCode'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Products from './pages/Products/Products'

function App() {

  const routes = createBrowserRouter([
    {
      path: '/', element: <ProtectedRoute>  <Layout /> </ProtectedRoute>, children: [
        { index: true, element: <Home /> },
        { path: '/products', element: <Products/> },
        { path: '/category/:id', element: <h2>category</h2> },
        { path: '/product/:id', element: <ProductDetails /> },
        { path: '/cart', element: <Cart /> },
        { path: '/allorders', element: <Orders /> },
        { path: '/checkout', element: <Checkout /> },
        { path: '*', element: <NotFound /> },
      ]
    },
    {
      path: '/auth', element: <Layout />, children: [
        { path: 'login', element: <Login /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        { path: 'verifyCode', element: <VerifyCode /> },
        { path: 'resetPassword', element: <ResetPassword /> },
        { path: 'signup', element: <Register /> },
      ]
    }
  ])

  const myClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={myClient}> 
        <UserProvider>
          <CartProvider>
            <RouterProvider router={routes}></RouterProvider>
            <ReactQueryDevtools></ReactQueryDevtools>
            <Toaster />
          </CartProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
