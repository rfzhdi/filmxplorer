import { describe, it, expect } from 'vitest';
import watchlistReducer, { addToWatchlist, removeFromWatchlist } from '../store/watchlistSlice';
import type { Movie } from '../types/movie';

const mockMovie: Movie = {
    id: 1,
    title: 'Interstellar',
    poster_path: '/path.jpg',
    vote_average: 8.6,
    release_date: '2014-11-07',
    overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
}

describe('watchlistSlice', () => {
    it('should handle adding a movie to the watchlist', () => {
        const initialState = { items: [] };
        const action = addToWatchlist(mockMovie);
        const state = watchlistReducer(initialState, action);

        expect(state.items).toHaveLength(1);
        expect(state.items[0].title).toEqual(mockMovie.title);
    });

    it('should not add duplicate movies to the watchlist', () => {
        const initialState = { items: [mockMovie] };
        const action = addToWatchlist(mockMovie);
        const state = watchlistReducer(initialState, action);

        expect(state.items).toHaveLength(1);
    });

    it('should handle removing a movie from the watchlist', () => {
        const initialState = { items: [mockMovie] };
        const action = removeFromWatchlist(mockMovie.id);
        const state = watchlistReducer(initialState, action);

        expect(state.items).toHaveLength(0);
    });
});
