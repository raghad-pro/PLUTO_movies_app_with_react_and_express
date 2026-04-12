const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

app.use(express.json());

app.get("/test", async (req, res) => {
    res.send("Server is working");
});


const moviesPath = path.join(__dirname, "database", "movies-db.json");

app.get("/movies", (req, res) => {
    try {
    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);
    
    res.status(200).json({
      success: true,
      message: "Movies returned correctly",
      data: movies
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to read movies file",
      error: error.message
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

app.post("/movies",(req,res)=>{
  try{
    const { title, description, year } = req.body;
    const data = fs.readFileSync(moviesPath, "utf-8");
    const movies = JSON.parse(data);

    if( !title || !description || !year){
      return res.status(400).json({
      success : false,
      message : "All fields are required",
      });
    }

    if(typeof year !== "number"){
      return res.status(400).json({
        success : false,
        message : "Year must be a number",
      });
    }
    const exists = movies.find(m => m.title === title);
    if(exists){
      return res.status(409).json({
      success: false,
      message: "Movie already exists",
      });
    }

    const newMovie = {
      id : Date.now(),
      title,
      description,
      year
    };
    movies.push(newMovie);

    fs.writeFileSync("./data/movies-db.json", JSON.stringify(movies, null, 2));

    return res.status(201).json({
      success: true,
      message: "Movie created successfully",
      data: newMovie,
    });
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});