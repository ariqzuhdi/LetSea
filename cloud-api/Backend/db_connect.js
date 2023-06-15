const mysql = require("mysql");

const db = mysql.createConnection({
  host: "34.101.75.217",
  user: "root",
  password: "ABC12345",
  database: "letsea-db",
});

module.exports = db;
