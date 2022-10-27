import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { Loader } from "./Loader";
import MovieCard from "./MovieCard";

export function Content() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // A hook for requests to search movies
  const { movies, loading, totalPages, error, isError } = useMovies({
    pageNumber: page,
    search,
  });

  const observerRef = useRef<any>(null);

  function handleSearchText(text: ChangeEvent<HTMLInputElement>) {
    setSearch(text.target.value);
    setPage(1);
  }

  // this callback make the pagination works. ia basic pagination
  const lastPostRef = useCallback(
    (movie: any) => {
      if (loading) {
        return;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((movies) => {
        if (movies[0].isIntersecting && totalPages > page) {
          setPage((prev) => prev + 1);
        }
      });

      if (movie) {
        observerRef.current.observe(movie);
      }
    },
    [loading]
  );

  // contentn with a rule where the last movie card receives a ref prop
  const content = movies.map((movie, index) => {
    if (movies.length === index + 1) {
      return <MovieCard ref={lastPostRef} key={movie.imdbID} data={movie} />;
    }
    return <MovieCard key={movie.imdbID} data={movie} />;
  });

  return (
    <div className="container">
      <header>
        <input
          type="text"
          placeholder="Search a movie you like"
          onChange={handleSearchText}
        />
      </header>

      <main>
        {<div className="movies-list">{content}</div>}
        {loading && <Loader />}
      </main>
    </div>
  );
}
