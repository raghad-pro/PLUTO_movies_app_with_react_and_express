import "../App.css";
import { useState } from "react";

const FIELDS = [
  { name: "Title",      label: "Movie Title",    placeholder: "e.g., Inception" },
  { name: "Year",       label: "Year",           placeholder: "e.g., 2010" },
  { name: "Genre",      label: "Genre",          placeholder: "e.g., Action, Thriller" },
  { name: "imdbRating", label: "Rating",         placeholder: "e.g., 8.8" },
  { name: "Runtime",    label: "Runtime",        placeholder: "e.g., 148 min" },
  { name: "Poster",     label: "Poster URL",     placeholder: "https://..." },
  { name: "Plot",       label: "Description",    placeholder: "Brief description...", multiline: true },
];

export default function MovieFormModal({ movie, isEdit, onSave, onClose }) {
  const [form, setForm] = useState({
    Title:      movie?.Title      || "",
    Year:       movie?.Year       || "",
    Genre:      movie?.Genre      || "",
    imdbRating: movie?.imdbRating || "",
    Runtime:    movie?.Runtime    || "",
    Poster:     movie?.Poster     || "",
    Plot:       movie?.Plot       || "",
  });

  const [error, setError] = useState("");

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (e.target.name === "Title" && e.target.value.trim()) {
      setError("");
    }
  }

function handleSubmit() {
  if (!form.Title.trim() || !form.Plot.trim() || !form.Year.trim()) {
    setError("Please fill in the required fields.");
    return;
  }
  setError("");
  onSave({
    ...movie,
    ...form,
    imdbID: movie?.imdbID || `custom-${Date.now()}`,
  });
}

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>
          <i className={`fas ${isEdit ? "fa-pen" : "fa-plus"}`} style={{ marginRight: 8 }}></i>
          {isEdit ? "Edit Movie" : "Add New Movie"}
        </h3>

        {error && (
          <div style={{
            backgroundColor: "rgba(239,68,68,0.15)",
            border: "1px solid #ef4444",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 14,
            color: "#ef4444",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <i className="fas fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        {FIELDS.map(f => (
          <div key={f.name}>
            <label className="modal-input-label">
              {f.label}
             {["Title", "Year", "Plot"].includes(f.name) && <span style={{ color: "#ef4444", marginLeft: 4 }}>*</span>}
            </label>
            {f.multiline ? (
              <textarea
                name={f.name}
                value={form[f.name]}
                onChange={handle}
                placeholder={f.placeholder}
                rows={3}
                className="modal-input modal-textarea"
               style={["Title", "Year", "Plot"].includes(f.name) && error && !form[f.name].trim() ? { borderColor: "#ef4444" } : {}}
              />
            ) : (
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handle}
                placeholder={f.placeholder}
                className="modal-input"
              style={["Title", "Year", "Plot"].includes(f.name) && error && !form[f.name].trim() ? { borderColor: "#ef4444" } : {}}
              />
            )}
          </div>
        ))}

        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={handleSubmit}>
            {isEdit ? "Save Changes" : "Add Movie"}
          </button>
        </div>
      </div>
    </div>
  );
}