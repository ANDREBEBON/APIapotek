"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};

//POSTR
exports.tambahVitamin = function (req, res) {
  let namaVitamin = req.body.namaVitamin;
  let gambarVitamin = req.body.gambarVitamin;
  let hargaVitamin = req.body.hargaVitamin;
  let deskripsiVitamin = req.body.deskripsiVitamin;
  let tgl_expired = req.body.tgl_expired;

  const queryVitamin = `INSERT INTO vitamin (id_kategori, namaVitamin, gambarVitamin, hargaVitamin, deskripsiVitamin, tgl_expired) VALUES (2,?,?,?,?,?)`;
  connection.query(
    queryVitamin,
    [namaVitamin, gambarVitamin, hargaVitamin, deskripsiVitamin, tgl_expired],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Gagal menginput data vitamin" });
      } else {
        // Mendapatkan id_vitamin yang baru ditambahkan
        const id_vitamin = result.insertId;
        // Query untuk menambahkan data ke tabel inventori
        const queryInventori = `INSERT INTO inventori (id_vitamin, tgl_masuk, tgl_expired) VALUES (?, NOW(), ?)`;
        connection.query(
          queryInventori,
          [id_vitamin, tgl_expired],
          function (err, result) {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "Gagal menginput data ke inventori" });
            } else {
              res.status(200).send({
                message: "Berhasil menambahkan data vitamin dan inventori"
              });
            }
          }
        );
      }
    }
  );
};

//PUT
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
          // Tidak ada data yang cocok
          console.log("Data tidak ditemukan!!");
          response.ok("Data tidak ditemukan!!", res);
        } else {
          // berhasil di update
          response.ok("Data berhasil diupdate", res);
        }
      }
    }
  );
};

//DELETE
exports.deleteVitamin = function (req, res) {
  let id_vitamin = req.body.id_vitamin;
  // Query untuk menghapus referensi di tabel inventori
  const deleteInventoriQuery = `DELETE FROM inventori WHERE id_vitamin = ?`;
  // Query untuk menghapus data dari tabel vitamin setelah referensi di tabel inventori dihapus
  const deleteVitaminQuery = `DELETE FROM vitamin WHERE id_vitamin = ?`;

  connection.beginTransaction(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Gagal menghapus data" });
      return;
    }

    connection.query(
      deleteInventoriQuery,
      [id_vitamin],
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
            `Data dengan id ${id_vitamin} tidak ditemukan di tabel inventori`
          );
          res.status(404).send({
            message: `Data dengan id ${id_vitamin} tidak ditemukan di tabel inventori`
          });
          return connection.rollback(function () {
            res.end();
          });
        }

        // Setelah referensi di tabel inventori dihapus, hapus data dari tabel vitamin
        connection.query(
          deleteVitaminQuery,
          [id_vitamin],
          function (err, result) {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "Gagal menghapus data dari tabel vitamin" });
              return connection.rollback(function () {
                res.end();
              });
            }

            // Commit transaksi jika berhasil
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
                message: "Data vitamin dan inventori berhasil dihapus"
              });
            });
          }
        );
      }
    );
  });
};
