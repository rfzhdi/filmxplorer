import React from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { withAuth } from '../hoc/withAuth';

const Watchlist: React.FC = () => {
    const { watchlist } = useWatchlist();

    return (
        <div className="py-10">
            <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
            {watchlist.length === 0 ? (
                <p className="text-gray-500">The list is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {watchlist.map(movie => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default withAuth(Watchlist);
