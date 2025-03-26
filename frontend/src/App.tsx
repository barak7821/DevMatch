import { Route, Routes } from "react-router-dom"
import Main from './pages/Main'
import NotFound from './pages/NotFound'
import Connection from "./pages/Connection"
import Message from "./pages/Message"
import Login from "./pages/Login"
import Register from "./pages/Register"
import LandingPage from "./pages/LandingPage"
import Profile from "./pages/Profile"
import ProtectedRoute from "./utils/ProtectedRoute"
import UpdateInfo from "./pages/UpdateInfo"
import UpdateEmail from "./pages/UpdateEmail"
import UpdatePassword from "./pages/UpdatePassword"
import DeleteAccount from "./pages/DeleteAccount"
import ProfileImage from "./pages/ProfileImage"

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="signup" element={<Register />} />
      <Route path="signup/upload" element={<ProfileImage />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
      <Route path="connection" element={<ProtectedRoute><Connection /></ProtectedRoute>} />
      <Route path="message" element={<ProtectedRoute><Message /></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="profile/updateinfo" element={<ProtectedRoute><UpdateInfo /></ProtectedRoute>} />
      <Route path="profile/updateemail" element={<ProtectedRoute><UpdateEmail /></ProtectedRoute>} />
      <Route path="profile/updatepassword" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
      <Route path="profile/deleteaccount" element={<ProtectedRoute><DeleteAccount /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
