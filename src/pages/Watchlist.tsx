import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import withAuth from '../hoc/withAuth';

const Watchlist: React.FC = () => {
    const watchlist = useSelector((state: RootState) => state.watchlist.items);
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return (
        <div className="py-20 text-center">
            <p className="text-gray-400">Please log in to view your watchlist.</p>
        </div>
        );
    };

    return (
        <div className="py-10 min-h-screen bg-gray-950 text-white container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <span className="text-red-600">|</span> My Watchlist
            </h1>
            
            {watchlist.length === 0 ? (
                <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
                    <p className="text-gray-500">Your watchlist is empty. Start exploring movies!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {watchlist.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default withAuth(Watchlist);
