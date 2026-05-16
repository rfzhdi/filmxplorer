import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('Home Component', () => {
    it('harus menampilkan judul dengan benar', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>
        );

        const titleElement = screen.getByText(/FILMXPLORER/i);

        expect(titleElement).toBeInTheDocument();
    });
});
