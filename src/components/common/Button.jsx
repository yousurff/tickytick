import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', // primary, outline, ghost
  to, 
  onClick, 
  className = '', 
  type = 'button' 
}) => {
  
  // Temel stiller (Montserrat fontu, yuvarlatılmış köşeler, plaza görünümü)
  const baseStyles = "inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans";
  
  // Varyasyonlar (Renk paletine göre )
  const variants = {
    primary: "bg-cream-900 text-cream-50 hover:bg-opacity-90 shadow-sm", // Koyu buton
    outline: "border-2 border-cream-900 text-cream-900 hover:bg-cream-200", // Çerçeveli
    ghost: "text-cream-900 hover:bg-cream-200 bg-transparent" // Arkaplansız
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  // Eğer 'to' prop'u varsa Link olarak, yoksa button olarak render et
  if (to) {
    return (
      <Link to={to} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;