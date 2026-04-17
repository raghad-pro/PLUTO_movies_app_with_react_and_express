const API_BASE = "http://localhost:5000";

export const getMovies = async (query = "action") => {
  const res = await fetch(`${API_BASE}/movies?search=${query}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${API_BASE}/movies/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};

export const updateMovie = async (id, movieData) => {
  const res = await fetch(`${API_BASE}/movies/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
};

export const addMovie = async (movieData) => {
  const res = await fetch(`${API_BASE}/movies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Failed to add");
  return res.json();
};