export function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("tr-TR");
}

export function greetingByHour(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "Günaydın";
  if (h < 18) return "İyi günler";
  return "İyi akşamlar";
}
