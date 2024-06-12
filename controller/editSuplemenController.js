"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

//Post data obat
exports.tambahSuplemen = function (req, res) {
  let namaSuplemen = req.body.namaSuplemen; //
  let gambarSuplemen = req.body.gambarSuplemen; //
  let hargaSuplemen = req.body.hargaSuplemen; //
  let deskripsiSuplemen = req.body.deskripsiSuplemen; // D
  // let id_kategori = req.body.id_kategori; //

  const query = `INSERT INTO suplemen (id_kategori, namaSuplemen, gambarSuplemen, hargaSuplemen, deskripsiSuplemen) VALUES (3,?,?,?,?);`;
  connection.query(
    query,
    [namaSuplemen, gambarSuplemen, hargaSuplemen, deskripsiSuplemen],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        response.error("Gagal menginput data suplemen", res);
      } else {
        response.ok("Berhasil menambahkan data suplemen", res);
      }
    }
  );
};

// Put obat
exports.UpdateSuplemen = function (req, res) {
  let id_suplemen = req.body.id_suplemen; // Pastikan Anda mendapatkan id_obat untuk menentukan obat mana yang akan diperbarui
  let namaSuplemen = req.body.namaSuplemen; //
  let gambarSuplemen = req.body.gambarSuplemen; //
  let hargaSuplemen = req.body.hargaSuplemen; //
  let deskripsiSuplemen = req.body.deskripsiSuplemen; // D

  const query = `UPDATE suplemen SET namaSuplemen = ?, gambarSuplemen = ?, hargaSuplemen = ?, deskripsiSuplemen = ?, id_kategori = 3 WHERE id_suplemen = ?`;
  connection.query(
    query,
    [
      namaSuplemen,
      gambarSuplemen,
      hargaSuplemen,
      deskripsiSuplemen,
      id_suplemen
    ],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        response.error("Terjadi kesalahan saat update data", res);
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
exports.deleteSuplemen = function (req, res) {
  let id_suplemen = req.body.id_suplemen; // Pastikan Anda mendapatkan id_obat untuk menentukan obat mana yang akan diperbarui

  const query = `DELETE FROM suplemen WHERE id_suplemen =?`;
  connection.query(query, [id_suplemen], function (err, rows, fields) {
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
