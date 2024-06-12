"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

//Post data deskripsiVitamin
exports.tambahVitamin = function (req, res) {
  let namaVitamin = req.body.namaVitamin;
  let gambarVitamin = req.body.gambarVitamin;
  let hargaVitamin = req.body.hargaVitamin;
  let deskripsiVitamin = req.body.deskripsiVitamin;
  // let id_kategori = req.body.id_kategori; //

  const query = `INSERT INTO vitamin (id_kategori, namaVitamin, gambarVitamin, hargaVitamin, deskripsiVitamin) VALUES (2,?,?,?,?)`;
  connection.query(
    query,
    [namaVitamin, gambarVitamin, hargaVitamin, deskripsiVitamin],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        response.error("Gagal menginput data suplemen", res);
      } else {
        response.ok("Berhasil menambahkan data vitamin", res);
      }
    }
  );
};

// Put obat
exports.UpdateVitamin = function (req, res) {
  let namaVitamin = req.body.namaVitamin;
  let gambarVitamin = req.body.gambarVitamin;
  let hargaVitamin = req.body.hargaVitamin;
  let deskripsiVitamin = req.body.deskripsiVitamin;
  let id_vitamin = req.body.id_vitamin;

  const query = `UPDATE vitamin SET namaVitamin = ?, gambarVitamin = ?, hargaVitamin = ?, deskripsiVitamin = ?, id_kategori = 2 WHERE id_vitamin = ?`;
  connection.query(
    query,
    [namaVitamin, gambarVitamin, hargaVitamin, deskripsiVitamin, id_vitamin],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        response.error("Terjadi kesalahan saat update data ", res);
      } else {
        if (rows.affectedRows === 0) {
          // Tidak ada data yang cocok, kirim pesan kesalahan
          console.log("Data tidak ditemukan!!");
          response.ok("Data tidak ditemukan!!", res);
        } else {
          // Data berhasil dihapus
          response.ok("Data berhasil diupdate", res);
        }
      }
    }
  );
};

//DELETE obat
exports.deleteVitamin = function (req, res) {
  let id_vitamin = req.body.id_vitamin;

  const query = `DELETE FROM vitamin WHERE id_vitamin = ?`;
  connection.query(query, [id_vitamin], function (err, rows, fields) {
    if (err) {
      console.log(err);
      response.error("Terjadi kesalahan saat menghapus data", res);
    } else {
      if (rows.affectedRows === 0) {
        // Tidak ada data yang cocok, kirim pesan kesalahan
        console.log("Data tidak ditemukan!!");
        response.ok("Data tidak ditemukan!!", res);
      } else {
        // Data berhasil dihapus
        response.ok("Data berhasil dihapus", res);
      }
    }
  });
};
