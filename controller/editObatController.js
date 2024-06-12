"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

//Post data obat
exports.tambahObat = function (req, res) {
  let namaObat = req.body.namaObat; //
  let gambarObat = req.body.gambarObat; //
  let hargaObat = req.body.hargaObat; //
  let deskripsiObat = req.body.deskripsiObat; // D
  // let id_kategori = req.body.id_kategori; //

  const query = `INSERT INTO obat (id_kategori, namaObat, gambarObat, hargaObat, deskripsiObat) VALUES (1,?,?,?,?);`;
  connection.query(
    query,
    [namaObat, gambarObat, hargaObat, deskripsiObat],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        response.error("Gagal menginput data obat", res);
      } else {
        response.ok("Berhasil menambahkan data obat", res);
      }
    }
  );
};

// Put obat
exports.UpdateObat = function (req, res) {
  let id_obat = req.body.id_obat; // Pastikan Anda mendapatkan id_obat untuk menentukan obat mana yang akan diperbarui
  let namaObat = req.body.namaObat;
  let gambarObat = req.body.gambarObat;
  let hargaObat = req.body.hargaObat;
  let deskripsiObat = req.body.deskripsiObat;

  const query = `UPDATE obat SET namaObat = ?, gambarObat = ?, hargaObat = ?, deskripsiObat = ?, id_kategori = 1 WHERE id_obat = ?`;
  connection.query(
    query,
    [namaObat, gambarObat, hargaObat, deskripsiObat, id_obat],
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
exports.deleteObat = function (req, res) {
  let id_obat = req.body.id_obat; // Pastikan Anda mendapatkan id_obat untuk menentukan obat mana yang akan diperbarui

  const query = `DELETE FROM obat WHERE id_obat =?`;
  connection.query(query, [id_obat], function (err, rows, fields) {
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
