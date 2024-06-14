"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../connection"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

exports.dataLogin = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  const query = `
INSERT INTO login (id_register, email, password)
SELECT id_register, email, password
FROM register
WHERE email = ? AND password = ?
`;

  connection.query(query, [email, password], function (err, rows, fields) {
    if (err) {
      console.log(err);
    } else {
      if (rows.affectedRows === 0) {
        // Tidak ada data yang cocok, kirim pesan kesalahan
        console.log("Email dan password tidak cocok");
        return response.ok("Data Email atau Password tidak di temukan ", res);
      } else {
        // Data login berhasil ditambahkan
        response.ok("Login Berhasil", res);
      }
    }
  });
};
