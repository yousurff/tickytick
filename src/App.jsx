import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Sayfalar
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MyDay from './pages/Dashboard/MyDay'
import Calendar from './pages/Dashboard/Calendar'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        
        {/* Auth Routes (Login/Register için özel layout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes (Dashboard) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<MyDay />} />
          <Route path="/calendar" element={<Calendar />} />
          {/* Profil sayfası için geçici bir placeholder veya bileşenin kendisi */}
          <Route path="/dashboard/profile" element={<div>Profil Sayfası Yapım Aşamasında</div>} /> 
        </Route>
      </Routes>
    </Router>
  )
}

export default App