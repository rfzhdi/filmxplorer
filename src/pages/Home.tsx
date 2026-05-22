import React from "react";
import MovieCard from "../components/MovieCard";
import { useSearchStore } from "../zustand/useSearchStore";
import { useThemeStore } from "../zustand/useThemeStore";
import { useMovies } from "../hooks/useMovies";

const Home: React.FC = () => {
  // throw new Error("Cuma ngetes doang!");
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { query, setQuery } = useSearchStore();

  const { data: movies, isLoading, error, refetch } = useMovies(query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch(); // Panggil API dengan query dari Zustand
  };

  return (
    <div
      className={`min-h-screen px-4 md:px-8 py-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors`}
    >
      {/* Navbar Section */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1
          className={`text-4xl font-bold bg-clip-text text-transparent! tracking-tighter transition-all duration-300 ${
            isDarkMode
              ? "bg-linear-to-r from-red-500 to-red-800" // Mode Gelap: Merah cerah ke merah tua
              : "bg-linear-to-r from-red-700 to-black" // Mode Terang: Merah gelap ke hitam agar kontras
          }`}
        >
          FILMXPLORER
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center shadow-sm ${
              isDarkMode
                ? "bg-gray-200 border-gray-700 text-yellow-400 hover:bg-gray-700 hover:shadow-yellow-500/10"
                : "bg-gray-800 border-gray-700 text-gray-600 hover:bg-gray-50 hover:shadow-md"
            }`}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label={
              isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            <span className="text-xl leading-none">
              {isDarkMode ? "☀️" : "🌙"}
            </span>
          </button>

          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full md:w-96 group"
          >
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
        </div>
      </header>

      {/* Error & Loading State */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg text-center mb-8">
          {(error as Error).message}
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mb-4"></div>
          <p className="text-gray-400">Fetching movies...</p>
        </div>
      ) : (
        <main>
          {movies && movies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                Oops! Film "{query}" not found.
              </p>
              <button
                onClick={() => refetch()}
                className="mt-4 text-red-500 hover:underline"
              >
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
