import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookmarkContext from "./contexts/BookmarkContext";
import ArtDetails from "./components/ArtDetails";
import ArtList from "./components/ArtList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [bookmarkSet, setBookmarkSet] = useState(new Set());
  const addToBookmarkSet = (id) => {
    setBookmarkSet((prevIds) => {
      const newIds = new Set(prevIds);
      newIds.add(id);
      return newIds;
    });
  };
  const customContextValue = {
    bookmarkSet,
    addToBookmarkSet,
  };
  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <BookmarkContext.Provider value={customContextValue}>
            <header className="text-center text-white text-5xl w-full p-10 bg-teal-600">
              <Link to="/">Rijksmuseum Virtual Tour</Link>
            </header>
            <Routes>
              <Route path="/" element={<ArtList />} />
              <Route path="/details/:id" element={<ArtDetails />} />
            </Routes>
          </BookmarkContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
