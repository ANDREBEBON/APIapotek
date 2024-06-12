"use strict";

var response = require("./res"); // reponse menampung data file res.js
var connection = require("./koneksi"); // connection menampung data file koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // response.ok(mengambil properti oke dari res.js) value nya yang ada di dalam kurung
};

//Tampilkan Semua Data Kategori
exports.tampilKategori = function (req, res) {
  connection.query("SELECT * FROM kategori", function (error, rows, fileds) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res); //
    }
  });

  //Tampilkan Data Kategori Berdasarkan id_kategori
  exports.tampilKategoriBerdasarkanId_kategori = function (req, res) {
    let IdKategori = req.params.IdKategori;
    connection.query(
      "SELECT * FROM kategori WHERE id_kategori =?",
      { IdKategori },
      function (error, rows, fileds) {
        if (error) {
          console.log(error);
        } else {
          response.ok(rows, res);
        }
      }
    );
  };
};
