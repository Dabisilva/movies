/* eslint-disable react/display-name */
import React from "react";
import { AiOutlineStar, AiOutlineInfoCircle } from "react-icons/ai";

import { MovieProps } from "../@types";

interface MovieCardsProps {
  data: MovieProps;
}

const MovieCard = React.forwardRef(({ data }: MovieCardsProps, ref: any) => {
  const MovieBody = () => (
    <>
      <div className="movie-card">
        <div>
          <div className="movie-info">
            <span>
              {data.Title.length > 40
                ? `${data.Title.slice(0, 40)}...`
                : data.Title}
            </span>
            <div className="meta">
              <p>{data.Year}</p>
            </div>
          </div>
          <div className="movie-fotter">
            <button>
              <AiOutlineStar size={24} color="yellow" />
            </button>
            <button>
              <AiOutlineInfoCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const content = ref ? (
    <article ref={ref}>
      <MovieBody />
    </article>
  ) : (
    <article>
      <MovieBody />
    </article>
  );

  return content;
});

export default MovieCard;
