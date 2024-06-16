"use strict";
const express = require("express");
const bodyParser = require("body-parser");
var response = require("../res"); // Mengimpor res.js
var connection = require("../connection"); // Mengimpor koneksi.js

const app = express();
app.use(bodyParser.json());

// --------Users Controller-------------//
//GET USERA
exports.GetInventori = function (req, res) {
  const query = `SELECT obat.namaObat, obat.hargaObat, obat.deskripsiObat, DATE_FORMAT(obat.tgl_expired, '%Y-%m-%d') AS tgl_expired
FROM obat JOIN inventori ON obat.id_obat = inventori.id_obat GROUP BY tgl_expired;`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      response.send(err);
    } else {
      response.ok(rows, res);
    }
  });
};
