import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Mevcut oturumu kontrol et
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Oturum değişikliklerini dinle (Giriş/Çıkış yapıldığında çalışır)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Kayıt Ol Fonksiyonu (Hem Auth hem Profil tablosuna kayıt)
  const signUp = async (email, password, firstName, lastName) => {
    // 1. Supabase Auth'a kayıt et
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // 2. Profiles tablosuna detayları ekle
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
          }
        ]);
      
      if (profileError) throw profileError;
    }
    
    return data;
  };

  // Giriş Yap Fonksiyonu
  const signIn = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  // Çıkış Yap Fonksiyonu
  const signOut = () => {
    return supabase.auth.signOut();
  };

  const value = {
    signUp,
    signIn,
    signOut,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};