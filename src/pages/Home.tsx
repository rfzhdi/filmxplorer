import React, { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { getPopularMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleFetchMovies();
  }, []);

  const handleFetchMovies = async () => {
    try {
      setIsLoading(true);
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setIsLoading(true);
      const results = await searchMovies(searchTerm);
      setMovies(results);
    } catch (err) {
      setError("Gagal mencari film");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 md:px-8 py-6">
      {/* Navbar Section */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-4xl font-bold bg-linear-to-r from-red-500 to-red-800 bg-clip-text text-transparent tracking-tighter">
          FILMXPLORER
        </h1>
        
        <form onSubmit={handleSearch} className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="Search films..."
            className="w-full bg-gray-900 border border-gray-800 text-sm rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <p className="text-xl text-gray-500">Oops! Film "{searchTerm}" not found.</p>
              <button onClick={handleFetchMovies} className="mt-4 text-red-500 hover:underline">
                Back to popular films.
              </button>
            </div>
          )}
        </main>
      )}
      
    {/* --- Section Comment --- */}
      <section className="mt-20 border-t border-gray-800 pt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-red-600">|</span> Discussion
        </h2>
        
        <form className="mb-10 group">
          <textarea 
            placeholder="What do you think about these movies?" 
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all min-h-25 mb-4"
          />
          <button 
            type="submit" 
            className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-lg"
          >
            Post Comment
          </button>
        </form>

        {/* Contoh Komentar
        <div className="space-y-6">
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
            <p className="text-sm font-semibold text-red-500 mb-1">User123</p>
            <p className="text-gray-400 text-sm">Wah, Filmxplorer ngebantu banget cari referensi film malam minggu!</p>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default Home;