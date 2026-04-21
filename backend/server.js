const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const API_KEY = "f6d3ed3f";
function formatMovie(movie) {
  return {
    id: movie.id,
    imdbID: movie.imdb_id || String(movie.id),
    Title: movie.title,
  Year: movie.release_date ? movie.release_date.split("/").pop() : "N/A",
    Genre: movie.genres || "N/A",
    imdbRating: movie.vote_average ? String(movie.vote_average) : "N/A",
    Runtime: movie.runtime ? `${movie.runtime} min` : "N/A",
    Plot: movie.overview || "N/A",
    Poster: movie.poster || "N/A",
  };
}
const moviesPath = path.join(__dirname, "database", "movies-db.json");

app.get("/movies", async (req, res) => {
  try {
    const data = fs.readFileSync(moviesPath, "utf-8");
    let movies = JSON.parse(data);

    const search = req.query.search?.trim().toLowerCase();
    const limit = parseInt(req.query.limit);

    let result = movies;

    if (search) {
      result = result.filter(
        (movie) =>
          movie.title?.toLowerCase().includes(search) ||
          movie.genres?.toLowerCase().includes(search) ||
          movie.overview?.toLowerCase().includes(search) ||
          movie.keywords?.toLowerCase().includes(search),
      );
console.log(formatMovie);
      if (result.length === 0) {
        
        return res.status(200).json({
          success: true,
          message: "No movies found",
          data: [],
        });
      }
    }

    if (!isNaN(limit) && limit > 0) {
      result = result.slice(0, limit);
    }
    await Promise.all(
      result.map(async (movie) => {
        if (!movie.poster && movie.imdb_id) {
          try {
            const response = await fetch(
              `http://www.omdbapi.com/?i=${movie.imdb_id}&apikey=${API_KEY}`,
            );

            const data = await response.json();

            if (data.Poster && data.Poster !== "N/A") {
              movie.poster = data.Poster;
            }
          } catch (err) {
            console.log("Error fetching poster:", err.message);
          }
        }
      }),
    );

    fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));

    return res.status(200).json({
      success: true,
      data: result.map(formatMovie),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load movies",
      error: error.message,
    });
  }
});

app.get("/movies/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    const movie = movies.find((m) => m.id == id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: formatMovie(movie),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.post("/movies", (req, res) => {
  try {
    const {
      title,
      description,
      year,
      imdb_id,
      genres,
      vote_average,
      runtime,
      poster,
    } = req.body;

    if (!title || !description || !year) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    const maxId = movies.reduce((max, m) => (m.id > max ? m.id : max), 0);

    const newMovie = {
      id: maxId + 1,
      title,
      overview: description,
      release_date: year ? String(year) : null,
      genres: genres || null,
      vote_average: vote_average ? parseFloat(vote_average) : null,
      runtime: runtime ? parseInt(runtime) : null,
      poster: poster || null,
      imdb_id: imdb_id || null,
    };

    movies.push(newMovie);

    fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));

    return res.status(201).json({
      success: true,
      data: formatMovie(newMovie),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.patch("/movies/:id", (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, year } = req.body;

    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    const index = movies.findIndex((m) => m.id == id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    if (title !== undefined) movies[index].title = title;
    if (description !== undefined) movies[index].description = description;
    if (year !== undefined) movies[index].year = Number(year);

    fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));

    return res.status(200).json({
      success: true,
      data: formatMovie(movies[index]),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.delete("/movies/:id", (req, res) => {
  try {
    const id = req.params.id;

    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    const movie = movies.find((m) => m.id == id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const updatedMovies = movies.filter((m) => m.id != id);

    fs.writeFileSync(moviesPath, JSON.stringify(updatedMovies, null, 2));

    return res.status(200).json({
      success: true,
      data: formatMovie(movie),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
