const API_BASE = "http://localhost:4000";

export const getMovies = async (query = "action") => {
  const res = await fetch(`${API_BASE}/movies?search=${query}`);
  if (!res.ok) throw new Error("Failed to fetch");
  const result = await res.json();
  return Array.isArray(result) ? result : result.data || result.movies || [];
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${API_BASE}/movies/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};

export const updateMovie = async (id, movieData) => {
  const res = await fetch(`${API_BASE}/movies/${id}`, {
    method: "PATCH",
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
 body: JSON.stringify({
  title:        movieData.Title,
  description:  movieData.Plot,
  year:         movieData.Year,
  genres:       movieData.Genre,
  vote_average: movieData.imdbRating,
  runtime:      movieData.Runtime,
  poster:       movieData.Poster,
}),
  });
  if (!res.ok) throw new Error("Failed to add");
   const result = await res.json();
  return result.data;
};
