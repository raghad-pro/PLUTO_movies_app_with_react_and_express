const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});