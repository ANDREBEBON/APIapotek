"use strict";

var response = require("../res"); // Mengimpor res.js
var connection = require("../connection"); // Mengimpor koneksi.js

// --------SuperUserController-------------//
//GET
exports.GetSuper = function (req, res) {
  const query = `SELECT id_superAdmin	, email	 FROM super_admin`;
  connection.query(query, function (err, rows, fields) {
    if (err) {
      console.log(err);
      response.send(err);
    } else {
      response.ok(rows, res);
    }
  });
};
//POST
exports.PostSuper = function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  //Not Null nya
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password tidak boleh kosong."
    });
  }
  const query = `INSERT INTO super_admin (email, password) VALUES (?,?)`;
  connection.query(query, [email, password], function (err, result, fields) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Gagal menginput data super_admin" });
    } else {
      response.ok("Data berhasil di input", res);
    }
  });
};

//PUT
exports.UpdateSuper = function (req, res) {
  let id = req.params.id;
  let email = req.body.email;
  let password = req.body.password;

  const query = `UPDATE super_admin SET email = ?, password = ? WHERE 	id_superAdmin = ?`;
  connection.query(query, [email, password, id], function (err, rows, fields) {
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
  });
};
//DELETE
exports.DeleteSuper = function (req, res) {
  let id = req.params.id;
  const query = `DELETE FROM super_admin WHERE id_superAdmin = ?`;
  connection.query(query, [id], function (err, result, fields) {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Terjadi kesalahan saat delete data" });
    } else {
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      } else {
        return res
          .status(200)
          .json({ message: `Data dengan id ${id} berhasil dihapus` });
      }
    }
  });
};
