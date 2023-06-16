const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const db = require("../database/db_connect");
const response = require("./response");
const fetch = require("node-fetch");
const { jwtMiddleware } = require("./jwt_middleware");

app.use(jwtMiddleware);
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");
app.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;

    const sql = `SELECT * FROM companies where username ='${username}' && password = '${password}'`;

    db.query(sql, (err, fields) => {
      let hasil = fields;
      if (err) throw err;
      if (fields < 0) {
        response(404, "Password not match!", err, res);
      }

      token = jwt.sign(
        {
          id: fields.id_company,
        },
        "secretkey"
      );
      res.status(201).json({
        message: "Login succeed",
        success: true,
        data: hasil,
        token: token,
      });
    });
  } catch (error) {}
});

app.delete("/logout", async (req, res) => {
  try {
    const token = req.headers["token"];
    const decoded = jwt.verify(token, "secretkey");
    const id = decoded.id;
    const t = jwt.sign({ id: id }, "secretkey", { expiresIn: "1s" });
    response(200, "Logout Succeed!", null, res);
  } catch (error) {
    response(500, "Internal Server Error", error, res);
  }
});

app.put("/editpassword", (req, res) => {
  const { username, password, confirm_password } = req.body;
  if (password != confirm_password) {
    response(400, "Password not match!", null, res);
    return;
  }
  const sql = `UPDATE companies SET password = '${password}' WHERE username = '${username}'`;
  db.query(sql, (err, fields) => {
    if (err) {
      response(200, "Error SQL", err, res);
      return;
    }
    response(200, "Succeed", fields, res);
  });
});

//SHIP REGISTRATION BUTTON
app.post("/regship", (req, res) => {
  const { mmsi, id_company, imo, ship_name, builder, place_build, year_build } =
    req.body;
  if (!mmsi & !imo & !ship_name & !place_build & !year_build) {
    res.status(400).json({
      message: "Failure",
      success: false,
      data: null,
    });
  }
  const sql = `INSERT INTO ships (mmsi, id_company, imo, ship_name, builder, place_build, year_build) VALUES (${mmsi}, ${id_company}, ${imo},'${ship_name}','${builder}','${place_build}',${year_build})`;
  db.query(sql, (err, fields) => {
    if (err) {
      return response(400, "Error", err, res);
    }
    return response(200, "Register ship success", fields, res);
  });
});

//HOME - SHOW ALL
app.get("/shipment", (req, res) => {
  const sql = `select * from ships`;
  db.query(sql, (err, fields) => {
    if (err) response(400, "error sql", err, res);
    response(200, "data berhasil diambil", fields, res);
  });
});

//TRACK DETAIL BUTTON = TRACKING
app.get("/shipment/trackdetail/:id", (req, res) => {
  const { id } = req.params;
  const sql = `
  SELECT tracking.id_tracking, ships.ship_name, tracking.mmsi, tracking.arrival_datetime, tracking.lat, tracking.lon, tracking.sog, tracking.cog, tracking.arr_lat, tracking.arr_lon
  FROM tracking
  JOIN ships ON tracking.mmsi = ships.mmsi where id_tracking = ${id};`;
  db.query(sql, (err, result) => {
    response(200, "Shipment Tracking", result, res);
  });
});

//INPUT TRACKING
app.get("/shipment/ship/input", (req, res) => {
  const url = "https://ml-api-letsea-jx7f76f7kq-et.a.run.app/";

  async function fetchapiml() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  fetchapiml().then((data) => {
    db.query(
      `INSERT INTO tracking (id_tracking, mmsi, lat, LON, sog, cog, arr_lat, arr_lon, arrival_datetime) VALUES (1, ${data.MMSI}, ${data.LAT}, ${data.LON}, ${data.SOG}, ${data.COG}, ${data.ARRLAT}, ${data.ARRLON}, '${data.arrival_datetime}')`,
      function (err, fields) {
        if (err) console.log(err);
        response(200, "Insert data Success", fields, res);
        console.log(fields);
      }
    ); // fetched data
  });
});

//VESSEL DETAIL BUTTON
app.get("/shipment/ship/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT mmsi, imo, ship_name, builder, place_build, year_build FROM ships WHERE id_company = ${id}`;
  db.query(sql, (err, result) => {
    response(200, "Data of certain ship", result, res);
  });
});

const port = process.env.PORT || 8070;
app.listen(port, () => {
  console.log(`listened on http://localhost:${port}`);
});
