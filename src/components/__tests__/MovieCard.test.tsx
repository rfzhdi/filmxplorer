import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import watchlistReducer from '../../store/watchlistSlice';
import MovieCard from '../MovieCard';
import { describe, it, expect } from 'vitest';

const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({
        reducer: {
            watchlist: watchlistReducer
        },
    });

    return render(
        <Provider store={store}>
            <BrowserRouter>
                {ui}
            </BrowserRouter>
        </Provider>
    );
};

const mockMovie = {
    id: 1,
    title: 'Interstellar',
    vote_average: 8.6,
};

describe('MovieCard Integration', () => {
    it('should toggle watchlist icon when clicked', () => {
        renderWithProviders(<MovieCard movie={mockMovie as any} />);

        const button = screen.getByRole('button');

        expect(button).toHaveTextContent('🤍');

        fireEvent.click(button);
        expect(button).toHaveTextContent('❤️');

        fireEvent.click(button);
        expect(button).toHaveTextContent('🤍');
    });
});
