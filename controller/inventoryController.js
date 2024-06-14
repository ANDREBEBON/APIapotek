"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

exports.inventoryController = function (req, res) {
  const query = `DELIMITER //
CREATE TRIGGER after_vitamin_insert
AFTER INSERT ON vitamin
FOR EACH ROW
BEGIN
    INSERT INTO inventory (id_vitamin, tgl_expired)
    VALUES (NEW.id_vitamin, NEW.tgl_expired);
END //
DELIMITER `;

connection.query(query, function (err,rows,fields) {
    if (err) {
        console.log(err);
      } else {
        response.ok("Berhasil menambahkan data inventory", res);
      }
});
};

exports.tampilInventori = function (req, res) {
  const query = ``
}
