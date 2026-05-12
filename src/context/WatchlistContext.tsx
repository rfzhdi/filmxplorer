import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Movie } from '../types/movie';

// Definisi struktur data di context
interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  isStored: (id: number) => boolean;
}

// Inisialisasi context
const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// Provider buat wrapper aplikasi
export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const addToWatchlist = (movie: Movie) => {
    if (!isStored(movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
  };

  const isStored = (id: number) => watchlist.some((m) => m.id === id);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isStored }}>
      {children}
    </WatchlistContext.Provider>
  );
};