import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import MovieBanner from "./components/MovieBanner";
import MoviesCards from "./components/MoviesCards";
import MovieDetailPage from "./components/MovieDetailPage";
import ConfirmModal from "./components/ConfirmModal";
import MovieFormModal from "./components/MovieFormModal";
import Toast from "./components/Toast";

const API_KEY = "9f4065b3";
const API_BASE = `https://www.omdbapi.com/?apikey=${API_KEY}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [status, setStatus] = useState("loading");

  const [page, setPage] = useState("home");
  const [detailMovie, setDetailMovie] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editMovie, setEditMovie] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [toast, setToast] = useState(null);
  const [saveBanner, setSaveBanner] = useState(false);

  const displayedMovie = hoveredMovie || selectedMovie;

  function showToast(message, type = "success") {
    setToast({ message, type });
  }

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
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => { fetchMovies(); }, []);

  useEffect(() => {
    const movie = hoveredMovie || selectedMovie;
    if (movie?.Poster && movie.Poster !== "N/A") {
      document.body.style.backgroundImage = `url('${movie.Poster}')`;
    } else {
      document.body.style.backgroundImage = "none";
    }
  }, [hoveredMovie, selectedMovie]);

  function handleView(movie) {
    setDetailMovie(movie);
    setPage("detail");
  }

  function handleDeleteRequest(movie) {
    setConfirmDelete(movie);
  }

  function handleDeleteConfirm() {
    setMovies(prev => prev.filter(m => m.imdbID !== confirmDelete.imdbID));
    if (selectedMovie?.imdbID === confirmDelete.imdbID) setSelectedMovie(null);
    if (detailMovie?.imdbID === confirmDelete.imdbID) setPage("home");
    setConfirmDelete(null);
    showToast("تم الحذف بنجاح", "success");
  }

  function handleEditRequest(movie) {
    setEditMovie(movie);
  }

  function handleEditSave(updated) {
    setMovies(prev => prev.map(m => m.imdbID === updated.imdbID ? updated : m));
    if (selectedMovie?.imdbID === updated.imdbID) setSelectedMovie(updated);
    if (detailMovie?.imdbID === updated.imdbID) setDetailMovie(updated);
    setEditMovie(null);
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  }

  function handleAddSave(newMovie) {
    setMovies(prev => [newMovie, ...prev]);
    setSelectedMovie(newMovie);
    setShowAddModal(false);
    showToast("تم الإضافة بنجاح", "success");
  }

  if (page === "detail" && detailMovie) {
    return (
      <>
        <MovieDetailPage
          movie={detailMovie}
          onBack={() => setPage("home")}
          onEdit={handleEditRequest}
          onDelete={handleDeleteRequest}
        />
        {confirmDelete && (
          <ConfirmModal
            title={confirmDelete.Title}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
        {editMovie && (
          <MovieFormModal
            movie={editMovie}
            isEdit
            onSave={handleEditSave}
            onClose={() => setEditMovie(null)}
          />
        )}
        {saveBanner && <div className="save-banner">Saved Successfully</div>}
        {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      </>
    );
  }

  return (
    <div className="overlay">
      <Header onSearch={fetchMovies} onAdd={() => setShowAddModal(true)} />
      <MovieBanner movie={displayedMovie} />
      <MoviesCards
        movies={movies}
        status={status}
        selectedMovie={selectedMovie}
        onSelect={setSelectedMovie}
        onHover={setHoveredMovie}
        onView={handleView}
        onEdit={handleEditRequest}
        onDelete={handleDeleteRequest}
      />
      {confirmDelete && (
        <ConfirmModal
          title={confirmDelete.Title}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
      {editMovie && (
        <MovieFormModal
          movie={editMovie}
          isEdit
          onSave={handleEditSave}
          onClose={() => setEditMovie(null)}
        />
      )}
      {showAddModal && (
        <MovieFormModal
          onSave={handleAddSave}
          onClose={() => setShowAddModal(false)}
        />
      )}
      {saveBanner && <div className="save-banner">Saved Successfully</div>}
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

export default App;
