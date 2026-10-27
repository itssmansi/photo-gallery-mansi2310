import { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';

function favouritesReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_FAVOURITE': {
            const photoId = action.payload;

            if (state.includes(photoId)) {
                return state.filter((id) => id !== photoId);
            }

            return [...state, photoId];
        }

        case 'LOAD_FAVOURITES':
            return action.payload;

        default:
            return state;
    }
}

function getInitialFavourites() {
    try {
        const savedFavourites = localStorage.getItem('favourites');
        return savedFavourites ? JSON.parse(savedFavourites) : [];
    } catch {
        return [];
    }
}

function Gallery() {
    const { photos, loading, error } = useFetchPhotos();

    const [favourites, dispatch] = useReducer(
        favouritesReducer,
        undefined,
        getInitialFavourites
    );
    const [search, setSearch] = useState('');

    const handleSearch = useCallback((event) => {
        setSearch(event.target.value);
    }, []);

    const filteredPhotos = useMemo(() => {
        return photos.filter((photo) =>
            photo.author.toLowerCase().includes(search.toLowerCase())
        );
    }, [photos, search]);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="mb-6 text-center text-3xl font-bold">
                Photo Gallery
            </h1>

            <div className="mx-auto mb-6 max-w-md">
                <input
                    type="text"
                    placeholder="Search by author..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredPhotos.map((photo) => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        isFavourite={favourites.includes(photo.id)}
                        onToggleFavourite={(photoId) =>
                            dispatch({
                                type: 'TOGGLE_FAVOURITE',
                                payload: photoId,
                            })
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default Gallery;