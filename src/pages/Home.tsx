import React, { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { getPopularMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { useSearchStore } from '../zustand/useSearchStore';
import { useThemeStore } from '../zustand/useThemeStore';

const Home: React.FC = () => {
  // throw new Error("Cuma ngetes doang!");
  const { isDarkMode, toggleTheme } = useThemeStore();

  const [movies, setMovies] = useState<Movie[]>([]);
  const { query, setQuery } = useSearchStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk mengambil data (Populer atau Cari)
  const handleFetchMovies = async (searchQuery?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = searchQuery 
        ? await searchMovies(searchQuery) // Jika ada query, cari film
        : await getPopularMovies();       // Jika kosong, ambil populer
      
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchMovies();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFetchMovies(query); // Panggil API dengan query dari Zustand
  };

  return (
    <div className={`min-h-screen px-4 md:px-8 py-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
      {/* Navbar Section */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-bold bg-linear-to-r from-red-500 to-red-800 bg-clip-text text-transparent tracking-tighter">
          FILMXPLORER
        </h1>

        <button 
          onClick={toggleTheme}
          className={`absolute left-148 px-3 py-1.5 rounded-xs font-bold transition-all ${
            isDarkMode 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-gray-900 text-white hover:bg-black'
          }`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="Search films..."
            className="w-full bg-gray-900 border border-gray-800 text-sm rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1.5 px-5 rounded-full transition-colors"
          >
            Search
          </button>
        </form>
      </header>

      {/* Error & Loading State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg text-center mb-8">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-400">Fetching movies...</p>
        </div>
      ) : (
        <main>
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Oops! Film "{query}" not found.</p>
              <button onClick={() => handleFetchMovies()} className="mt-4 text-red-500 hover:underline">
                Back to popular films.
              </button>
            </div>
          )}
        </main>
      )}
    </div>
  );
};

export default Home;