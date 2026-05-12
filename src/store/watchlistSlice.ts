import type { Movie } from '../types/movie';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WatchlistState {
    items: Movie[];
}

const initialState: WatchlistState = {
    // items: JSON.parse(localStorage.getItem('watchlist') || '[]'),
    items: [],
};

const watchlistSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        addToWatchlist: (state, action: PayloadAction<Movie>) => {
            const exists = state.items.find(m => m.id === action.payload.id);
            if (!exists) {
                state.items.push(action.payload);
                // localStorage.setItem('watchlist', JSON.stringify(state.items));
            }
        },
        removeFromWatchlist: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(m => m.id !== action.payload);
            // localStorage.setItem('watchlist', JSON.stringify(state.items));
        },
    },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
