import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route,BrowserRouter, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStrore.js'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {checkAuth,authUser,onlineUsers} = useAuthStore();
  const {theme, setTheme} = useThemeStore();

  console.log("onlineUsers",onlineUsers)

  React.useEffect(()=>{
    checkAuth()
  },[checkAuth])

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="h-max text-white bg-fixed" data-theme={theme}>
        <Toaster />
        <Navbar/>
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/settings' element={<SettingPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>   
      </div>
    </div>
  )
}

export default App