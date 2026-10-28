import { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import PhotoCard from './PhotoCard';

function favouritesReducer(state, action) {
    switch (action.type) {
        case 'ADD_FAVOURITE':
            if (state.includes(action.payload)) {
                return state;
            }
            return [...state, action.payload];

        case 'REMOVE_FAVOURITE':
            return state.filter((id) => id !== action.payload);

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
            photo.author.toLowerCase().includes(search.toLowerCase().trim())
        );
    }, [photos, search]);

    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    function handleFavouriteChange(photoId) {
        if (favourites.includes(photoId)) {
            dispatch({
                type: 'REMOVE_FAVOURITE',
                payload: photoId,
            });
        } else {
            dispatch({
                type: 'ADD_FAVOURITE',
                payload: photoId,
            });
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-50">
                <div
                    role="status"
                    aria-label="Loading photos"
                    className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-50 px-6">
                <p role="alert" className="text-center text-red-600">
                    {error}. Please refresh the page and try again.
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-stone-50 text-stone-900">
            <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
                <header className="mb-10 border-b border-stone-200 pb-8 sm:mb-12 sm:pb-10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500">
                        The collection · 2026
                    </p>

                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div>
                            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                                Photo Gallery
                                <span className="text-stone-400">.</span>
                            </h1>
                        </div>

                        <div className="w-full lg:max-w-sm">
                            <label
                                htmlFor="author-search"
                                className="mb-2 block text-xs font-medium uppercase tracking-wider text-stone-500"
                            >
                                Find a photographer
                            </label>

                            <div className="relative">
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                                >
                                    <circle cx="11" cy="11" r="7" />
                                    <path d="m16 16 4 4" />
                                </svg>

                                <input
                                    id="author-search"
                                    type="search"
                                    placeholder="Search by author..."
                                    value={search}
                                    onChange={handleSearch}
                                    className="w-full rounded-xl border border-stone-200 bg-white py-3.5 pl-12 pr-4 text-sm text-stone-800 shadow-sm outline-none transition placeholder:text-stone-400 hover:border-stone-300 focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                <section aria-label="Photo collection">
                    <div className="mb-6 flex items-center justify-between gap-4">
                        <p className="text-sm text-stone-500">
                            <span className="font-semibold text-stone-800">
                                {filteredPhotos.length}
                            </span>{' '}
                            {filteredPhotos.length === 1
                                ? 'photograph'
                                : 'photographs'}
                        </p>
                    </div>

                    {filteredPhotos.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                            {filteredPhotos.map((photo) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    isFavourite={favourites.includes(photo.id)}
                                    onFavouriteChange={handleFavouriteChange}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-stone-300 px-6 py-16 text-center">
                            <p className="text-lg font-medium text-stone-800">
                                No photographs found
                            </p>
                            <p className="mt-2 text-sm text-stone-500">
                                Try searching with a different author name.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Gallery;
