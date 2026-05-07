import type { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getPopularMovies = async (): Promise<any[]> => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Gagal mengambil data film");
    const data = await response.json();
    return data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) throw new Error("Gagal mencari film");
    const data = await response.json();
    return data.results;
}

// Helper buat bangun URL gambar
export const getImageUrl = (path: string) => `${IMAGE_BASE_URL}${path}`;