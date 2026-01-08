import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      setError('Giriş yapılamadı. Bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-cream-900">Tekrar Hoş Geldin</h2>
        <p className="text-gray-500 text-sm mt-1">Planlamaya kaldığın yerden devam et.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-xs font-medium p-3 rounded-xl mb-4 border border-red-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-cream-900/70 mb-1.5 ml-1">E-posta</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/60 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent text-cream-900 placeholder-cream-300 transition-all"
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1.5 ml-1">
             <label className="block text-xs font-bold uppercase tracking-wider text-cream-900/70">Şifre</label>
             {/* Şifremi unuttum eklenebilir */}
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/60 border border-cream-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cream-400 focus:border-transparent text-cream-900 placeholder-cream-300 transition-all"
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full py-3.5 mt-2 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5" disabled={loading}>
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-500">
        Hesabın yok mu?{' '}
        <Link to="/register" className="text-cream-900 font-bold hover:text-cream-400 transition-colors">
          Hemen Kayıt Ol
        </Link>
      </div>
    </div>
  );
};

export default Login;