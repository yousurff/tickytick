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
      <h2 className="text-2xl font-bold text-cream-900 mb-2">Hoş Geldin</h2>
      <p className="text-gray-500 mb-6 text-sm">Kaldığın yerden devam et.</p>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-cream-900 mb-1 ml-1">E-posta</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:border-cream-400 text-cream-900"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1 ml-1">
             <label className="block text-xs font-semibold text-cream-900">Şifre</label>
             {/* Şifremi unuttum ileride eklenebilir */}
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:border-cream-400 text-cream-900"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
          {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Hesabın yok mu?{' '}
        <Link to="/register" className="text-cream-900 font-semibold hover:underline">
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
};

export default Login;