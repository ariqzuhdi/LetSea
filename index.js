const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Hello LetSea!</h1>");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
