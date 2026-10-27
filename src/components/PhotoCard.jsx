function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <img
                src={`https://picsum.photos/id/${photo.id}/500/350`}
                alt={`Photo by ${photo.author}`}
                className="h-64 w-full object-cover"
            />

            <div className="flex items-center justify-between p-4">
                <p className="font-medium text-gray-800">{photo.author}</p>

                <button
                    onClick={() => onToggleFavourite(photo.id)}
                    aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                    className={`cursor-pointer text-2xl ${isFavourite
                            ? 'text-red-500'
                            : 'text-gray-400 hover:text-red-400'
                        } focus-visible:outline-2 focus-visible:outline-offset-2`}
                >
                    {isFavourite ? '♥' : '♡'}
                </button>
            </div>
        </div>
    );
}

export default PhotoCard;