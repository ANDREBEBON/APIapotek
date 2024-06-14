"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

//Post Data
exports.dataRegister = function (req, res) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  const query = `INSERT INTO register (username, email, password,Role) VALUES (?,?,?,?)`;
  connection.query(
    query,
    [username, email, password, role],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Berhasil menambahkan data register", res);
      }
    }
  );
};
