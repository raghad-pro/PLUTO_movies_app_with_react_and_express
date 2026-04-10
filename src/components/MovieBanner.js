import { useState, useRef, useEffect } from "react";

export default function MovieBanner({ movie }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const titleRef = useRef(null);
useEffect(() => {
  const checkTruncation = () => {
    if (titleRef.current) {
      setIsTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
  };

  checkTruncation();
  window.addEventListener("resize", checkTruncation);

  return () => window.removeEventListener("resize", checkTruncation);
}, [movie?.Title]);

  if (!movie) return null;

  return (
    <section id="hero">
      <div className="container">
        <div className="title-wrapper">
          <h1
            ref={titleRef}
            onMouseEnter={() => isTruncated && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            style={{ cursor: isTruncated ? "help" : "default" }}
          >
            {movie.Title || "Unknown Title"}
          </h1>

          {showTooltip && isTruncated && (
            <div className="tooltip">
              <span className="tooltip-label">full title</span>
              {movie.Title}
              <div className="tooltip-arrow"></div>
            </div>
          )}
        </div>

        <div className="details">
          <span>IMDb</span>
          <span>
            {movie.imdbRating ?? "Not Rated"} · {movie.Year ?? "Unknown Year"}
          </span>
          <span>{movie.Runtime ?? "Duration Unknown"}</span>
          <span>{movie.Genre ?? "Genre Unknown"}</span>
        </div>

        <p className="description">{movie.Plot || ""}</p>
      </div>
    </section>
  );
}
