import React from 'react';
import type { Movie } from '../types/movie';
import { getImageUrl } from '../services/api';

// Definisi tipe buat props yg diterima
interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-lg">
      <div className="relative aspect-[2\/3] overflow-hidden">
        <img 
          src={movie.poster_path ? getImageUrl(movie.poster_path) : 'https://via.placeholder.com/500x750?text=No+Image'} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:opacity-50 transition-opacity duration-300"
        />
        {/* Overlay overview saat hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black to-transparent">
            <p className="text-xs text-gray-300 line-clamp-3 mb-2">{movie.overview}</p>
            <span className="text-xs font-bold text-red-500">Read More →</span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate mb-1 group-hover:text-red-500 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-yellow-500 flex items-center">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">
            {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;