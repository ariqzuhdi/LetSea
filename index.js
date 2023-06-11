const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8000;
const db = require("./db_connect");
const response = require("./response");

app.use(bodyParser.json());

app.get("/shipment", (req, res) => {
  const sql = `SELECT * FROM tracking WHERE id_tracking = ${req.query.id_tracking}`;
  db.query(sql, (err, result) => {
    response(200, "Shipment Tracking", result, res);
  });
});

app.get("/shipment/vessel", (req, res) => {
  const sql = `SELECT mmsi, imo, ship_name, builder, place_build, year_build FROM ships WHERE id_company = ${req.query.id_company}`;
  db.query(sql, (err, result) => {
    response(200, "Data of certain vessel", result, res);
  });
});

app.get("/vessels", (req, res) => {
  const sql = "SELECT * FROM companies";
  db.query(sql, (error, result) => {
    response(200, "get all datas", result, res);
  });
});

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

app.listen(port, () => {
  console.log(`listened on http://localhost:${port}`);
});
