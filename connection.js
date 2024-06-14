var mysql = require("mysql");

//Koneksi Database
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "database_apotek"
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Hore Database Terkoneksi");
});

module.exports = conn;
