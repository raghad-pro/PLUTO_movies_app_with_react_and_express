import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import MovieBanner from "./components/MovieBanner";
import MoviesCards from "./components/MoviesCards";
import MovieDetailPage from "./components/MovieDetailPage";
import ConfirmModal from "./components/ConfirmModal";
import MovieFormModal from "./components/MovieFormModal";
import Toast from "./components/Toast";
import * as movieApi from "./services/api";

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
      const data = await movieApi.getMovies(query);
      if (!data || data.length === 0) {
        setStatus("empty");
        return;
      }
      setMovies(data);
      setSelectedMovie(data[0]);
      setStatus("success");
    } catch {
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

  function handleView(movie) {
    setDetailMovie(movie);
    setPage("detail");
  }

  function handleDeleteRequest(movie) {
    setConfirmDelete(movie);
  }

  async function handleDeleteConfirm() {
    try {
      await movieApi.deleteMovie(confirmDelete.id);
      setMovies(prev => prev.filter(m => m.id !== confirmDelete.id));
      if (selectedMovie?.id === confirmDelete.id) setSelectedMovie(null);
      if (detailMovie?.id === confirmDelete.id) setPage("home");
      setConfirmDelete(null);
      showToast("Deleted successfully");
    } catch {
      showToast("Failed to delete", "error");
    }
  }

  function handleEditRequest(movie) {
    setEditMovie(movie);
  }

  async function handleEditSave(updated) {
    try {
      const saved = await movieApi.updateMovie(updated.id, updated);
      setMovies(prev => prev.map(m => m.id === saved.id ? saved : m));
      if (selectedMovie?.id === saved.id) setSelectedMovie(saved);
      if (detailMovie?.id === saved.id) setDetailMovie(saved);
      setEditMovie(null);
      setSaveBanner(true);
      setTimeout(() => setSaveBanner(false), 3000);
    } catch {
      showToast("Failed to update", "error");
    }
  }

  async function handleAddSave(newMovie) {
    try {
      const savedMovie = await movieApi.addMovie(newMovie);
      setMovies(prev => [savedMovie, ...prev]);
      setSelectedMovie(savedMovie);
      setShowAddModal(false);
      showToast("Added Successfully", "success");
    } catch {
      showToast("Failed to add movie", "error");
    }
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
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onDone={() => setToast(null)}
          />
        )}
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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;