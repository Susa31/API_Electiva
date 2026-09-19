import { useEffect, useState } from "react";

const STORAGE_KEY = "meal_favorites";
const SYNC_EVENT = "favoritesUpdated";

function readFavorites(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as string[]) : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => readFavorites());

  useEffect(() => {
    const syncFavorites = () => setFavorites(readFavorites());

    window.addEventListener(SYNC_EVENT, syncFavorites);
    window.addEventListener("storage", syncFavorites);

    return () => {
      window.removeEventListener(SYNC_EVENT, syncFavorites);
      window.removeEventListener("storage", syncFavorites);
    };
  }, []);

  const toggleFavorite = (id: string) => {
    const current = readFavorites();
    const updated = current.includes(id)
      ? current.filter((favoriteId) => favoriteId !== id)
      : [...current, id];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(SYNC_EVENT));
  };

  return { favorites, toggleFavorite };
}