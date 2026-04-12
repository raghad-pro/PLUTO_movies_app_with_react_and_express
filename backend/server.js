const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

app.get("/test", async (req, res) => {
    res.send("Server is working");
});


const moviesPath = path.join(__dirname, "data", "movies-db.json");

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
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});