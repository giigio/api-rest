import express from "express";

const PORT = 3333;

const app = express();

app.get("/", (req, res) => {
  res.end("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
