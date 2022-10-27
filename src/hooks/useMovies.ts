import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { MovieProps, MovieRequest } from "../@types";
import { api } from "../services/api";

interface UserMovieProps {
  pageNumber: number;
  search: string;
}

export const useMovies = ({ pageNumber = 1, search }: UserMovieProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [totalPages, setTotalPages] = useState(50);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});

  const fetchMovies = useCallback(
    async (page: number, searchString: string, controller: AbortController) => {
      await api
        .get<MovieRequest>(
          `/movies/search/?Title=${searchString}&per_page=20&page=${page}`,
          {
            signal: controller.signal, // controller value to cancel req when user is typing
          }
        )
        .then((response) => {
          setTotalPages(response.data.total_pages);
          if (page === 1) {
            setMovies(response.data.data);
          } else {
            setMovies((prev) => [...prev, ...response.data.data]);
          }

          setLoading(false);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            return;
          }
          setLoading(false);
          setError(error);
          setIsError(true);
        });
      controller.abort();
    },
    []
  );

  const resetData = () => {
    setIsError(false);
    setError({});
    setMovies([]);
    setTotalPages(50);
    setLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();

    if (search.length === 0) {
      resetData();
      return;
    }

    if (totalPages < pageNumber) {
      return;
    }

    if (pageNumber === 1) {
      //here is when user is in the page 1
      setLoading(true);
      setIsError(false);
      setError({});
      fetchMovies(pageNumber, search, controller);
    }

    if (pageNumber > 1) {
      //here is for other pages
      setLoading(true);
      setIsError(false);
      setError({});
      fetchMovies(pageNumber, search, controller);
    }
    return () => controller.abort(); // controller to cancel req when user is typing
  }, [search, pageNumber]);

  return {
    movies,
    totalPages,
    loading,
    isError,
    error,
    resetData,
  };
};
