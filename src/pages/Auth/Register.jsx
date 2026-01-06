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
      return setError('Şifreler eşleşmiyor.');
    }

    if (formData.password.length < 6) {
      return setError('Şifre en az 6 karakter olmalıdır.');
    }

    try {
      setLoading(true);
      await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
      // Başarılı olursa Dashboard'a veya Login'e yönlendir
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-cream-900 mb-2">Aramıza Katıl</h2>
      <p className="text-gray-500 mb-6 text-sm">Hesabını oluştur ve planlamaya başla.</p>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-cream-900 mb-1 ml-1">İsim</label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:border-cream-400 text-cream-900"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-cream-900 mb-1 ml-1">Soyisim</label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:border-cream-400 text-cream-900"
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-cream-900 mb-1 ml-1">E-posta</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:border-cream-400 text-cream-900"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cream-900 mb-1 ml-1">Şifre</label>
          <input
            type="password"
            name="password"
            required
            className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:border-cream-400 text-cream-900"
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-cream-900 mb-1 ml-1">Şifre Tekrar</label>
          <input
            type="password"
            name="confirmPassword"
            required
            className="w-full px-4 py-2 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:border-cream-400 text-cream-900"
            onChange={handleChange}
          />
        </div>

        <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
          {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Zaten hesabın var mı?{' '}
        <Link to="/login" className="text-cream-900 font-semibold hover:underline">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
};

export default Register;