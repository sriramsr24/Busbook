import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import BusRoot from './BusRoot'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Admin from './Admin'
import BookingHistory from './BookingHistory'



let route=createBrowserRouter([
  {
    path : 'home',
    element :<Home/>
  },
  {
    path : 'busroot',
    element : <BusRoot/>
  },
  {
    path : '/',
    element : <Login/>

  },
  {
    path : 'register',
    element : <Register/>
  },
  {
    path : '/admin',
    element : <Admin/>
  },{
    path : 'bookinghistory',
    element : <BookingHistory/>
  }
 
])




createRoot(document.getElementById('root')).render(
 
  <StrictMode>
   <RouterProvider router={route}/>
  </StrictMode>,
)
