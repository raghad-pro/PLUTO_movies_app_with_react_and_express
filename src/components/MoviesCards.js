import "../App.css";
import { useRef, useState } from "react";
import StateMessage from "./StateMessage";

export default function MoviesCards({
  movies = [],
  status,
  selectedMovie,
  onSelect,
  onHover,
  onView,
  onEdit,
  onDelete,
}) {
  const slidersRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  function handleScroll() {
    const el = slidersRef.current;
    setIsStart(el.scrollLeft === 0);
    setIsEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 5);
  }

  function handleMouseEnter(movie) { onHover(movie); }
  function handleMouseLeave()      { onHover(null);  }

  function handleClick(movie) {
    onHover(null);
    onSelect(movie);
  }

  if (status === "loading") return (
    <StateMessage icon="fas fa-spinner fa-spin" title="Loading..." subtitle="Please wait" />
  );
  if (status === "error") return (
    <StateMessage icon="fas fa-circle-exclamation" title="Something went wrong" subtitle="Please try again later" />
  );
  if (status === "empty") return (
    <StateMessage icon="fas fa-film" title="No Results Found" subtitle="Try searching for a different movie" />
  );

  return (
    <section id="slider">
      <div className="container">

        <div className="buttons">
          <button
            onClick={() => slidersRef.current.scrollBy({ left: -300, behavior: "smooth" })}
            disabled={isStart}
            style={{ opacity: isStart ? 0.4 : 1 }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <button
            onClick={() => slidersRef.current.scrollBy({ left: 300, behavior: "smooth" })}
            disabled={isEnd}
            style={{ opacity: isEnd ? 0.4 : 1 }}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>

        <div className="sliders" ref={slidersRef} onScroll={handleScroll}>
          {movies.map((movie, index) => (
            <div
              key={`${movie.imdbID}-${index}`}
              className={`movie-card ${selectedMovie?.imdbID === movie.imdbID ? "selected" : ""}`}
              onClick={() => handleClick(movie)}
              onMouseEnter={() => handleMouseEnter(movie)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Poster"}
                alt={movie.Title || "Movie"}
                onError={(e) => { e.target.src = "https://placehold.co/300x450?text=No+Poster"; }}
              />

              <div className="card-overlay">
                <div className="card-actions">
                  <button
                    className="card-action-btn view"
                    title="show details"
                    onClick={(e) => { e.stopPropagation(); onView(movie); }}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="card-action-btn edit"
                    title="update"
                    onClick={(e) => { e.stopPropagation(); onEdit(movie); }}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    className="card-action-btn delete"
                    title="delete"
                    onClick={(e) => { e.stopPropagation(); onDelete(movie); }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
