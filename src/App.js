import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import MovieBanner from "./components/MovieBanner";
import MoviesCards from "./components/MoviesCards";

const API_KEY = "9f4065b3";
const API_BASE = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [status, setStatus] = useState("loading");

  const displayedMovie = hoveredMovie || selectedMovie;

  async function fetchMovies(query = "action") {
    setStatus("loading");
    setMovies([]);
    setSelectedMovie(null);
    setHoveredMovie(null);
    try {
      const res = await fetch(`${API_BASE}&s=${query}&type=movie`);
      const data = await res.json();

      if (data.Response === "False") {
        setStatus("empty");
        return;
      }

      const unique = data.Search.filter(
        (movie, index, self) =>
          index === self.findIndex(m => m.imdbID === movie.imdbID)
      );

      const results = await Promise.allSettled(
        unique.slice(0, 20).map(async (movie) => {
          const r = await fetch(`${API_BASE}&i=${movie.imdbID}`);
          return r.json();
        })
      );

      const detailed = results
        .filter(r => r.status === "fulfilled")
        .map(r => r.value);

      setMovies(detailed);
      setSelectedMovie(detailed[0]);
      setStatus("success");

    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const movie = hoveredMovie || selectedMovie;
    if (movie?.Poster && movie.Poster !== "N/A") {
      document.body.style.backgroundImage = `url('${movie.Poster}')`;
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [hoveredMovie, selectedMovie]);

  return (
    <div className="overlay">
      <Header onSearch={fetchMovies} />
      <MovieBanner movie={displayedMovie} />
      <MoviesCards
        movies={movies}
        status={status}
        selectedMovie={selectedMovie}
        onSelect={setSelectedMovie}
        onHover={setHoveredMovie}
      />
    </div>
  );
}

export default App;