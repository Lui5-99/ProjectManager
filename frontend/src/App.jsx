import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Confirmaccount from "./pages/Confirmaccount";
import { AuthProvider } from "./context/AuthProvider";
import RouteProtect from "./layouts/RouteProtect";
import Projects from "./pages/Projects";
import Newproject from "./pages/Newproject";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<Forgotpassword />} />
            <Route path="forgotpassword/:id" element={<Resetpassword />} />
            <Route path="confirmaccount/:id" element={<Confirmaccount />} />
          </Route>
          <Route path="/projects" element={<RouteProtect />}>
            <Route index element={<Projects />} />
            <Route path="newproject" element={<Newproject />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
