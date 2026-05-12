import React from 'react';
import { Link } from 'react-router-dom';
import { useMovieWatchlist } from '../hooks/useMovieWatchlist';

const Navbar: React.FC = () => {
  const { watchlist } = useMovieWatchlist();

  return (
    <nav className="bg-gray-950 border-b border-gray-800 py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold bg-linear-to-r from-red-500 to-red-800 bg-clip-text text-transparent tracking-tighter">
        FILMXPLORER
      </Link>
      
      <div className="flex gap-6 items-center">
        <Link to="/home" className="text-sm font-medium hover:text-red-500 transition-colors">Home</Link>
        <Link to="/watchlist" className="text-sm font-medium hover:text-red-500 transition-colors">
        Watchlist
        {watchlist.length > 0 && (
          <span className="absolute top-3 right-1 bg-red-600 text-[15px] px-1.5 rounded-full">
            {watchlist.length}
          </span>
        )}
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;