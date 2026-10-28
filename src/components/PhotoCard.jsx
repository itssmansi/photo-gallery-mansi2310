function PhotoCard({ photo, isFavourite, onFavouriteChange }) {
    return (
        <article className="group overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative overflow-hidden bg-stone-100">
                <img
                    src={`https://picsum.photos/id/${photo.id}/500/350`}
                    alt={`Photo by ${photo.author}`}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                    type="button"
                    onClick={() => onFavouriteChange(photo.id)}
                    aria-label={
                        isFavourite
                            ? `Remove photo by ${photo.author} from favourites`
                            : `Add photo by ${photo.author} to favourites`
                    }
                    aria-pressed={isFavourite}
                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-2xl shadow-sm backdrop-blur-sm transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800 ${
                        isFavourite
                            ? 'text-rose-500'
                            : 'text-stone-500 hover:text-rose-500'
                    }`}
                >
                    {isFavourite ? '♥' : '♡'}
                </button>
            </div>

            <div className="flex min-h-[68px] items-center px-4 py-4">
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-stone-800">
                        {photo.author}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                        Photographer
                    </p>
                </div>
            </div>
        </article>
    );
}

export default PhotoCard;
