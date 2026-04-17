const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

app.get("/test", async (req, res) => {
    console.log("sever")
    res.send("Server is working");
});


const moviesPath = path.join(__dirname, "database", "movies-db.json");

app.get("/movies", (req, res) => {
  try {
    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    const search = req.query.search?.trim().toLowerCase();

    let result = movies;

    if (search) {
      result = movies.filter((movie) =>
        movie.title?.toLowerCase().trim().includes(search)
      );
    }

    return res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to read movies file",
      error: error.message,
    });
  }
});

app.get("/movies/:id",(req,res)=>{
  try{
  const id = req.params.id;
  const data = fs.readFileSync(moviesPath, "utf-8");
  const movies = JSON.parse(data);
  const movie = movies.find((m)=> m.id == id);
  if(!movie){
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }
  return res.status(200).json({
      success: true,
      message: "Movie found",
      data: movie,
  });
}catch(error){
  return res.status(500).json({
    success : false,
    message: "Something went wrong",
    error: error.message,
    });
  }
})

app.post("/movies", (req, res) => {
  try {
    const { title, description, year } = req.body;

    if (!title || !description || !year) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (typeof year !== "number") {
      return res.status(400).json({
        success: false,
        message: "Year must be a number",
      });
    }

    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    const exists = movies.find(m => m.title === title);
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Movie already exists",
      });
    }

    const maxId = movies.reduce((max, m) => (m.id > max ? m.id : max), 0);
    const newId = maxId + 1;

    const newMovie = {
      id: newId,
      title,
      description,
      year,
    };

    movies.push(newMovie);
    fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));

    return res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: newMovie,
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
  const id = req.params.id;
  const { title, description, year } = req.body;
  const data = fs.readFileSync(moviesPath, "utf-8");
  const movies = JSON.parse(data);
  const movieIndex = movies.findIndex((m) => m.id == id);

  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Movie not found",
    });
  }

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title cannot be empty",
    });
  }

  if (description !== undefined && description.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Description cannot be empty",
    });
  }

  if (year !== undefined && isNaN(Number(year))) {
    return res.status(400).json({
      success: false,
      message: "Year must be a valid number",
    });
  }

  if (title !== undefined) {
    movies[movieIndex].title = title;
  }

  if (description !== undefined) {
    movies[movieIndex].description = description;
  }

  if (year !== undefined) {
    movies[movieIndex].year = Number(year);
  }

  fs.writeFileSync(moviesPath, JSON.stringify(movies, null, 2));

  return res.status(200).json({
    success: true,
    message: "Movie updated successfully",
    data: movies[movieIndex],
  });
});

app.delete("/movies/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    const movieToDelete = movies.find(m => m.id == id);

    if (!movieToDelete) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const filteredMovies = movies.filter(m => m.id != id);
    fs.writeFileSync(moviesPath, JSON.stringify(filteredMovies, null, 2));

    return res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
      data: movieToDelete,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});