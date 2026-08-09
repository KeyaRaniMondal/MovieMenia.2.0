const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const TMDB_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    },
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const movieImageUrl = (path, size = 'w500') =>
    path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
