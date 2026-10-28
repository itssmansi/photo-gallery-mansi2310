# Photo Gallery

A responsive photo gallery built with React, Vite, and Tailwind CSS. It fetches photos from the Picsum Photos API and lets users search for photographers and save their favourite photos.

## Features

- **Photo Gallery:** Fetches 30 photos from the Picsum Photos API.
- **Responsive Layout:** Displays one column on mobile, two on tablets, and four on desktop screens.
- **Author Search:** Filters photos by photographer name in real time without making additional API requests.
- **Favourites:** Add or remove photos from favourites using the heart button.
- **Persistent Favourites:** Saves favourites in the browser's localStorage so they remain available after refreshing the page.
- **Loading and Error States:** Provides feedback while photos are loading and when a request fails.
- **Empty Search State:** Displays a message when no photos match the search.
- **Reusable Components:** Separates the gallery and individual photo cards for easier maintenance.

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Picsum Photos API
- Browser localStorage

## React Concepts Used

- **Custom Hook (`useFetchPhotos`):** Fetches photos and manages loading and error states.
- **`useReducer`:** Manages adding and removing favourite photos through explicit actions.
- **`useEffect`:** Fetches data through the custom hook and saves updated favourites to localStorage.
- **`useState`:** Manages the author's search input.
- **`useCallback`:** Memoizes the search handler.
- **`useMemo`:** Memoizes the filtered photo list until the photos or search query changes.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- Git, if you want to clone the repository.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate to the project directory:

   ```bash
   cd photo-gallery
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
  