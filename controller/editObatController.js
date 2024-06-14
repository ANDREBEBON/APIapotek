"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../koneksi"); // Mengimpor koneksi.js

exports.index = function (req, res) {
  response.ok("Aplikasi Rest API berjalan!", res); // Menggunakan response.ok dari res.js
};
//POSTR
exports.tambahObat = function (req, res) {
  let namaObat = req.body.namaObat;
  let gambarObat = req.body.gambarObat;
  let hargaObat = req.body.hargaObat;
  let deskripsiObat = req.body.deskripsiObat;
  let tgl_expired = req.body.tgl_expired;

  const queryObat = `INSERT INTO obat (id_kategori, namaObat, gambarObat, hargaObat, deskripsiObat, tgl_expired) VALUES (1,?,?,?,?,?)`;
  connection.query(
    queryObat,
    [namaObat, gambarObat, hargaObat, deskripsiObat, tgl_expired],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Gagal menginput data obat" });
      } else {
        // Mendapatkan id_obat
        const id_obat = result.insertId;
        // Query untuk menambahkan data ke tabel inventori
        const queryInventori = `INSERT INTO inventori (id_obat, tgl_masuk, tgl_expired) VALUES (?, NOW(), ?)`;
        connection.query(
          queryInventori,
          [id_obat, tgl_expired],
          function (err, result) {
            if (err) {
              console.log(err);
              res
                .status(500)
                .send({ message: "Gagal menginput data ke inventori" });
            } else {
              res.status(200).send({
                message: "Berhasil menambahkan data obat dan inventori"
              });
            }
          }
        );
      }
    }
  );
};

//PUT
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
          // Data berhasil Update
          response.ok("Data berhasil diupdate", res);
        }
      }
    }
  );
};

//DELETE
exports.deleteObat = function (req, res) {
  let id_obat = req.body.id_obat;

  const deleteInventoriQuery = `DELETE FROM inventori WHERE id_obat = ?`;
  const deleteObatQuery = `DELETE FROM obat WHERE id_obat = ?`;

  connection.beginTransaction(function (err) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Gagal menghapus data" });
      return;
    }

    connection.query(deleteInventoriQuery, [id_obat], function (err, result) {
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
        // Tidak ada data yang cocok di tabel inventori
        console.log(
          `Data dengan id ${id_obat} tidak ditemukan di tabel inventori`
        );
        res.status(404).send({
          message: `Data dengan id ${id_obat} tidak ditemukan di tabel inventori`
        });
        return connection.rollback(function () {
          res.end();
        });
      }

      connection.query(deleteObatQuery, [id_obat], function (err, result) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send({ message: "Gagal menghapus data dari tabel obat" });
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
            message: "Data obat dan inventori berhasil dihapus"
          });
        });
      });
    });
  });
};
