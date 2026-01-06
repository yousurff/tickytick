export const getGreeting = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) return 'Günaydın';
  if (hour >= 12 && hour < 17) return 'İyi Günler';
  if (hour >= 17 && hour < 22) return 'İyi Akşamlar';
  return 'İyi Geceler';
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};