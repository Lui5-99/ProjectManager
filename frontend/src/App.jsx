import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Forgotpassword from './pages/Forgotpassword'
import Resetpassword from './pages/Resetpassword'
import Confirmaccount from './pages/Confirmaccount'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />}/>
          <Route path="signup" element={<Signup />}/>
          <Route path="forgotpassword" element={<Forgotpassword />}/>
          <Route path="forgotpassword/:id" element={<Resetpassword />}/>
          <Route path="confirmaccount/:id" element={<Confirmaccount />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
