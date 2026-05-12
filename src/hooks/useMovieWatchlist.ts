import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { addToWatchlist, removeFromWatchlist } from '../store/watchlistSlice';
import type { Movie } from '../types/movie';

export const useMovieWatchlist = () => {
  // Gunakan AppDispatch agar support thunk jika nanti ada logic async
  const dispatch = useDispatch<AppDispatch>();
  
  // Ambil data watchlist
  const watchlist = useSelector((state: RootState) => state.watchlist.items);

  const toggleWatchlist = (movie: Movie) => {
    const isAdded = watchlist.some((m) => m.id === movie.id);
    if (isAdded) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  const isInWatchlist = (movieId: number) => {
    return watchlist.some((m) => m.id === movieId);
  };

  return {
    watchlist,
    toggleWatchlist,
    isInWatchlist,
    count: watchlist.length
  };
};