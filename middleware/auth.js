var connection = require("../connection");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jsw = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

// Middleware function
exports.registrasi = function (req, res) {
  var post = {
    name: req.body.name,
    email: req.body.email,
    password: md5(req.body.password)
  };

  var query = `SELECT email FROM ?? WHERE ?? = ?`;
  var table = ["users", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (err, rows) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      if (rows.length == 0) {
        var query = `INSERT INTO ?? SET ?`;
        var table = ["users"];
        query = mysql.format(query, table);

        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
            next(error);
          } else {
            response.ok("Berhasil menambahkan data user ", res);
          }
        });
      } else {
        response.ok("Email anda sudah terdaftar, harap ganti email anda", res);
      }
    }
  });
};
