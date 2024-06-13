"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

exports.superLogin = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  const query = `INSERT INTO login (id_superAdmin, email, password)
SELECT id_superAdmin, email, password
FROM super_admin
WHERE email = ? AND password = ?`;

  connection.query(query, [email, password], function (err, rows, fields) {
    if (rows.affectedRows === 0) {
      // Tidak ada data yang cocok, kirim pesan kesalahan
      console.log("Data tidak ditemukan!!");
      response.ok("Data tidak ditemukan!!", res);
    } else {
      // Data berhasil dihapus
      response.ok("Selamat datang SEPPUHHHH", res);
    }
  });
};
