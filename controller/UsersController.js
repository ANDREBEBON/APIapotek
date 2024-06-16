"use strict";
const express = require("express");
const bodyParser = require("body-parser");
var response = require("../res"); // Mengimpor res.js
var connection = require("../connection"); // Mengimpor koneksi.js

const app = express();
app.use(bodyParser.json());

// --------Users Controller-------------//
//GET USERA
exports.GetUsers = function (req, res) {
  const query = `SELECT name, email FROM users`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      response.send(err);
    } else {
      response.ok(rows, res);
    }
  });
};
//POSTR USER
exports.PostUsers = function (req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  const queryObat = `INSERT INTO users (name, email, password) VALUES (?,?,?)`;
  connection.query(queryObat, [name, email, password], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Gagal menginput data obat" });
    } else {
      response.ok("Data Berhasil di input", res);
    }
  });
};
//PUT OBAT
exports.UpdateUsers = function (req, res) {
  let id = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
  connection.query(query, [name, email, password, id], function (err, result) {
    if (err) {
      console.log(err);
      response.error("Terjadi kesalahan saat update data", res);
    } else {
      if (result.affectedRows === 0) {
        console.log("Data tidak ditemukan!!");
        response.error("Data tidak ditemukan!!", res);
      } else {
        response.ok("Data berhasil diupdate", res);
      }
    }
  });
};
//DELETE
exports.DeleteUsers = function (req, res) {
  let id = req.params.id;
  const query = `DELETE FROM users WHERE id = ?`;
  connection.query(query, [id], function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Gagal menghapus data" });
    } else {
      response.ok(`Data dengan id ${id} berhasil dihapus`, res);
    }
  });
};
