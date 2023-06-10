const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8000;
const db = require("./db_connect");
const response = require("./response");

app.use(bodyParser.json());

app.get("/user", (req, res) => {
  res.send("Hello User!");
});

app.get("/login", (req, res) => {
  console.log();
  res.send("hello");
});

app.post("/register", (req, res) => {
  console.log({ requestFromOutside: req.body });
  res.send("Register Succeed.");
});

app.get("/datas", (req, res) => {
  const sql = "SELECT * FROM companies";
  db.query(sql, (error, result) => {
    response(200, "get all datas", result, res);
  });
});

app.get("/find", (req, res) => {
  const sql = `SELECT * FROM companies WHERE id_company = ${req.query.id_company}`;
  db.query(sql, (err, result) => {
    response(200, "find certain data", result, res);
  });
});

app.get("/find", (req, res) => {
  const sql = "";
});

app.listen(port, () => {
  console.log(`listened on http://localhost:${port}`);
});
