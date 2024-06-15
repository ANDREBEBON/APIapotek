"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../connection"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

//POSTR
exports.tambahSuplemen = function (req, res) {
  let namaSuplemen = req.body.namaSuplemen;
  let gambarSuplemen = req.body.gambarSuplemen;
  let hargaSuplemen = req.body.hargaSuplemen;
  let deskripsiSuplemen = req.body.deskripsiSuplemen;
  let tgl_expired = req.body.tgl_expired;

  // Query untuk menambahkan data ke tabel suplemen
  const querySuplemen = `INSERT INTO suplemen (id_kategori, namaSuplemen, gambarSuplemen, hargaSuplemen, deskripsiSuplemen, tgl_expired) VALUES (3,?,?,?,?,?)`;
  connection.query(
    querySuplemen,
    [
      namaSuplemen,
      gambarSuplemen,
      hargaSuplemen,
      deskripsiSuplemen,
      tgl_expired
    ],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Gagal menginput data suplemen" });
      } else {
        // Mendapatkan id_suplemen yang baru ditambahkan
        const id_suplemen = result.insertId;

        // Query untuk menambahkan data ke tabel inventori
        const queryInventori = `INSERT INTO inventori (id_suplemen, tgl_masuk, tgl_expired) VALUES (?, NOW(), ?)`;
        connection.query(
          queryInventori,
          [id_suplemen, tgl_expired],
          function (err, result) {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "Gagal menginput data ke inventori" });
            } else {
              res.status(200).send({
                message: "Berhasil menambahkan data suplemen dan inventori"
              });
            }
          }
        );
      }
    }
  );
};

//PUT
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
          // Data berhasil di update
          response.ok("Data berhasil diupdate", res);
        }
      }
    }
  );
};

//DELETE
exports.deleteSuplemen = function (req, res) {
  let id_suplemen = req.body.id_suplemen;
  // Query untuk menghapus referensi di tabel inventori
  const deleteInventoriQuery = `DELETE FROM inventori WHERE id_suplemen = ?`;
  // Query untuk menghapus data dari tabel suplemen setelah referensi di tabel inventori dihapus
  const deleteSuplemenQuery = `DELETE FROM suplemen WHERE id_suplemen = ?`;

  connection.beginTransaction(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Gagal menghapus data" });
      return;
    }
    // Hapus referensi di tabel inventori
    connection.query(
      deleteInventoriQuery,
      [id_suplemen],
      function (err, result) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send({ message: "Gagal menghapus data dari tabel inventori" });
          return connection.rollback(function () {
            res.end();
          });
        }

        if (result.affectedRows === 0) {
          // Tidak ada data yang cocok di tabel inventori, kirim pesan kesalahan
          console.log(
            `Data dengan id ${id_suplemen} tidak ditemukan di tabel inventori`
          );
          res.status(404).send({
            message: `Data dengan id ${id_suplemen} tidak ditemukan di tabel inventori`
          });
          return connection.rollback(function () {
            res.end();
          });
        }

        connection.query(
          deleteSuplemenQuery,
          [id_suplemen],
          function (err, result) {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "Gagal menghapus data dari tabel suplemen" });
              return connection.rollback(function () {
                res.end();
              });
            }
            connection.commit(function (err) {
              if (err) {
                console.log(err);
                res.status(500).send({ message: "Gagal menghapus data" });
                return connection.rollback(function () {
                  res.end();
                });
              }
              console.log("Data berhasil di hapus");
              res.status(200).send({
                message: "Data suplemen dan inventori berhasil dihapus"
              });
            });
          }
        );
      }
    );
  });
};
