import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Sayfalar
import Landing from './pages/Landing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MyDay from './pages/Dashboard/MyDay'
import Calendar from './pages/Dashboard/Calendar'

// Profil Sayfaları (Yeni ekledik)
import ProfileLayout from './pages/Dashboard/Profile/ProfileLayout'
import PersonalInfo from './pages/Dashboard/Profile/PersonalInfo'

// Layouts
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'

// Henüz kodlamadığımız sayfalar için geçici yer tutucu (Hata almanı engeller)
const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center h-full text-cream-400">
    <div className="text-4xl mb-4">🚧</div>
    <h2 className="text-xl font-bold text-cream-900 mb-2">{title}</h2>
    <p className="text-sm">Bu sayfa yapım aşamasında.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Herkese Açık Sayfalar (Landing) */}
        <Route path="/" element={<Landing />} />
        
        {/* Giriş/Kayıt Sayfaları */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Kullanıcı Paneli (Dashboard) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<MyDay />} />
          <Route path="/calendar" element={<Calendar />} />
          
          {/* PROFİL VE ALT SAYFALARI */}
          <Route path="/dashboard/profile" element={<ProfileLayout />}>
            {/* /dashboard/profile adresine gidince direkt Kişisel Bilgiler açılır */}
            <Route index element={<PersonalInfo />} /> 
            
            {/* Diğer linkler şimdilik placeholder gösterir */}
            <Route path="all-tasks" element={<PlaceholderPage title="Bütün Görevler" />} />
            <Route path="past-tasks" element={<PlaceholderPage title="Geçmiş Görevler" />} />
            <Route path="completed-tasks" element={<PlaceholderPage title="Tamamlanmış Görevler" />} />
            <Route path="contact" element={<PlaceholderPage title="İletişim" />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App