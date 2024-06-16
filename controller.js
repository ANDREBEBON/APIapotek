"use strict";

var response = require("./res"); // Mengimpor res.js
var connection = require("./connection"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

// Tampilkan Data Kategori
// exports.tampilKategori = function (req, res) {
//   connection.query("SELECT * FROM kategori", function (error, rows, fields) {
//     if (error) {
//       console.log(error);
//     } else {
//       response.ok(rows, res); // Menggunakan response.ok untuk mengirim data
//     }
//   });
// };
