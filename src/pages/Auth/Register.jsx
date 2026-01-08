import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Şifreler birbiriyle eşleşmiyor.');
    }

    if (formData.password.length < 6) {
      return setError('Şifre en az 6 karakter olmalıdır.');
    }

    try {
      setLoading(true);
      await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* YENİ: Geri Dön Butonu */}
      <div className="mb-6 -mt-2">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-cream-400 hover:text-cream-900 transition-colors uppercase tracking-wider group">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
             <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
           </svg>
           Anasayfa
        </Link>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cream-900">Aramıza Katıl</h2>
        <p className="text-gray-500 text-sm mt-1">Hesabını oluştur, hayatını düzenlemeye başla.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs font-medium p-3 rounded-xl mb-4 border border-red-100 flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cream-900/70 mb-1.5 ml-1">İsim</label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full px-4 py-3 bg-white/60 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent text-cream-900 transition-all"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cream-900/70 mb-1.5 ml-1">Soyisim</label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full px-4 py-3 bg-white/60 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent text-cream-900 transition-all"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-cream-900/70 mb-1.5 ml-1">E-posta</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-white/60 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent text-cream-900 transition-all"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-cream-900/70 mb-1.5 ml-1">Şifre</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-3 bg-white/60 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent text-cream-900 transition-all"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-cream-900/70 mb-1.5 ml-1">Şifre Tekrar</label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="w-full px-4 py-3 bg-white/60 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent text-cream-900 transition-all"
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-3.5 mt-2 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5" disabled={loading}>
          {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        Zaten hesabın var mı?{' '}
        <Link to="/login" className="text-cream-900 font-bold hover:text-cream-400 transition-colors">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
};

export default Register;