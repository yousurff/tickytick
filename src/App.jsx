import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Sayfalar
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MyDay from './pages/Dashboard/MyDay'
import Calendar from './pages/Dashboard/Calendar'

// Profil Sayfaları (Hepsini import ettik)
import ProfileLayout from './pages/Dashboard/Profile/ProfileLayout'
import PersonalInfo from './pages/Dashboard/Profile/PersonalInfo'
import AllTasks from './pages/Dashboard/Profile/AllTasks'
import PastTasks from './pages/Dashboard/Profile/PastTasks'
import CompletedTasks from './pages/Dashboard/Profile/CompletedTasks'
import Contact from './pages/Dashboard/Profile/Contact'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Private Routes (Dashboard) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<MyDay />} />
          <Route path="/calendar" element={<Calendar />} />
          
          {/* PROFİL ROUTE YAPISI (TAMAMLANDI) */}
          <Route path="/dashboard/profile" element={<ProfileLayout />}>
            <Route index element={<PersonalInfo />} /> 
            <Route path="all-tasks" element={<AllTasks />} />
            <Route path="past-tasks" element={<PastTasks />} />
            <Route path="completed-tasks" element={<CompletedTasks />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App