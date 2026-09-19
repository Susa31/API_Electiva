import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('meal_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    const syncFavorites = () => {
      try {
        const saved = localStorage.getItem('meal_favorites');
        setFavorites(saved ? JSON.parse(saved) : []);
      } catch (error) {
        setFavorites([]);
      }
    };

    window.addEventListener('favorites_updated', syncFavorites);
    window.addEventListener('storage', syncFavorites);

    return () => {
      window.removeEventListener('favorites_updated', syncFavorites);
      window.removeEventListener('storage', syncFavorites);
    };
  }, []);

  const toggleFavorite = (id: string) => {
    const currentFavorites = (() => {
      try {
        const saved = localStorage.getItem('meal_favorites');
        return saved ? JSON.parse(saved) : [];
      } catch (error) {
        return [];
      }
    })();

    const newFavorites = currentFavorites.includes(id)
      ? currentFavorites.filter((favId: string) => favId !== id)
      : [...currentFavorites, id];

    localStorage.setItem('meal_favorites', JSON.stringify(newFavorites));
    window.dispatchEvent(new Event('favorites_updated'));
  };

  return { favorites, toggleFavorite };
};