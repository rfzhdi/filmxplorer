import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getImageUrl } from '../services/api';
import { commentReducer } from '../reducers/commentReducer';
import type { Movie } from '../types/movie';
import CommentItem from '../components/CommentItem';
import styled from 'styled-components';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [comments, dispatch] = useReducer(commentReducer, []);
  const [text, setText] = useState("")

  const handleAdd = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch({ type: 'ADD_COMMENT', payload: text });
    setText("");
  }, [text]);

  const handleDelete = useCallback((id: number) => {
    dispatch({ type: 'DELETE_COMMENT', payload: id });
  }, []);

// Styled Components
  const ActionButton = styled.button<{ $primary?: boolean }>`
    background-color: ${props => props.$primary ? '#dc2626' : 'transparent'};
    color: white; 
    padding: 12px 32px;
    border-radius: 9999px;
    font-weight: bold;
    border: 2px solid #dc2626;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #b91c1c;
      transform: scale(1.05);
    }
  `;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (id) {
          const data = await getMovieDetails(id);
          setMovie(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="text-center bg-gray-950 py-20 text-gray-400">Loading details...</div>;
  if (!movie) return <div className="text-center bg-gray-950 py-20 text-red-500">Movie not found!</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Backdrop */}
      <div className="relative h-100 w-full">
        <img 
          src={movie.poster_path ? getImageUrl(movie.poster_path) : 'https://via.placeholder.com/500x750?text=No+Image'}
          className="w-full h-full object-cover opacity-30 blur-sm"
          alt="backdrop"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-transparent"></div>
      </div>

      <div className="container mx-auto px-8 -mt-75 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
            <img 
              src={movie.poster_path ? getImageUrl(movie.poster_path) : 'https://via.placeholder.com/500x750?text=No+Image'}
              className="rounded-2xl shadow-2xl border border-gray-800"
              alt={movie.title}
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-6 text-gray-400">
              <span className="bg-red-600/20 text-red-500 px-3 py-1 rounded text-sm font-bold">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date}</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-red-600">|</span> Overview
            </h2>
            <p className="text-gray-400 leading-relaxed text-justify text-sm mb-8">
              {movie.overview}
            </p>

            <ActionButton className="m-6" $primary>Add to Watchlist</ActionButton>
          </div>
        </div>
      </div>
      <section className="mt-20 border-t border-gray-800 pt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-red-600">|</span> Discussion
        </h2>
            <form className="mb-10 group" onSubmit={handleAdd}>
              <textarea placeholder="What do you think about these movies?"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all min-h-25 mb-4"
              value={text}
              onChange={(e) => setText(e.target.value)} />
              <button type="submit"
              className="bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-lg">
                Post
              </button>
            </form>

            {comments.map(c => (
              <CommentItem key={c.id} comment={c} onDelete={handleDelete} />
            ))}
      </section>
    </div>
  );
};

export default MovieDetail;