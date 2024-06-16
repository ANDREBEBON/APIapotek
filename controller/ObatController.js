"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../connection"); // Mengimpor koneksi.js

// --------OBAT-------------//
//GET
exports.GetObat = function (req, res) {
  const query = `SELECT namaObat, hargaObat, gambarObat, deskripsiObat, tgl_expired FROM obat`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      response.send(err);
    } else {
      response.ok(rows, res);
    }
  });
};
//POSTR OBAT
exports.PostObat = function (req, res) {
  let namaObat = req.body.namaObat;
  let gambarObat = req.body.gambarObat;
  let hargaObat = req.body.hargaObat;
  let deskripsiObat = req.body.deskripsiObat;
  let tgl_expired = req.body.tgl_expired;

  const queryObat = `INSERT INTO obat (namaObat, hargaObat, gambarObat, deskripsiObat, tgl_expired) VALUES (?,?,?,?,?)`;
  connection.query(
    queryObat,
    [namaObat, hargaObat, gambarObat, deskripsiObat, tgl_expired],
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Gagal menginput data obat" });
      } else {
        // Mendapatkan id_obat
        const id_obat = result.insertId;
        const queryInventori = `INSERT INTO inventori (id_obat, tgl_expired) VALUES (?, ?)`;
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
//PUT OBAT
exports.UpdateObat = function (req, res) {
  let namaObat = req.body.namaObat;
  let gambarObat = req.body.gambarObat;
  let hargaObat = req.body.hargaObat;
  let deskripsiObat = req.body.deskripsiObat;
  let tgl_expired = req.body.tgl_expired;

  const query = `UPDATE obat SET namaObat = ?, gambarObat = ?, hargaObat = ?, deskripsiObat = ?, WHERE id_obat = ?`;
  connection.query(
    query,
    [namaObat, gambarObat, hargaObat, deskripsiObat, tgl_expired, id_obat],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        response.error("Terjadi kesalahan saat update data", res);
      } else {
        if (rows.affectedRows === 0) {
          console.log("Data tidak ditemukan!!");
          response.ok("Data tidak ditemukan!!", res);
        } else {
          response.ok("Data berhasil diupdate", res);
        }
      }
    }
  );
};
//DELETE
exports.DeleteObat = function (req, res) {
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
