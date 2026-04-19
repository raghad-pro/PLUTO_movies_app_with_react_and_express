import "../App.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function MovieDetailPage({ onEdit, onDelete }) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const movie = state?.movie;

  useEffect(() => {
    document.body.style.backgroundImage = "none";
    return () => { document.body.style.backgroundImage = "none"; };
  }, [movie]);

  if (!movie) {
    navigate("/");
    return null;
  }

  const badges = [
    
    { label: "IMDb Rating", value: movie.imdbRating ?? "N/A" },
    { label: "Year",        value: movie.Year        ?? "N/A" },
    { label: "Runtime",     value: movie.Runtime     ?? "N/A" },
    { label: "Genre",       value: movie.Genre       ?? "N/A" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          width: "75%",
          background: "rgba(255,255,255,0.06)",
          borderRadius: 24,
          padding: 36,
          border: "1px solid rgba(255,255,255,0.12)",
          display: "flex",
          gap: 36,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <img
          style={{
            width: 260,
            borderRadius: 16,
            flexShrink: 0,
            objectFit: "cover",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/300x450?text=No+Poster"}
          alt={movie.Title}
          onError={(e) => { e.target.src = "https://placehold.co/300x450?text=No+Poster"; }}
        />

        <div className="detail-info">
          <h1 className="detail-title">{movie.Title || "Unknown Title"}</h1>

          <div className="detail-badges">
            {badges.map(b => (
              <div key={b.label} className="detail-badge">
                <span className="detail-badge-label">{b.label}</span>
                <span className="detail-badge-val">{b.value}</span>
              </div>
            ))}
          </div>

          {movie.Plot && movie.Plot !== "N/A" && (
            <p className="detail-plot">{movie.Plot}</p>
          )}

          <div className="detail-actions">
            <button className="btn-edit-detail" onClick={() => onEdit(movie)}>
              <i className="fas fa-pen" style={{ marginRight: 6 }}></i>
              Update
            </button>
            <button className="btn-delete-detail" onClick={() => onDelete(movie)}>
              <i className="fas fa-trash" style={{ marginRight: 6 }}></i>
              Delete
            </button>
            <button className="btn-back" onClick={() => navigate("/")}>
              <i className="fas fa-arrow-left" style={{ marginRight: 6 }}></i>
              Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}