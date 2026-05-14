import { useQuery } from '@tanstack/react-query';
import { getPopularMovies, searchMovies } from '../services/api';

export const useMovies = (query: string) => {
    return useQuery({
        // queryKey = Key Cache
        queryKey: ['movies', query],
        queryFn: () => query ? searchMovies(query) : getPopularMovies(),
        staleTime: 1000 * 60 * 5,
    });
};
